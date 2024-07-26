document.addEventListener('DOMContentLoaded', function() {
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
});
