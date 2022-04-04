'use strict'
// functions to make: renderBooks(),

renderBooks()

function renderBooks() {
    var books = getBooks();
    var strHTMLs = '<thead><th onclick="onSortById()">id</th><th onclick="onSortByTitle()">title</th><th onclick="onSortByPrice()">price</th><th>action</th></thead>'
    strHTMLs += books.map(book => `<tr><td>${book.id}</td><td>${book.name}</td><td>${book.price}</td>
    <td><button onclick="onRead('${book.id}')" class="read">Read</button><button onclick="onUpdate('${book.id}')" class="update">Update</button>
    <button onclick="onDelete('${book.id}')" class="delete">Delete</button>`)
    var table = document.querySelector('.book-shelf');
    table.innerHTML = ''
    table.innerHTML += strHTMLs;
}

function renderModal(bookId) {
    var currBook = getBookById(bookId)
    var modal = document.querySelector('.modal')
    var strHTML = `<button class="close-modal" onclick="onCloseModal()">X</button><p>
    book title:${currBook.name} <br>
    book price:${currBook.price} <br><p>
    <button onclick="onRateDown('${currBook.id}')" class="rate">-</button><span class="rating">${currBook.rate}</span><button onclick="onRateUp('${currBook.id}')" class="rate">+</button>`
    modal.innerHTML = strHTML;
}
function onRateUp(bookId) {
    var rate = document.querySelector('.rating')
    var book = getBookById(bookId)
    upRatingByOne(bookId)
    rate.innerHTML = book.rate
}
function onRateDown(bookId) {
    var rate = document.querySelector('.rating')
    var book = getBookById(bookId)
    downRatingByOne(bookId)
    rate.innerHTML = book.rate
}
function onNextPage(){
    nextPage()
    renderBooks()
}

function onPrevPage(){
    prevPage()
    renderBooks()
}

function onDelete(bookId) {
    _removeBook(bookId)
    renderBooks();
}
function onAddBook() {
    var booksName = prompt('what is the books name?')
    var booksPrice = +prompt('what is the books price?')
    if (!booksName || booksPrice < 0 || !booksPrice) return
    addBook(booksName, booksPrice);
    renderBooks();
}

function onUpdate(bookId) {
    var newPrice = +prompt('what is your new price?')
    updateBook(bookId, newPrice)
    renderBooks()
    _saveBooksToStorage()
}

function onRead(bookId) {
    var modal = document.querySelector('.modal')
    modal.classList.add('open')
    renderModal(bookId);
}

function onCloseModal() {
    var modal = document.querySelector('.modal')
    modal.classList.remove('open')
    _saveBooksToStorage();
}

function onSortByPrice() {
    sortByPrice()
    renderBooks()
}

function onSortByTitle() {
    sortByTitle()
    renderBooks()
}

function onSortById() {
    sortById()
    renderBooks()
}