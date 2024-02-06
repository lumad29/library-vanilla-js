// class (sugar syntax)
class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}
// DOM
const bookForm = document.getElementById('book-form');
const addBtn = document.getElementById('addBtn');
const form = document.getElementById('form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const isRead = document.getElementById('checkbox');
const cardContainer = document.getElementById('card-container');
const removeAllBtn = document.getElementById('removeBtnAll');

// add book function btn - shows / hides form
function addBook() {
  title.value = '';
  author.value = '';
  pages.value = '';
  isRead.checked = false;
  form.classList.toggle('active');
  if (form.classList.contains('active')) {
    cardContainer.classList.add('hide');
  } else {
    cardContainer.classList.remove('hide');
  }
}

// add book button
addBtn.addEventListener('click', addBook);

// books Array
const books = [];

//  form with submit button / add book to library
bookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  form.classList.toggle('active'); // hides
  cardContainer.classList.toggle('hide');
  let book = new Book(title.value, author.value, pages.value, isRead.checked);
  books.push(book);
  // console.log(books);
  renderBook(book);
});

function renderBook(book) {
  const card = document.createElement('div');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const btnRead = document.createElement('button');
  const btnRemove = document.createElement('button');

  card.classList.add('book-card');

  title.textContent = `Title: ${book.title}`;
  author.textContent = `Author: ${book.author}`;
  pages.textContent = `Pages: ${book.pages} pages`;

  if (book.isRead === true) {
    btnRead.textContent = 'Read';
    btnRead.classList.add('btn-read');
  } else {
    btnRead.textContent = 'Not read';
    btnRead.classList.add('btn-not-read');
  }
  btnRemove.innerHTML = 'Remove';
  btnRemove.classList.add('btn-remove');

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(btnRead);
  card.appendChild(btnRemove);
  cardContainer.appendChild(card);

  // remove book event listener
  btnRemove.addEventListener('click', removeBook);

  // remove book function
  function removeBook() {
    const index = books.indexOf(book);
    books.splice(index, 1);
    cardContainer.removeChild(card);
  }

  // remove all books event listener
  removeAllBtn.addEventListener('click', removeAll);
  // remove all books function
  function removeAll() {
    const index = books.indexOf(book);
    books.splice(index, books.length);
    // cardContainer.removeChild(cardContainer.children[0]);
    // cardContainer.textContent = '';
    while (cardContainer.firstChild) {
      cardContainer.firstChild.remove();
    }
  }

  // is read
  btnRead.addEventListener('click', toggleisRead);
  function toggleisRead() {
    if (btnRead.textContent === 'Read') {
      btnRead.textContent = 'Not read';
      btnRead.classList.add('btn-not-read');
    } else if (btnRead.textContent === 'Not read') {
      btnRead.textContent = 'Read';
      btnRead.classList.remove('btn-not-read');
      btnRead.classList.add('btn-read');
    }
  }
}
