import config from '../config.js';
const apiUrl = config.apiUrl;

const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get("username");
const quizForm = document.getElementById('edit-form');

document.addEventListener('DOMContentLoaded', () => {
    fetch(`${apiUrl}/api/users/${user}/full`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: sessionStorage.getItem('userPassword'),
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Populate the form with retrieved values
        for (const questionNumber in data.answers) {
            const questionValue = data.answers[questionNumber];
            const inputElement = document.querySelector(`[name="${questionNumber}"]`);

            if (inputElement) {
                inputElement.value = questionValue;
            }
        }
    })
    .catch(error => 
        console.error('Error fetching quiz answers:', error)
    );
});


quizForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get all the form inputs
    const inputs = quizForm.querySelectorAll('input, select');

    // Create an empty object to store the answers
    const answers = {};
    answers['password'] = sessionStorage.getItem('userPassword');

    // Loop through each input and add its value to the answers object
    inputs.forEach((input) => {
        answers[input.name] = input.value;
    });

    // Make an API request with the answers object
    fetch(`${apiUrl}/api/users/${user}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
        })
        .then((response) => response.json())
        .then((data) => {
            // Handle the API response
            sessionStorage.removeItem('userPassword');
            window.location.href = `./result.html?user=${user}`;
            
        })
        .catch((error) => {
            // Handle any errors
            console.error(error);
    });
});