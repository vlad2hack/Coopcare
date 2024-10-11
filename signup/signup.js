// signup.js

function validateForm(event) {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const coopDao = document.getElementById('coop-dao').value;
    const errorMessage = document.getElementById('error-message');

    // Clear previous error messages
    errorMessage.textContent = '';

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

    // If all validations pass, simulate sending data to the server
    console.log('Form is valid. Simulating server submission...');
    
    // Simulate an AJAX call to the server
    setTimeout(() => {
        console.log('Registration successful!');
        // Redirect to dashboard
        window.location.href = "../dashboard/dashboard.html";
    }, 1000); // Simulate a 1-second delay for the "server" to process

    return false; // Prevent the form from submitting normally
}

// Add event listener for form submission
document.getElementById('signup').addEventListener('submit', validateForm);
