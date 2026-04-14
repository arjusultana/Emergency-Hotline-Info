// login.js

// Login function
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if(username === "admin" && password === "1234") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "admin");
        alert("Welcome Admin!");
        window.location.href = "index.html"; // Emergency page
    }
    else if(username === "user" && password === "1234") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "user");
        alert("Welcome User!");
        window.location.href = "index.html"; // Emergency page
    }
    else {
        alert("Invalid credentials!");
    }
}