// login.js

function validateLogin(event) {
    event.preventDefault(); // Prevent form from submitting normally

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
    console.log('Login successful!');
    console.log('Redirecting to dashboard...'); // Debugging log for redirection
    window.location.href = "../Dashboard/dashboard.html"; // Use root-relative path
    return true; // Form is valid
}

// Add event listener to the form submit event
document.getElementById('login-form').addEventListener('submit', validateLogin);
