async function fetchCSV() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/NoahCornish/data_holding/main/2024_season_ohl.csv');
        const data = await response.text();
        const parsedData = Papa.parse(data, { header: true }).data;

        if (parsedData.length === 0) {
            console.error('Parsed data is empty');
            return;
        }

        const teams = [...new Set(parsedData.map(player => player.Team))];
        const teamSelect = document.getElementById('teamSelect');
        teams.forEach(team => {
            const option = document.createElement('option');
            option.value = team;
            option.text = team;
            teamSelect.appendChild(option);
        });

        displayData(parsedData);
        teamSelect.dataset.rawData = JSON.stringify(parsedData);
    } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
    }
}

function displayData(data) {
    const tableBody = document.querySelector('#statsTable tbody');
    tableBody.innerHTML = '';

    data.forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player.Name}</td>
            <td>${player.GP}</td>
            <td>${player.G}</td>
            <td>${player.A}</td>
            <td>${player.PTS}</td>
            <td>${player['Pts/G']}</td>
        `;
        tableBody.appendChild(row);
    });
}

function filterByTeam() {
    const teamSelect = document.getElementById('teamSelect');
    const selectedTeam = teamSelect.value;
    const rawData = JSON.parse(teamSelect.dataset.rawData);

    const filteredData = selectedTeam ? rawData.filter(player => player.Team === selectedTeam) : rawData;
    displayData(filteredData);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchCSV();
});
