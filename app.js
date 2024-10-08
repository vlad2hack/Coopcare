// frontend/app.js

const API_URL = "http://localhost:5000/api"; // Change this to your deployed URL when ready

// Function to sign up a new user
async function signUpUser(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const cooperative = document.getElementById("cooperative").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            password,
            cooperative,
        }),
    });

    const data = await response.json();
    if (response.ok) {
        alert("User registered successfully!");
        window.location.href = "login.html"; // Redirect to login
    } else {
        alert(data.msg || "Failed to register user.");
    }
}

// Function to log in the user
async function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem("token", data.token); // Store token in local storage
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
        alert(data.msg || "Failed to log in.");
    }
}
// Add these functions to app.js

function displayUserName() {
    const token = localStorage.getItem("token");
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the token to get user info
    document.getElementById("userName").innerText = `Hello, ${decoded.name}`;
}

function takeLoan() {
    // Implementation for applying for a loan
}

function validateLoan() {
    // Implementation for validating a loan
}

function vote() {
    // Implementation for voting
}

// Call the function to display the user's name when the dashboard loads
displayUserName();

