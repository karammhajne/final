document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const reportDetails = urlParams.get('report');
    if (reportDetails) {
        const report = JSON.parse(decodeURIComponent(reportDetails));
        displayReportDetails(report);
        initializeMap(report.location);
    } else {
        console.error('Report details are missing or invalid in the URL.');
    }

    document.getElementById('delete-button').addEventListener('click', deleteReport);
    document.getElementById('cancel-delete').addEventListener('click', cancelDelete);
    document.getElementById('cancel-delete-btn').addEventListener('click', cancelDelete);
    document.getElementById('confirm-delete').addEventListener('click', confirmDelete);
    document.getElementById('close-success-modal').addEventListener('click', closeSuccessModal);
});

function displayReportDetails(report) {
    const reportDetailsElement = document.getElementById("report-details");
    reportDetailsElement.innerHTML = `
        <p><strong>Plate:</strong><br> ${report.plate} 
        <strong>Reason:</strong> <br>${report.reason}
        <strong>Location:</strong><br> ${report.location}
        <strong>Date:</strong><br> ${report.date}
        <strong>Status:</strong> <br>${report.status}
        <strong>Urgent:</strong><br> ${report.urgent ? "Yes" : "No"}</p>
    `;
    const reportImageElement = document.getElementById("report-image");
    reportImageElement.innerHTML = `<img src="${report.image}" alt="Car Image" style="width: 100%;">`;
}

function initializeMap(location) {
    const map = L.map('report-map').setView([51.505, -0.09], 13); // Default coordinates

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Geocode the location to get the coordinates
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const lat = data[0].lat;
                const lon = data[0].lon;
                map.setView([lat, lon], 13);
                L.marker([lat, lon]).addTo(map)
                    .bindPopup(`Location: ${location}`)
                    .openPopup();
            } else {
                console.error('Location not found');
            }
        })
        .catch(error => console.error('Error fetching location coordinates:', error));
}

function deleteReport() {
    const modal = document.getElementById("confirmModal");
    modal.style.display = "block";
}

function confirmDelete() {
    const successModal = document.getElementById("successModal");
    successModal.style.display = "block";
    cancelDelete();
}

function cancelDelete() {
    const modal = document.getElementById("confirmModal");
    modal.style.display = "none";
}

function closeSuccessModal() {
    const successModal = document.getElementById("successModal");
    successModal.style.display = "none";
    window.location.href = "report_history.html";
}

function goBack() {
    window.history.back();
}
