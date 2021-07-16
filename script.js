"use strict";
let bookButton = document.querySelector("#addBookButton");
let booksContainer = document.querySelector("#books-container");

bookButton.addEventListener("click", addBookToLibrary);

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  if (title == "" || author == "") {
    return;
  } else {
    myLibrary.push(new Book(title, author, pages, getReadValue()));
    clearList();
    displayBooks();
  }
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
    h2.textContent = element.title;

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
      read.textContent = "not yet";
    }

    let remove = document.createElement("button");
    remove.textContent = "Remove";
    remove.classList = "remove-button";

    remove.addEventListener("click", () => {
      booksContainer.removeChild(card);
      myLibrary.splice(card, 1);
    });
    let change = document.createElement("button");
    change.textContent = "change";
    change.dataset.ID = myLibrary.indexOf(element);
    change.classList = "change-button";

    change.addEventListener("click", (element) => {
      if (myLibrary[element.target.dataset.ID].read) {
        //If the book is "read" pressing the button change it to "not read"
        myLibrary[element.target.dataset.ID].read = false;
      } else if (!myLibrary[element.target.dataset.ID].read) {
        //If the book is "not read" pressing the button change it to "read"
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

function clearList() {
  while (booksContainer.firstChild) {
    booksContainer.removeChild(booksContainer.lastChild);
  }
}
