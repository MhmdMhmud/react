var signupBtn = document.getElementById("signupBtn");
if (signupBtn) {
  signupBtn.addEventListener("click", function () {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var usersArray = JSON.parse(localStorage.getItem("users")) || [];
    var existingUser = usersArray.find((user) => user.email === email);
    if (existingUser) {
      alert("This email is already registered. Please use a different email.");
      return;
    }
    var nameRegex = /^[A-Za-z]{3,}$/;
    if (!nameRegex.test(name)) {
      alert("Please enter a valid name (at least 3 characters in English).");
      return;
    }
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    var user = { name, email, password };
    usersArray.push(user);
    localStorage.setItem("users", JSON.stringify(usersArray));
    setTimeout(function () {
      window.location.href = "./login.html";
    }, 1000);
  });
}
var loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var loginEmail = document.getElementById("loginEmail").value;
    var loginPassword = document.getElementById("password").value;
    var usersArray = JSON.parse(localStorage.getItem("users")) || [];
    var user = usersArray.find(
      (u) => u.email === loginEmail && u.password === loginPassword
    );
    if (user) {
      localStorage.setItem("currentUserEmail", loginEmail);
      window.location.href = "./home.html";
    } else {
      alert("Invalid email or password!");
    }
  });
}
if (document.getElementById("userName")) {
  var currentUserEmail = localStorage.getItem("currentUserEmail");
  var usersArray = JSON.parse(localStorage.getItem("users")) || [];
  var user = usersArray.find((u) => u.email === currentUserEmail);
  if (user) {
    document.getElementById("userName").textContent = `Welcome ${user.name}`;
  } else {
    document.getElementById("userName").textContent = "User not found.";
  }
}
