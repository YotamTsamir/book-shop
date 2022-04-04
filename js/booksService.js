'use strict'
// function that i need: createBook(), createBooks(),addBook(),getBookById(),deleteBook(),updateBook()
const STORAGE_KEY = 'booksDB'
const PAGE_SIZE=4
var gBooks;
var gPageIdx = 0

_createBooks()

function _removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function updateBook(bookId, booksPrice) {
    var currBook = getBookById(bookId);
    currBook.price = booksPrice;
}

function getBookById(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    return book
}

function getBooks() {
    var books = gBooks
    const idxStart = gPageIdx * PAGE_SIZE
    books = books.slice(idxStart,idxStart + PAGE_SIZE)
    return books
}
function addBook(name, price) {
    var newBook = _createBook(name, price)
    gBooks.push(newBook);
    _saveBooksToStorage();
}
function upRatingByOne(bookId) {
    var book = getBookById(bookId)
    if (book.rate === 10) return
    book.rate++
}
function downRatingByOne(bookId) {
    var book = getBookById(bookId)
    if (book.rate === 0) return
    book.rate--
}
function _createBook(name, price) {
    return {
        id: makeId(),
        name,
        rate: 0,
        price,
        imgUrl: 0
    }
}
function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY);
    if (!books || !books.length) {
        books = [];
        books.push(_createBook('monty-python', 20))
        books.push(_createBook('hunger-games', 30))
        books.push(_createBook('shrigi-gook', 40))
    }
    gBooks = books
    _saveBooksToStorage();
}

function nextPage(){
    if(gPageIdx * PAGE_SIZE > gBooks.length-3) return
    gPageIdx++

}
function prevPage(){
    if(gPageIdx <= 0) return
    gPageIdx--
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}
function sortByPrice() {
    gBooks.sort((a, b) => {
        return a.price - b.price
    })
}

function sortByTitle() {
    gBooks.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
            })
}

function sortById(){
    gBooks.sort((a, b) => {
        const nameA = a.id.toUpperCase();
        const nameB = b.id.toUpperCase();
        if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        })
}