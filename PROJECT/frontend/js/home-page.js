document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display volunteer updates
    fetch('data/data.json')
        .then(response => response.json())
        .then(data => {
            const updatesContainer = document.getElementById('volunteer-updates');
            data.updates.forEach(update => {
                const updateDiv = document.createElement('div');
                updateDiv.classList.add('volunteer-update');

                updateDiv.innerHTML = `
                    <span>${update.issue}, ${update.location} ${update.date}</span>
                    <button class="info-button">i</button>
                `;
                
                updatesContainer.appendChild(updateDiv);
            });
        })
        .catch(error => console.error('Error fetching the updates:', error));

    // Initialize Leaflet map
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([32.09001462584199, 34.80355837513058]).addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();
});
