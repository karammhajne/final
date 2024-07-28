document.addEventListener('DOMContentLoaded', function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const plateNumber = urlParams.get('plate');

    fetch('data/data.json')
        .then(response => response.json())
        .then(data => {
            const car = data.reports.find(report => report.plate === plateNumber);
            if (car) {
                displayCarDetails(car);
            } else {
                document.getElementById('car-not-found-popup').style.display = 'block';
            }
        })
        .catch(error => console.error('Error fetching data:', error));

    document.getElementById('make-report-button').addEventListener('click', openReportForm);
    document.getElementById('close-report-form').addEventListener('click', closeReportForm);
    document.getElementById('submit-report-reason').addEventListener('click', submitReportReason);
    document.getElementById('close-location-form').addEventListener('click', closeLocationForm);
    document.getElementById('submit-location').addEventListener('click', submitLocation);
    document.getElementById('close-not-found-popup').addEventListener('click', closeModal);
});

let reportReason = '';
let reportDetails = {};

document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('user-welcome').textContent = `Welcome ${user.firstName}`;
        document.getElementById('user-img').src = user.img;
    }
});


function displayCarDetails(car) {
    document.getElementById('car-plate-number').innerText = car.plate;
    document.getElementById('car-image-wrapper').innerHTML = `<img src="${car.image}" alt="Car Image">`;
    document.getElementById('car-manufacturer').innerText = car.model.split(' ')[0];
    document.getElementById('car-model').innerText = car.model;
    document.getElementById('car-year').innerText = car.model.split(' ')[1];
    document.getElementById('car-color').innerText = car.color;
    document.getElementById('car-engine').innerText = car.engine || 'N/A';
    document.getElementById('car-gearbox').innerText = car.gearbox || 'N/A';
}

function openReportForm() {
    document.getElementById('report-form-modal').style.display = 'block';
    document.querySelector('.car-info-wrapper').style.opacity = '0.5';
}

function closeReportForm() {
    document.getElementById('report-form-modal').style.display = 'none';
    document.querySelector('.car-info-wrapper').style.opacity = '1';
}

function submitReportReason() {
    reportReason = document.getElementById('report-reason').value;
    closeReportForm();
    openLocationForm();
}

function openLocationForm() {
    document.getElementById('location-form-modal').style.display = 'block';
}

function closeLocationForm() {
    document.getElementById('location-form-modal').style.display = 'none';
    document.querySelector('.car-info-wrapper').style.opacity = '1';
}

function closeModal() {
    document.getElementById('car-not-found-popup').style.display = 'none';
}

function submitLocation() {
    const location = document.getElementById('report-location').value;
    const report = {
        id: Date.now(),
        model: document.getElementById('car-model').innerText,
        color: document.getElementById('car-color').innerText,
        numberOfReports: "1",
        image: document.getElementById('car-image-wrapper').querySelector('img').src,
        plate: document.getElementById('car-plate-number').innerText,
        reason: reportReason,
        location: location,
        date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        status: "undone",
        urgent: false
    };
    
    let reports = JSON.parse(localStorage.getItem('reports')) || [];
    reports.push(report);
    localStorage.setItem('reports', JSON.stringify(reports));
    
    window.location.href = 'report_history.html';
}