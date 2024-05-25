function logout() {
    window.location.href = 'index.html'; // Redirect to the welcome page
}

function saveReport() {
    const report = document.getElementById('scoutingReport').value;
    if (report.trim() !== "") {
        const reports = JSON.parse(localStorage.getItem('scoutingReports')) || [];
        reports.push(report);
        localStorage.setItem('scoutingReports', JSON.stringify(reports));
        document.getElementById('scoutingReport').value = ''; // Clear the textarea
        displayReports();
    } else {
        alert("Please enter a scouting report before submitting.");
    }
}

function displayReports() {
    const reports = JSON.parse(localStorage.getItem('scoutingReports')) || [];
    const reportsContainer = document.getElementById('reports');
    reportsContainer.innerHTML = '';
    reports.forEach(report => {
        const reportElement = document.createElement('div');
        reportElement.className = 'report';
        reportElement.innerText = report;
        reportsContainer.appendChild(reportElement);
    });
}

function clearReports() {
    if (confirm("Are you sure you want to clear all reports?")) {
        localStorage.removeItem('scoutingReports');
        displayReports();
    }
}

document.addEventListener('DOMContentLoaded', displayReports);
