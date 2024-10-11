// signup.js

function sanitizeInput(input) {
    // Basic sanitization to prevent XSS
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function validateForm(event) {
    event.preventDefault(); // Prevent default form submission

    const name = sanitizeInput(document.getElementById('name').value);
    const email = sanitizeInput(document.getElementById('email').value);
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const coopDao = document.getElementById('coop-dao').value;
    const errorMessage = document.getElementById('error-message');

    // Clear previous error messages
    errorMessage.textContent = '';
    errorMessage.style.color = 'red'; // Make error message red

    // Validate name
    if (name.trim() === '') {
        errorMessage.textContent = 'Please enter your full name.';
        return false;
    }

    // Validate email
    if (!/\S+@\S+\.\S+/.test(email)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        return false;
    }

    // Validate password
    if (password.length < 8) {
        errorMessage.textContent = 'Password must be at least 8 characters long.';
        return false;
    }

    // Confirm password
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match.';
        return false;
    }

    // Validate DAO selection
    if (coopDao === '') {
        errorMessage.textContent = 'Please select a Cooperative Society.';
        return false;
    }

    // If all validations pass, send data to the server
    console.log('Form is valid. Sending data to the server...');

    // Show a loading indicator
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'block';

    // Make sure to replace with your actual backend endpoint
    fetch('http://localhost:5001/api/login', { // Replace with your actual endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            coopDao: coopDao
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Registration successful!', data);
        // Store token if returned from the server
        if (data.token) {
            localStorage.setItem('authToken', data.token); // Store token for authenticated session
        }
        // Provide user feedback before redirecting
        alert('Registration successful! Redirecting to dashboard...');
        window.location.href = "../dashboard/dashboard.html"; // Redirect to dashboard
    })
    .catch(error => {
        console.error('Error:', error);
        errorMessage.textContent = 'There was an error processing your request. Please try again later.';
    })
    .finally(() => {
        // Hide the loading indicator after the fetch is done
        loadingIndicator.style.display = 'none';
    });

    return false; // Prevent the form from submitting normally
}

// Add event listener for form submission
document.getElementById('signup').addEventListener('submit', validateForm);
