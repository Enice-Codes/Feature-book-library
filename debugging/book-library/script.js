const myLibrary = [];

window.addEventListener("load", function () {
  populateStorage();
  render();
});

// Seed the library with two starter books on first load.
function populateStorage() {
  if (myLibrary.length === 0) {
    const book1 = new Book("Robinson Crusoe", "Daniel Defoe", 252, true);
    const book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      127,
      true
    );
    myLibrary.push(book1, book2);
  }
}

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const checkInput = document.getElementById("check");
const bookForm = document.getElementById("book-form");

// Validate form input, build a new Book, add it to the library, and re-render.
bookForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const titleValue = titleInput.value.trim();
  const authorValue = authorInput.value.trim();
  const pagesValue = pagesInput.value.trim();

  if (titleValue === "" || pagesValue === "") {
    alert("Please fill all fields!");
    return;
  }

  const book = new Book(
    titleValue,
    authorValue,
    Number(pagesValue),
    checkInput.checked
  );
  myLibrary.push(book);
  render();
  bookForm.reset();
});

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  const tbody = document.getElementById("display-body");
  tbody.innerHTML = ""; // clear all rows in one operation

  myLibrary.forEach((book, i) => {
    const row = tbody.insertRow();
    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const readCell = row.insertCell(3);
    const deleteCell = row.insertCell(4);

    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    pagesCell.textContent = book.pages;

    const readToggleBtn = document.createElement("button");
    readToggleBtn.className = "btn btn-success";
    readToggleBtn.innerText = book.check ? "Yes" : "No";
    readToggleBtn.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });
    readCell.appendChild(readToggleBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-warning";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      const deletedTitle = myLibrary[i].title;
      myLibrary.splice(i, 1);
      render();
      alert(`You've deleted title: ${deletedTitle}`); // shown after deletion completes
    });
    deleteCell.appendChild(deleteBtn);
  });
}
