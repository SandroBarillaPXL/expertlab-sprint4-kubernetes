import config from '../config.js';
const apiUrl = config.apiUrl;

const userList = document.getElementById('user-list');
const reloadButton = document.getElementById('reload-button');

function fetchUsers() {
    fetch(`${apiUrl}/api/users`)
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                const name  = user.username;
                const camelcount  = user.camels;

                const li = document.createElement('li');
                li.classList.add('user-row');

                const userName = document.createElement('div');
                userName.innerHTML = name;
                userName.classList.add('user-name');
                li.appendChild(userName);

                const userNumber = document.createElement('div');
                userNumber.classList.add('user-number');
                userNumber.innerHTML = `${camelcount} camels`;
                li.appendChild(userNumber);

                const userImages = document.createElement('div');
                userImages.classList.add('imageButtons');
                
                const anchor1 = document.createElement('a');
                anchor1.href = `./login.html?username=${name}&for=edit`;

                const image1 = document.createElement('img');
                image1.src = './assets/pencil.png';
                image1.alt = 'pencil';
                image1.classList.add('imageButton');
                image1.id = 'edit';
                anchor1.appendChild(image1);
                userImages.appendChild(anchor1);

                const anchor2 = document.createElement('a');
                anchor2.href = `./login.html?username=${name}&for=delete`;

                const image2 = document.createElement('img');
                image2.src = './assets/trash.png';
                image2.alt = 'trash';
                image2.classList.add('imageButton');
                image2.id = 'delete';
                anchor2.appendChild(image2);
                userImages.appendChild(anchor2);

                li.appendChild(userImages);

                userList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', fetchUsers);

reloadButton.addEventListener('click', () => {
    while (userList.firstChild) {
        userList.removeChild(userList.firstChild);
    }
    fetchUsers();
});