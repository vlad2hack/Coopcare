let proposals = []; // To store proposals temporarily
let members = []; // To store members

// Handle Wallet Connection
document.getElementById('connect-wallet').addEventListener('click', async () => {
    if (window.solana && window.solana.isPhantom) {
        try {
            const response = await window.solana.connect();
            const walletAddress = response.publicKey.toString();

            // Replace button text with wallet address
            const connectWalletButton = document.getElementById('connect-wallet');
            connectWalletButton.innerText = `Wallet: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
            connectWalletButton.disabled = true; // Disable the button to prevent reconnecting

            // Optionally, display the full wallet address elsewhere
            document.getElementById('wallet-address').innerText = `Connected: ${walletAddress}`;
        } catch (error) {
            alert('Failed to connect wallet!');
        }
    } else {
        if (confirm('Phantom Wallet not found. Would you like to install it?')) {
            window.open('https://phantom.app/', '_blank');
        }
    }
});

// Handle Transaction
document.getElementById('transaction-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const recipient = document.getElementById('recipient').value;
    const amount = parseFloat(document.getElementById('amount').value);

    // Transaction logic here (using Solana Web3.js)
    alert(`Sending ${amount} SOL to ${recipient}`);
    // Note: Add actual Solana transaction logic later
});

// Handle Proposal Creation
document.getElementById('create-proposal-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const proposalText = document.getElementById('proposal').value;

    if (proposalText) {
        const proposalId = proposals.length + 1;
        proposals.push({ id: proposalId, text: proposalText, votes: { yes: 0, no: 0 } });
        alert(`Proposal Created! ID: ${proposalId}`);
        document.getElementById('proposal').value = ''; // Clear form input
        updateResultsDisplay();
    }
});

// Handle Voting
document.getElementById('vote-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const proposalId = parseInt(document.getElementById('proposal-id').value);
    const vote = document.getElementById('vote').value;

    const proposal = proposals.find(p => p.id === proposalId);

    if (proposal) {
        proposal.votes[vote]++;
        alert(`You voted ${vote.toUpperCase()} on Proposal ID: ${proposalId}`);
        updateResultsDisplay();
    } else {
        alert("Proposal not found!");
    }
});

// Update Results Display
function updateResultsDisplay() {
    const resultDisplay = document.getElementById('result-display');
    resultDisplay.innerHTML = proposals.map(proposal => `
        <div>
            <strong>Proposal ID:</strong> ${proposal.id} - ${proposal.text}<br>
            <strong>Yes Votes:</strong> ${proposal.votes.yes} | <strong>No Votes:</strong> ${proposal.votes.no}
        </div>
    `).join('');
}

// Handle Adding New Members
document.getElementById('add-member-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const memberName = document.getElementById('member-name').value;
    const memberAddress = document.getElementById('member-address').value;

    if (memberName && memberAddress) {
        members.push({ name: memberName, address: memberAddress });
        alert(`Member ${memberName} added!`);
        document.getElementById('member-name').value = ''; // Clear input
        document.getElementById('member-address').value = ''; // Clear input
        updateMembersDisplay();
    }
});

// Update Members Display
function updateMembersDisplay() {
    const membersDisplay = document.getElementById('members-display');
    membersDisplay.innerHTML = members.length ? members.map(member => `<li>${member.name} - ${member.address}</li>`).join('') : 'No members added yet.';
}
