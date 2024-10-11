// login.js

async function validateLogin(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorMessage = document.getElementById('login-error-message');

    // Clear any previous error messages
    errorMessage.style.display = 'none';
    errorMessage.innerText = '';

    try {
        // Send login details to backend
        const response = await fetch('https://your-api-url.com/api/login', { // Replace with your actual API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            const message = data.message || 'An error occurred. Please try again.';
            throw new Error(message);
        }

        // If login is successful, redirect to dashboard
        console.log('Login successful!');
        localStorage.setItem('authToken', data.token); // Store token
        window.location.href = "../dashboard/dashboard.html"; // Redirect to dashboard
    } catch (error) {
        errorMessage.style.display = 'block';
        errorMessage.innerText = error.message || 'Login failed!';
    }
}

// Add event listener to the form submit event
document.getElementById('login-form').addEventListener('submit', validateLogin);
