// login.js

function validateLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorMessage = document.getElementById('login-error-message');

    // Clear any previous error messages
    errorMessage.style.display = 'none';
    errorMessage.innerText = '';

    // Basic validation example (you can enhance this)
    if (!email.includes('@') || password.length < 6) {
        errorMessage.style.display = 'block';
        errorMessage.innerText = 'Please enter valid credentials!';
        return false;
    }

    // Simulate successful login (replace with actual authentication logic)
    alert('Login successful!');
    window.location.href = 'dashboard.html'; // Redirect to dashboard
    return true; // Form is valid
}

// Optional: Add event listener to the login button if needed
document.getElementById('login-button').addEventListener('click', validateLogin);
