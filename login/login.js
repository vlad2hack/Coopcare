const token = localStorage.getItem('authToken');

if (token) {
    // Token exists, redirect to dashboard
    console.log('Token found, redirecting to dashboard...');
    window.location.href = "../dashboard/dashboard.html"; // Adjust path as necessary
}

async function validateLogin(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorMessage = document.getElementById('login-error-message');
    const loadingIndicator = document.getElementById('loading-indicator');

    // Clear any previous error messages
    errorMessage.style.display = 'none';
    errorMessage.innerText = '';
    loadingIndicator.style.display = 'none'; // Hide loading indicator initially

    // Show loading indicator
    loadingIndicator.style.display = 'block';

    try {
        // Send login details to backend
        const response = await fetch('http://localhost:5001/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log('Login response data:', data);

        // Hide loading indicator after response
        loadingIndicator.style.display = 'none';

        if (!response.ok) {
            throw new Error(data.message || 'Login failed!');
        }

        // If login is successful, redirect to dashboard
        console.log('Login successful!');
        localStorage.setItem('authToken', data.token); // Store token
        window.location.href = "../dashboard/dashboard.html"; // Redirect to dashboard
    } catch (error) {
        // Hide loading indicator if error occurs
        loadingIndicator.style.display = 'none';
        errorMessage.style.display = 'block';
        errorMessage.innerText = error.message || 'Login failed!';
    }
}

// Add event listener to the form submit event
document.getElementById('login').addEventListener('submit', validateLogin);
