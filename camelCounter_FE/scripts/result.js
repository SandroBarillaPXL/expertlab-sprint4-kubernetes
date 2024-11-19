import config from '../config.js';
const apiUrl = config.apiUrl;

document.addEventListener("DOMContentLoaded", function() {
    const targetParagraph = document.getElementById("camels");
    const messageParagraph = document.getElementById("message");
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get("user");

    fetch(`${apiUrl}/api/users/${user}`)
        .then(response => response.json())
        .then(data => {
            const camelsValue = data.camels;
            targetParagraph.textContent = `${camelsValue} camels`;
            if (camelsValue > 149 ) {
                messageParagraph.textContent = "...are you cheating?";
            } else if (camelsValue > 100) {
                messageParagraph.textContent = "That's more than the Sheikh of Bahrain has in his backyard!";
            } else if (camelsValue > 70) {
                messageParagraph.textContent = "In Qatar, you could buy a small estate with this!";
            } else if (camelsValue > 50) {
                messageParagraph.textContent = "In Saudi Arabia, you can buy a Ferrari for about 30 camels!";
            } else if (camelsValue > 0) {
                messageParagraph.textContent = "Maybe you should consider valuing yourself in dromederies instead? They have less humps.";
            } else if (camelsValue === 0) {
                messageParagraph.textContent = "That's unlucky..";
            } else {
                messageParagraph.textContent = "That's a negative number of camels! You owe the developper someone camels!";
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
});