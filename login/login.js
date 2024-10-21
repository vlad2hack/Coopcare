const token = localStorage.getItem('authToken');

if (token) {
    // Token exists, redirect to dashboard
    console.log('Token found, redirecting to dashboard...');
    window.location.href = "../dashboard/dashboard.html"; // Adjust path as necessary
}

async function validateLogin(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('login-error-message');
    const loadingIndicator = document.getElementById('loading-indicator');

    // Clear any previous error messages
    errorMessage.style.display = 'none';
    errorMessage.innerText = '';
    loadingIndicator.style.display = 'none'; // Hide loading indicator initially

    // Show loading indicator
    loadingIndicator.style.display = 'block';

    try {
        console.log('Sending login request with:', { email, password });
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
    loadingIndicator.style.display = 'none';
    errorMessage.style.display = 'block';
    
    // Enhanced error logging
    console.error('Login error details:', {
        error: error,
        status: error.status,
        message: error.message
    });

    // More specific error messages
    if (!response) {
        errorMessage.innerText = 'Unable to connect to server. Please check if server is running.';
    } else if (response.status === 400) {
        errorMessage.innerText = 'Invalid email or password format';
    } else if (response.status === 500) {
        errorMessage.innerText = 'Server error. Please try again later.';
    } else {
        errorMessage.innerText = error.message || 'Login failed!';
    }
}
}

// Add event listener to the form submit event
document.getElementById('login').addEventListener('submit', validateLogin);
