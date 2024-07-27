document.addEventListener("DOMContentLoaded", () => {
    fetchReportsFromJson();
});

let reports = [];

function fetchReportsFromJson() {
    console.log('Fetching reports...');
    fetch('data/data.json')
        .then(response => response.json())
        .then(data => {
            console.log('Reports fetched:', data);
            reports = data.reports.concat(JSON.parse(localStorage.getItem('reports')) || []);
            displayReports(reports);
        })
        .catch(error => console.error('Error fetching reports:', error));
}

function displayReports(reportList) {
    console.log('Displaying reports...', reportList);
    const reportListElement = document.getElementById("report-list");
    reportListElement.innerHTML = '';
    reportList.forEach((report) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${report.image}" alt="Car Image">
            <div class="report-details">
                <div class="info">
                    <p>${report.plate} <br> ${report.reason}</p>
                </div>
                <div class="pipe">
                    <span>&#124;</span>
                </div>
                <div class="location">
                    <p>${report.location}</p>
                </div>
                <div class="date">
                    <p>${report.date}</p>
                </div>
                <div class="status">
                    ${report.urgent ? '<span>⚠️</span>' : ''}
                    ${report.status === 'call done' ? '<span>✔️</span>' : ''}
                </div>
            </div>
            <i class="fa fa-trash" data-id="${report.id}"></i>
        `;
        li.onclick = (event) => {
            if (!event.target.classList.contains('fa-trash')) {
                openReportDetails(report.id);
            }
        };
        reportListElement.appendChild(li);
    });

    // Add event listeners to the delete buttons
    document.querySelectorAll('.fa-trash').forEach(button => {
        button.addEventListener('click', (event) => {
            deleteReportFromHistory(event.target.dataset.id, event);
        });
    });
}

function openReportDetails(id) {
    const report = reports.find(r => r.id === id);
    const reportDetails = JSON.stringify(report);
    window.location.href = `report_detail.html?report=${encodeURIComponent(reportDetails)}`;
}

function deleteReportFromHistory(id, event) {
    event.stopPropagation();
    reports = reports.filter(r => r.id !== parseInt(id));
    localStorage.setItem('reports', JSON.stringify(reports));
    displayReports(reports);
    console.log(`Deleted report with ID: ${id}`);
}
