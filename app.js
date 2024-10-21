const API_URL = "http://localhost:5001/api"; 
// Function to sign up a new user
async function signUpUser(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const cooperative = document.getElementById("cooperative").value; // Updated ID

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
                cooperative, // Updated ID
            }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("User registered successfully!");
            window.location.href = "../login/login.html"; // Redirect to login
        } else {
            alert(data.msg || "Failed to register user.");
        }
    } catch (error) {
        console.error("Error during signup:", error);
        alert("An error occurred. Please try again later.");
    }
}

// Function to log in the user
async function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
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
            localStorage.setItem("authToken", data.token); // Store token in local storage
            window.location.href = "dashboard.html"; // Redirect to dashboard
        } else {
            alert(data.msg || "Failed to log in.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again later.");
    }
}

// Function to display the user's name
function displayUserName() {
    const token = localStorage.getItem("authToken");
    const userNameElement = document.getElementById("userName");
    if (userNameElement) { // Ensure the element exists
        if (token) {
            try {
                const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the token to get user info
                userNameElement.innerText = `Hello, ${decoded.name}`;
            } catch (error) {
                console.error("Error decoding token:", error);
                userNameElement.innerText = "Hello, User"; // Fallback if token decoding fails
            }
        } else {
            userNameElement.innerText = "Hello, Guest"; // Fallback if token is not present
        }
    }
}

// Call the function to display the user's name when the dashboard loads
document.addEventListener('DOMContentLoaded', displayUserName);
