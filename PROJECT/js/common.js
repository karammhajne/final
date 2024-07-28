function displayUserDetails() {
    fetch('/api/auth/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }
        return response.json();
    })
    .then(data => {
        if (data.firstName && data.img) {
            document.querySelectorAll('.profile span').forEach(el => el.innerText = `Welcome ${data.firstName}`);
            document.querySelectorAll('.profile img').forEach(el => el.src = data.img);
        }
    })
    .catch(error => console.error('Error fetching user details:', error));
}

document.addEventListener('DOMContentLoaded', displayUserDetails);
