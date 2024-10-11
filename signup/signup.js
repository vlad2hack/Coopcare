// signup.js

function validateSignup() {
    const fullName = document.getElementById('signup-fullname').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const errorMessage = document.getElementById('signup-error-message');

    // Clear any previous error messages
    errorMessage.style.display = 'none';
    errorMessage.innerText = '';

    // Basic validation
    if (!fullName || !email.includes('@') || password.length < 6 || password !== confirmPassword) {
        errorMessage.style.display = 'block';
        errorMessage.innerText = 'Please fill in all fields correctly!';
        return false;
    }

    // Simulate successful signup (replace with actual signup logic)
    alert('Signup successful!');
    window.location.href = '../Dashboard/dashboard.html'; // Redirect to dashboard
    return true; // Form is valid
}

// Optional: Add event listener to the signup button if needed
document.getElementById('signup-button').addEventListener('click', validateSignup);
