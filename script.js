"use strict";
let bookButton = document.querySelector("#addBookButton");
let booksContainer = document.querySelector("#books-container");
let title = document.getElementById("title");
let author = document.getElementById("author");
let pages = document.getElementById("pages");

bookButton.addEventListener("click", addBookToLibrary);

let myLibrary = JSON.parse(localStorage.getItem("library")) || [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary() {
  if (title.value == "" || author.value == "" || pages.value == null) {
    return;
  } else {
    myLibrary.push(
      new Book(title.value, author.value, pages.value, getReadValue())
    );
    clearList();
    updateLocalStorage();
    displayBooks();
    clearForm();
  }
}
function clearForm() {
  title.value = "";
  author.value = "";
  pages.value = "";
}
const getReadValue = () => {
  if (document.querySelector('input[name="read"]:checked').value == "yes")
    return true;
  else return false;
};

function displayBooks() {
  myLibrary.forEach((element) => {
    let card = document.createElement("div");
    card.classList = "card";

    let h2 = document.createElement("h2");
    h2.textContent = `"${element.title}"`;

    let p1 = document.createElement("p");
    p1.textContent = `by`;

    let h3 = document.createElement("h3");
    h3.textContent = element.author;

    let p2 = document.createElement("p");
    p2.textContent = `Pages: ${element.pages}`;
    let read = document.createElement("p");

    if (element.read == true) {
      read.textContent = "Read";
    } else {
      read.textContent = "Not Read";
    }

    let remove = document.createElement("button");
    remove.textContent = "Remove";
    remove.classList = "remove-button";

    remove.addEventListener("click", () => {
      booksContainer.removeChild(card);
      myLibrary.splice(card, 1);
      updateLocalStorage();
    });

    let change = document.createElement("button");
    change.textContent = "Read Status";
    change.dataset.ID = myLibrary.indexOf(element);
    change.classList = "change-button";

    change.addEventListener("click", (element) => {
      if (myLibrary[element.target.dataset.ID].read) {
        myLibrary[element.target.dataset.ID].read = false;
      } else if (!myLibrary[element.target.dataset.ID].read) {
        myLibrary[element.target.dataset.ID].read = true;
      }
      clearList();
      displayBooks();
    });

    booksContainer.append(card);
    card.append(h2);
    card.append(p1);
    card.append(h3);
    card.append(p2);
    card.append(read);
    card.append(remove);
    card.append(change);
  });
}
function updateLocalStorage() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
}

function clearList() {
  while (booksContainer.firstChild) {
    booksContainer.removeChild(booksContainer.lastChild);
  }
}
window.onload = displayBooks();
