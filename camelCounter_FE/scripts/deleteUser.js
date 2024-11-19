import config from '../config.js';
const apiUrl = config.apiUrl;

const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get("username");
const yesButton = document.getElementById("button-green")
const noButton = document.getElementById("button-red")

document.addEventListener("DOMContentLoaded", function() {
    const userLabel = document.getElementById("user-label");
    userLabel.innerHTML = `Are you sure you want to delete user: ${user}`;
});

yesButton.addEventListener('click', function() {
    fetch(`${apiUrl}/api/users/${user}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: sessionStorage.getItem('userPassword'),
        }),
    })
    .then(data => {
        alert(`User ${user} deleted`);
        sessionStorage.removeItem('userPassword');
        window.location.href = './users.html';
    })
    .catch(error => 
        console.error('Error:', error)
    );
});


noButton.addEventListener('click', function () {
    sessionStorage.removeItem('userPassword');
    window.location.href = './users.html';
});