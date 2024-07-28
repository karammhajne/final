document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (user && token) {
        document.getElementById('user-welcome').textContent = `Welcome ${user.firstName}`;
        document.getElementById('user-img').src = user.img;

        fetch(`http://localhost:3000/api/reports/user/${user.userID}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(reports => {
            const reportContainer = document.getElementById('report-container');
            reports.forEach(report => {
                const reportDiv = document.createElement('div');
                reportDiv.classList.add('report');

                reportDiv.innerHTML = `
                    <p><strong>Plate:</strong> ${report.plate}</p>
                    <p><strong>Details:</strong> ${report.details}</p>
                    <p><strong>Date:</strong> ${report.date}</p>
                    <button class="view-details-button" data-report-id="${report.reportID}">View Details</button>
                `;

                reportContainer.appendChild(reportDiv);

                reportDiv.querySelector('.view-details-button').addEventListener('click', function() {
                    const reportID = this.getAttribute('data-report-id');
                    window.location.href = `report_details.html?reportID=${reportID}`;
                });
            });
        })
        .catch(error => console.error('Error fetching reports:', error));
    } else {
        alert('User not authenticated. Please log in.');
        window.location.href = 'login.html';
    }
});
