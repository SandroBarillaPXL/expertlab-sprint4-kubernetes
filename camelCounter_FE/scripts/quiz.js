import config from '../config.js';
const apiUrl = config.apiUrl;

const quizForm = document.getElementById('quizForm');

quizForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get all the form inputs
    const inputs = quizForm.querySelectorAll('input, select');

    // Create an empty object to store the answers
    const answers = {};

    // Loop through each input and add its value to the answers object
    inputs.forEach((input) => {
        answers[input.name] = input.value;
    });

    // Check if password and confirm password match
    if (answers.password !== answers.repeatPassword) {
        alert('Passwords do not match');
        window.scrollTo({ top: 0, behavior: 'smooth'});
        return;
    }

    // Make an API request with the answers object
    fetch(`${apiUrl}/api/users/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
    })
    .then((response) => response.json())
    .then((data) => {
        // Redirect to result.html with the username as a query parameter
        const username = answers.username; // Assuming the username input has the name "username"
        window.location.href = `./result.html?user=${encodeURIComponent(username)}`;
    })
    .catch((error) => {
        // Handle any errors
        console.error(error);
    });
});