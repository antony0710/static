 const authenticate = (username , password) => {

    fetch('https://20.40.102.186/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
    }).then(response => response.json())
    .then(data => {
        if(data.token){
            localStorage.setItem('username', username);
            localStorage.setItem('token', data.token);
            console.log("Login successful and token stored");
            window.location.href = './index.html';
        }     
        else{
            console.log("Login failed");
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};



document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('Login_Register').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        console.log('Username: ' + username);
        console.log('Username: ' + password);
        authenticate(username , password);
        // Rest of your code...
    });
});