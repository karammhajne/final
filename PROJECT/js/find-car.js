document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    

    if (user && token) {
        document.querySelector('.find-car-button').addEventListener('click', findCar);
        document.querySelector('.submit-report-button').addEventListener('click', submitReport);
    } else {
        alert('User not authenticated. Please log in.');
        window.location.href = 'login.html';
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('user-welcome').textContent = `Welcome ${user.firstName}`;
        document.getElementById('user-img').src = user.img;
    }
});


function findCar() {
    const plateInput = document.getElementById('plate-input').value.trim();

    fetch(`http://localhost:3000/api/cars/plate/${plateInput}`)
        .then(response => response.json())
        .then(car => {
            if (car) {
                window.location.href = `car-details.html?plate=${plateInput}`;
            } else {
                alert('Car not found!');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function submitReport() {
    const plateInput = document.getElementById('plate-input').value.trim();
    const reportDetails = document.getElementById('report-details').value.trim();
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    const reportData = {
        plate: plateInput,
        details: reportDetails,
        userID: user.userID
    };

    fetch('http://localhost:3000/api/reports', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reportData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Report submitted successfully!');
        window.location.href = 'report_history.html';
    })
    .catch(error => console.error('Error submitting report:', error));
}
