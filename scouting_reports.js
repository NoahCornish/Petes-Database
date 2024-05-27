function logout() {
    window.location.href = 'index.html'; // Redirect to the welcome page
}

function saveReport() {
    const username = localStorage.getItem('loggedInUser');
    const gameDate = document.getElementById('gameDate').value;
    const team1 = document.getElementById('team1').value;
    const team2 = document.getElementById('team2').value;
    const playersScouted = document.getElementById('playersScouted').value;

    if (username && gameDate && team1 && team2 && playersScouted) {
        const report = {
            username: username,
            date: gameDate,
            team1: team1,
            team2: team2,
            players: playersScouted.split(',').map(player => player.trim())
        };

        const reports = JSON.parse(localStorage.getItem('scoutingReports')) || [];
        reports.push(report);
        localStorage.setItem('scoutingReports', JSON.stringify(reports));

        document.getElementById('gameDate').value = '';
        document.getElementById('team1').value = '';
        document.getElementById('team2').value = '';
        document.getElementById('playersScouted').value = '';

        displayReports();
    } else {
        alert("Please fill in all fields before submitting.");
    }
}

function displayReports() {
    const reports = JSON.parse(localStorage.getItem('scoutingReports')) || [];
    const reportsContainer = document.getElementById('reports');
    reportsContainer.innerHTML = '';

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    thead.innerHTML = `
        <tr>
            <th>Submitted By</th>
            <th>Date</th>
            <th>Team 1</th>
            <th>Team 2</th>
            <th>Players Scouted</th>
        </tr>
    `;

    reports.forEach(report => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${report.username}</td>
            <td>${report.date}</td>
            <td>${report.team1}</td>
            <td>${report.team2}</td>
            <td>${report.players.join(', ')}</td>
        `;
        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    reportsContainer.appendChild(table);
}

function clearReports() {
    if (confirm("Are you sure you want to clear all reports?")) {
        localStorage.removeItem('scoutingReports');
        displayReports();
    }
}

document.addEventListener('DOMContentLoaded', displayReports);