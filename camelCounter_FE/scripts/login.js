import config from '../config.js';
const apiUrl = config.apiUrl;

const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get("username");
const mode = urlParams.get("for");
const submitButton = document.getElementById("submit");

document.addEventListener("DOMContentLoaded", function() {
    const userLabel = document.getElementById("user-label");
    userLabel.innerHTML = `Enter password for: ${user}`;
});


submitButton.addEventListener("click", function() {
    event.preventDefault();
    const password = document.getElementById("password").value;

    fetch(`${apiUrl}/api/users/${user}/full`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({password}),
        })
        .then((response) => response.json())
        .then(data => {
            if (btoa(password) === data.encryptedPassword) {
                // Store the password in sessionStorage
                sessionStorage.setItem('userPassword', password);
                // Redirect to another page with the username
                if (mode === "edit") {
                    window.location.href = `./editUser.html?username=${encodeURIComponent(user)}`;
                } else if (mode === "delete") {
                    window.location.href = `./deleteUser.html?username=${encodeURIComponent(user)}`;
                }
            } else {
                alert('Invalid credentials');
            }
        })
        .catch(error => 
            alert(`Login failed: ${error.message}`
        ));
});