document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        console.log('User:', user);  // Debugging line to check user data
        document.getElementById('welcome-message').innerText = `Welcome ${user.firstName}`;
        document.getElementById('profile-picture').src = user.img;

        fetch(`http://localhost:3000/api/cars/user/${user.userID}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const carContainer = document.getElementById('car-container');
            data.forEach(car => {
                const carDiv = document.createElement('div');
                carDiv.classList.add('car');

                const carDetailsDiv = document.createElement('div');
                carDetailsDiv.classList.add('car-details');

                const carImageDiv = document.createElement('div');
                carImageDiv.classList.add('car-image');

                carDetailsDiv.innerHTML = `
                    <p><strong>Name:</strong> ${car.model}</p>
                    <p><strong>Car plate:</strong> ${car.plate}</p>
                    <p><strong>Color:</strong> ${car.color}</p>
                    <p><strong>Number of reports:</strong> ${car.numberOfReports}</p>
                    <span class="options-button"><i class="fa fa-trash"></i></span>
                `;

                carImageDiv.innerHTML = `<img src="${car.image}" alt="Car Image">`;

                carDiv.appendChild(carDetailsDiv);
                carDiv.appendChild(carImageDiv);

                carContainer.appendChild(carDiv);

                // Add event listener for delete option
                const optionsButton = carDetailsDiv.querySelector('.options-button');
                optionsButton.addEventListener('click', () => {
                    const confirmDelete = confirm('Are you sure you want to delete this car?');
                    if (confirmDelete) {
                        fetch(`http://localhost:3000/api/cars/${car.carID}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            }
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log(data.message);
                            carDiv.remove();
                        })
                        .catch(error => console.error('Error deleting car:', error));
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching cars:', error));
    } else {
        console.error('No user data found in localStorage');
    }
});
