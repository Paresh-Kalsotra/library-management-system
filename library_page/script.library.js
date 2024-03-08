const url = " http://localhost:8000/library/books/";

async function searchBook() {
  let searchTitle = document.querySelector("#searchTitle").value;
  let response = "Book Not Found.";
  if (searchTitle == "") {
    response = "Enter Book Title first.";
  } else {
    //fetching data
    const fet = await fetch(url + searchTitle, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const searchedBook = await fet.json();

    if (searchedBook) {
      response = `Book found in the library. \n  ${searchedBook.title} by ${searchedBook.author}, ID: ${searchedBook._id} , Borrowed: ${searchedBook.isBorrowed}`;
    }
  }

  document.getElementById("searchResponse").innerText = response; //response to ui
  document.getElementById("searchTitle").value = ""; // clearing input field
}

//func to remove book
async function removeBook() {
  let removeTitle = document.querySelector("#removeTitle").value;
  let response = "Book Not Found.";
  if (removeTitle == "") {
    response = "Enter Book Title first.";
  } else {
    //fetching data
    const fet = await fetch(url + removeTitle, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await fet.json();
  }

  updateTable();
  document.getElementById("removeResponse").innerText = response; //response to ui
  document.getElementById("removeTitle").value = ""; // clearing input field
}

async function addBook() {
  let addTitle = document.querySelector("#addTitle").value;
  let addAuthor = document.querySelector("#addAuthor").value;
  let response;

  if (addTitle == "" || addAuthor == "") {
    response = "Both fields are required.";
  } else {
    const data = {
      title: addTitle,
      author: addAuthor,
    };
    //fetching using post method
    const fet = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    response = await fet.json();
  }
  document.getElementById("addResponse").innerText = response;
  updateTable();

  //update book list
  document.getElementById("addTitle").value = ""; //clearing the value of fields
  document.getElementById("addAuthor").value = "";
}

async function statusUpdate(id, status) {
  const data = {
    id: id,
    status: status,
  };
  //fetching using post method
  const fet = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  let response = await fet.json();

  document.getElementById("statusResponse").innerText = response;

  updateTable();
}

//func to update booklist table
async function updateTable() {
  //fetching booklist
  const fet = await fetch(url);
  const booklist = await fet.json();

  const table = document.getElementById("table");
  table.innerHTML = "";
  //heading row
  table.innerHTML = `<tr><th>ID</th><th>Title</th><th>Author</th><th>Borrowed Status</th><th>Borrow/ Return</th></tr>`;

  //book rows
  for (let book of booklist) {
    const row = table.insertRow(); //creating row for each book

    const columnHeads = ["_id", "title", "author", "isBorrowed"];
    //getting desired key and making table cells
    for (const key in book) {
      if (columnHeads.includes(key)) {
        const td = document.createElement("td");
        td.innerText = book[key];
        row.appendChild(td);
      }
    }

    const td = document.createElement("td"); //button
    const buttonText = book.isBorrowed ? "Return" : "Borrow";
    td.innerHTML = `<button class="statusbtn" onclick='statusUpdate("${book._id}", ${book.isBorrowed})'>${buttonText}</button>`;

    row.appendChild(td);
  }
}

// //-------------------

updateTable();

// -------------------------
const addbtn = document
  .getElementById("add-button")
  .addEventListener("click", addBook);

const searchbtn = document
  .getElementById("search-button")
  .addEventListener("click", searchBook);

const removebtn = document
  .getElementById("remove-button")
  .addEventListener("click", removeBook);
