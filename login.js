function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if ((username === "Noah" && password === "Buck2001#") || 
        (username === "Clair" && password === "Monkey") ||
        (username === "Julianna" && password === "Scruffy")) {
        localStorage.setItem('loggedInUser', username);
        window.location.href = "main.html"; // Updated path
    } else {
        alert("Error. Username and/or password invalid.");
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html'; // Updated path
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('username').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            login();
        }
    });
    document.getElementById('password').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            login();
        }
    });
});
