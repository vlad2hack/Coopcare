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

    // If all validations pass, send data to the server
    console.log('Form is valid. Sending data to the server...');

    // Simulate an API call using fetch
    fetch('mongodb+srv://eejegwa7:talk@coopcare.zspws.mongodb.net/?retryWrites=true&w=majority&appName=Coopcare
', {
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
    .then(response => response.json())
    .then(data => {
        console.log('Registration successful!', data);
        // Redirect to dashboard
        window.location.href = "../dashboard/dashboard.html";
    })
    .catch(error => {
        console.error('Error:', error);
        errorMessage.textContent = 'There was an error processing your request.';
    });

    return false; // Prevent the form from submitting normally
}

// Add event listener for form submission
document.getElementById('signup').addEventListener('submit', validateForm);
