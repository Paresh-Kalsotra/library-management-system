let id = 123;
libraryArray = [];

function Book(title, author, Borrowed = false) {
  this.id = id;
  this.title = title;
  this.author = author;
  if (Borrowed) {
    this.isBorrowed = "Un Available";
  } else {
    this.isBorrowed = "Available";
  }
}

function listenAddDetails() {
  let addTitle = document.querySelector("#addTitle").value;
  let addAuthor = document.querySelector("#addAuthor").value;
  document.getElementById("addResponse").innerText = addBook(
    addTitle,
    addAuthor
  );
  document.getElementById("addTitle").value = "";
  document.getElementById("addAuthor").value = "";
}

function addBook(title, author, isBorrowed) {
  let response;
  if (title == "" || author == "") {
    response = "Enter Valid Inputs.";
  } else {
    let addedBook = new Book(title, author, isBorrowed);
    libraryArray.push(addedBook);
    id++;
    response = `Book Added to the library: Id = ${addedBook.id} , ${addedBook.title} by ${addedBook.author}`;
  }
  updateTable(libraryArray);
  return response;
}

function searchBook() {
  let searchTitle = document.querySelector("#searchTitle").value;
  let response = "Book Not Found.";
  if (searchTitle == "") {
    response = "Enter title first.";
  } else {
    let status = "Available";
    for (let bookdetails of libraryArray) {
      if (bookdetails.title == searchTitle) {
        if (bookdetails.isborrowed) {
          status = "Not Avalaible";
        }
        response = `Book found in the library. \n Details:- ID: ${bookdetails.id}, ${bookdetails.title} by ${bookdetails.author}, Status: ${status}`;
      }
    }
  }
  document.getElementById("searchResponse").innerText = response;
  document.getElementById("searchTitle").value = "";
}

function updateTable(array) {
  const table = document.getElementById("table");
  table.innerHTML = "";
  //heading row
  table.innerHTML = `<tr><th>ID</th><th>Title</th><th>Author</th><th>Borrowed Status</th><th>Borrow/ Return</th></tr>`;
  //data rows
  for (let book of array) {
    const row = table.insertRow();
    for (const key in book) {
      const td = document.createElement("td");
      td.innerText = `${book[key]}`;
      row.appendChild(td);
    }
    const td = document.createElement("td");
    if (book.isBorrowed == "Available") {
      td.innerHTML = `<button class="statusbtn" onclick='statusUpdate(${book.id})'>Borrow</button>`;
    } else {
      td.innerHTML = `<button class ="statusbtn" onclick='statusUpdate(${book.id})'>Return</button>`;
    }
    row.appendChild(td);
  }
}

function statusUpdate(id) {
  console.log(id);
  for (let book of libraryArray) {
    if (book.id == id && book.isBorrowed == "Available") {
      book.isBorrowed = "Un Available";
      document.getElementById(
        "statusResponse"
      ).innerText = `Book," ${book.title} by ${book.author}" has been borrowed.`;
    } else if (book.id == id && book.isBorrowed == "Un Available") {
      book.isBorrowed = "Available";
      document.getElementById(
        "statusResponse"
      ).innerText = `Book," ${book.title} by ${book.author}" has been returned.`;
    }
  }
  updateTable(libraryArray);
}

//-------------------
addBook("Zero to One", " Peter Thiel");
addBook("Sapiens", " Yuval Noah Harari");
addBook("Principles", "Ray Dalio", true);
addBook("Atomic Habits", " James Clear ");

updateTable(libraryArray);

// -------------------------
const addbtn = document
  .getElementById("add-button")
  .addEventListener("click", listenAddDetails);
const searchbtn = document
  .getElementById("search-button")
  .addEventListener("click", searchBook);
