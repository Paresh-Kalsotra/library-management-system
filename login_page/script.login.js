const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
let loginResponse = document.getElementById("loginResponse");
let signupResponse = document.getElementById("signupResponse");

//func to switch between login and signup form
function changeForm(formBox) {
  document.getElementById("loginbox").style.display = "none";
  document.getElementById("signupbox").style.display = "none";

  //hiding message div
  loginResponse.style.display = "none";
  signupResponse.style.display = "none";

  document.getElementById(formBox).style.display = "block";
}

//func to handle loginsubmit
async function sendLoginData() {
  //  Serialize form data
  const formData = new FormData(loginForm);
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  // Sending the form data using fetch
  let response = await fetch("/libraryuser/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.redirected) {
    window.location.href = response.url;
  } else {
    response = await response.json();

    //displaying message
    loginResponse.style.display = "block";
    loginResponse.innerText = response;

    //clearing the value of fields
    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";
  }
}

//func to handle signup submit
async function sendSignupData() {
  //  Serialize form data
  const formData = new FormData(signupForm);
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  // Sending the form data using fetch
  let response = await fetch("/libraryuser/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.redirected) {
    window.location.href = response.url;
  } else {
    response = await response.json();

    //displaying message
    signupResponse.style.display = "block";
    signupResponse.innerText = response;

    //clearing the input fields
    document.getElementById("signupEmail").value = "";
    document.getElementById("signupPassword").value = "";
  }
}

//----------------------------------
// listening to login submission
const loginSubmit = loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendLoginData();
});

// listening to signup submission
const signupSubmit = signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendSignupData();
});
