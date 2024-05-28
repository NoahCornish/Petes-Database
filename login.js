function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if ((username === "Noah" && password === "Buck2001#") || 
        (username === "Clair" && password === "Monkey") ||
        (username === "Julianna" && password === "Scruffy")) {
        localStorage.setItem('loggedInUser', username);
        window.location.href = "main.html";
    } else {
        alert("Access denied. Please contact administration for login assistance.");
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}
