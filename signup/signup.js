// signup.js

function validateSignup(event) {
    event.preventDefault(); // Prevent form from submitting normally

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
    console.log('Signup successful!');
    console.log('Redirecting to dashboard...'); // Debugging log for redirection
    window.location.href = 'Dashboard/dashboard.html'; // Use root-relative path
    return true; // Form is valid
}

// Add event listener to the form submit event
document.getElementById('signup-form').addEventListener('submit', validateSignup);
