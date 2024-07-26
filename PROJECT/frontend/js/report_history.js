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
            <i class="fa fa-trash" onclick="deleteReportFromHistory(${report.id}, event)"></i>
        `;
        li.onclick = (event) => {
            if (!event.target.classList.contains('fa-trash')) {
                openReportDetails(report.id);
            }
        };
        reportListElement.appendChild(li);
    });
}

function openReportDetails(id) {
    const report = reports.find(r => r.id === id);
    const reportDetails = JSON.stringify(report);
    window.location.href = `report_detail.html?report=${encodeURIComponent(reportDetails)}`;
}

function deleteReportFromHistory(id, event) {
    event.stopPropagation();
    reports = reports.filter(r => r.id !== id);
    localStorage.setItem('reports', JSON.stringify(reports));
    displayReports(reports);
    console.log(`Deleted report with ID: ${id}`);
}

function openCreateReportModal() {
    const modalHTML = `
        <div id="createReportModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeCreateReportModal()">&times;</span>
                <h3>Create New Report</h3>
                <form id="createReportForm">
                    <label for="image">Image URL:</label>
                    <input type="text" id="image" name="image" required><br>
                    <label for="plate">Plate:</label>
                    <input type="text" id="plate" name="plate" required><br>
                    <label for="reason">Reason:</label>
                    <input type="text" id="reason" name="reason" required><br>
                    <label for="location">Location:</label>
                    <input type="text" id="location" name="location" required><br>
                    <label for="urgent">Urgent:</label>
                    <input type="checkbox" id="urgent" name="urgent"><br>
                    <label for="map">Map URL:</label>
                    <input type="text" id="map" name="map" required><br>
                    <button type="button" onclick="submitNewReport()">Submit</button>
                </form>
            </div>
        </div> 
    `;

    const body = document.querySelector('body');
    const existingModal = document.getElementById('createReportModal');

    if (existingModal) {
        existingModal.remove();
    }

    body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = document.getElementById("createReportModal");
    modal.style.display = "block";
    body.classList.add('no-fixed-header');
}

function closeCreateReportModal() {
    const modal = document.getElementById("createReportModal");
    modal.style.display = "none";
    const body = document.querySelector('body');
    body.classList.remove('no-fixed-header');
}

function submitNewReport() {
    console.log('Submitting new report...');
    const form = document.getElementById("createReportForm");

    const newReport = {
        id: Date.now(),
        image: form.image.value,
        plate: form.plate.value,
        reason: form.reason.value,
        location: form.location.value,
        date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        urgent: form.urgent.checked,
        map: form.map.value
    };

    console.log('New report details:', newReport);

    reports.push(newReport);
    localStorage.setItem('reports', JSON.stringify(reports));
    displayReports(reports);
    closeCreateReportModal();

    const reportListElement = document.getElementById("report-list");
    setTimeout(() => {
        reportListElement.scrollTop = reportListElement.scrollHeight;
    }, 0);

    console.log('New report submitted:', JSON.stringify(newReport));
}
