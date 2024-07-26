document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.find-car-button').addEventListener('click', findCar);
});

function findCar() {
    const plateInput = document.getElementById('plate-input').value.trim();

    fetch('data/data.json')
        .then(response => response.json())
        .then(data => {
            const car = data.reports.find(report => report.plate === plateInput);
            if (car) {
                window.location.href = `car-details.html?plate=${plateInput}`;
            } else {
                alert('Car not found!');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}
