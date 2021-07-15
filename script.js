let myLibrary = [{ title: "sdf", author: "sdf", pages: "sdf" }];
bookButton = document.querySelector("#addBookButton");
function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}
bookButton.addEventListener("click", addBookToLibrary);
function addBookToLibrary() {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  myLibrary.push(new Book(title, author, pages));
  console.log(myLibrary);
}
function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    console.log(myLibrary[i].title);
  }
}
displayBooks();
