const url = " http://localhost:8000/library/books/";

async function searchBook() {
  let searchTitle = document.querySelector("#searchTitle").value;
  let response = "Book Not Found.";
  let fet;

  if (searchTitle == "") {
    document.getElementById("searchResponse").innerText =
      "Enter Book Title first."; //response to ui
  } else {
    //fetching data
    fet = await fetch(url + searchTitle, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // checking for redirection (jwt auth failed)
    if (fet.redirected) {
      alert("Session Expired, Please Login Again!!");
      window.location.href = fet.url;
    } else {
      const searchedBook = await fet.json();
      if (searchedBook) {
        response = `Book found in the library. \n  ${searchedBook.title} by ${searchedBook.author}, ID: ${searchedBook._id} , Borrowed: ${searchedBook.isBorrowed}`;
      }
      document.getElementById("searchResponse").innerText = response; //response to ui
    }
  }
  document.getElementById("searchTitle").value = ""; // clearing input field
}

//func to remove book
async function removeBook() {
  let removeTitle = document.querySelector("#removeTitle").value;
  let response = "Book Not Found.";
  let fet;

  if (removeTitle == "") {
    document.getElementById("removeResponse").innerText =
      "Enter Book Title first.";
  } else {
    //fetching data
    fet = await fetch(url + removeTitle, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    //checking for redirection
    if (fet.redirected) {
      alert("Session Expired, Please Login Again!!");

      window.location.href = fet.url;
    } else {
      response = await fet.json();
      updateTable();
      document.getElementById("removeResponse").innerText = response; //response to ui
    }
  }
  document.getElementById("removeTitle").value = ""; // clearing input field
}

async function addBook() {
  let addTitle = document.querySelector("#addTitle").value;
  let addAuthor = document.querySelector("#addAuthor").value;
  let response, fet;

  if (addTitle == "" || addAuthor == "") {
    document.getElementById("addResponse").innerText =
      "Both fields are required.";
  } else {
    const data = {
      title: addTitle,
      author: addAuthor,
    };
    //fetching using post method
    fet = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    //checking for redirection
    if (fet.redirected) {
      alert("Session Expired, Please Login Again!!");
      window.location.href = fet.url;
    } else {
      response = await fet.json();

      document.getElementById("addResponse").innerText = response;

      //update book list
      updateTable();
    }
  }
  document.getElementById("addTitle").value = ""; //clearing the value of fields
  document.getElementById("addAuthor").value = "";
}

//func to change the borrow/return status
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

  //checking for redirection
  if (fet.redirected) {
    alert("Session Expired, Please Login Again!!");
    window.location.href = fet.url;
  } else {
    response = await fet.json();

    document.getElementById("statusResponse").innerText = response;
    updateTable();
  }
}

//func to update booklist table
async function updateTable() {
  //fetching booklist
  let fet = await fetch(url + `page/${pageNo}`);

  if (fet.redirected) {
    window.location.href = fet.url;
  } else {
    const booklist = await fet.json();

    const table = document.getElementById("table");
    table.innerHTML = "";
    //heading row
    table.innerHTML = `<tr><th>Title</th><th>Author</th><th>Borrowed Status</th><th>Borrow/ Return</th></tr>`;

    //book rows
    for (let book of booklist) {
      const row = table.insertRow(); //creating row for each book

      const columnHeads = ["title", "author", "isBorrowed"];
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
}

//-------------------
let pageNo = 1; //setting page number for pagination of table

updateTable();

// -------------------------

const searchbtn = document
  .getElementById("search-button")
  .addEventListener("click", searchBook);

const addbtn = document
  .getElementById("add-button")
  .addEventListener("click", addBook);

const removebtn = document
  .getElementById("remove-button")
  .addEventListener("click", removeBook);
