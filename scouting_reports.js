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
            players: playersScouted
        };

        // Send data to Google Sheets
        fetch("https://script.google.com/macros/s/AKfycbxlaDH70ic_4iVd79P4fExagqO2LR573ZJTZyHXmJfUfgFpxz4N3e-ls_n9AF3pXqRwLA/exec", {
            method: 'POST',
            body: JSON.stringify(report),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === "success") {
                alert("Report successfully saved to Google Sheets!");
            } else {
                alert("Error saving report to Google Sheets.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

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