async function loadUserData() {
    try {
        const response = await fetch('http://localhost:5001/api/user/data', { 
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}` 
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        populateDashboard(data);
    } catch (error) {
        console.error('Error loading user data:', error);
        alert('Error loading user data. Please log in again.');
        // Redirect to login if not authenticated
        window.location.href = '../login/login.html'; // Adjust path as necessary
    }
}

function populateDashboard(data) {
    // Set user information
    document.getElementById('user-fullname').innerText = data.fullname || 'User'; // Ensure data exists
    document.getElementById('user-email').innerText = data.email || 'No email provided';
    document.getElementById('account-balance').innerText = data.balance?.toFixed(2) || '0.00'; // Format balance to two decimal places

    // Populate loans
    const loanStatusList = document.getElementById('loan-status-list');
    loanStatusList.innerHTML = ''; // Clear previous loan entries
    data.loans.forEach(loan => {
        const loanItem = document.createElement('div');
        loanItem.innerText = `Loan Amount: $${loan.amount.toFixed(2)}, Status: ${loan.status}`; // Format amount
        loanStatusList.appendChild(loanItem);
    });

    // Populate voting history
    const votingHistoryList = document.getElementById('voting-history-list');
    votingHistoryList.innerHTML = ''; // Clear previous voting entries
    data.votingHistory.forEach(vote => {
        const voteItem = document.createElement('div');
        voteItem.innerText = `Vote ID: ${vote.id}, Decision: ${vote.decision}`;
        votingHistoryList.appendChild(voteItem);
    });

    // Populate notifications
    const notificationList = document.getElementById('notification-list');
    notificationList.innerHTML = ''; // Clear previous notifications
    data.notifications.forEach(notification => {
        const notificationItem = document.createElement('li');
        notificationItem.innerText = notification.message;
        notificationList.appendChild(notificationItem);
    });

    // Populate transaction history
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = ''; // Clear previous transactions
    data.transactions.forEach(transaction => {
        const transactionItem = document.createElement('li');
        transactionItem.innerText = `Transaction ID: ${transaction.id}, Amount: $${transaction.amount.toFixed(2)}`; // Format amount
        transactionList.appendChild(transactionItem);
    });
}

// Load user data when the dashboard is opened
document.addEventListener('DOMContentLoaded', loadUserData);
