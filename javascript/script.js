'use strict'

const getTitle = document.querySelector('#title');
const getAuthor = document.querySelector('#author');
const getPages = document.querySelector('#pages');
const getStatus = document.querySelector('#status');

const button = document.querySelector('.button');
const trashButton = document.querySelector('table');
const addBookList = document.querySelector('#add-book-list');

let myLibrary = [];

const addBookToLibrary = (event) => {
  event.preventDefault();
  alertMessage();
  let title = getTitle.value;
  let author = getAuthor.value;
  let pages = getPages.value;
  let status = getStatus.value;

  const book = new Book(title, author, pages, status);

  const createTr = document.createElement('tr');

  if(title !== '' && author !== '' && (pages !== '' && pages > 0) && status !== '') {
    createTr.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages} Pages</td>
    <td><button id="read-or-not">${book.status}</button></td>
    <td><i class="fas fa-trash" id="trash"></i></td>
    `;
    addBookList.appendChild(createTr);
    
    myLibrary.push(book);
    localStorage.setItem('books', JSON.stringify(myLibrary));

    clearFields();
  }
};

const alertMessage = () => {
  if(getTitle.value === '' || getAuthor.value === '' || getPages.value === '' || getStatus.value === '') {
    alert("Please, fill all the fields");
    return;
  }
};

const trashBook = (book) => {
  if(book.target.id === 'trash') {
    if(confirm("Do you really want to trash this book?")){
      let removeTarget = book.target.offsetParent.parentNode;
      removeTarget.remove();
    }
  }
  if(book.target.id === 'read-or-not') {
    switch (book.target.innerText) {
      case "READ":
        book.target.innerHTML = "NOT READ";
        break;
      case "NOT READ":
        book.target.innerHTML = "READ";
        break;
      default:
        break;
    }
  }
};

const  clearFields = () => {
  getTitle.value = '';
  getAuthor.value = '';
  getPages.value = '';
  getStatus.value = '';
};

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

button.addEventListener('click', addBookToLibrary);
trashButton.addEventListener('click', trashBook);
