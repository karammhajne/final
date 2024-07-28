document.addEventListener('DOMContentLoaded', () => {
    loadMessages();
});

document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('user-welcome').textContent = `Welcome ${user.firstName}`;
        document.getElementById('user-img').src = user.img;
    }
});


function loadMessages() {
    const messages = [
        {
            type: 'received',
            text: 'Hi, your car is blocking my car.',
            time: '9:05',
            img: 'images/alon.png'
        },
        {
            type: 'sent',
            text: "I'm sorry, right away.",
            time: '9:06',
            img: 'images/car1.jpg'
        }
    ];

    const messageContent = document.getElementById('message-content');
    messageContent.innerHTML = '';

    messages.forEach(message => {
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('message-bubble', message.type);

        const img = document.createElement('img');
        img.src = message.img;

        const messageText = document.createElement('div');
        messageText.classList.add('message-text');
        messageText.textContent = message.text;

        const messageTime = document.createElement('span');
        messageTime.classList.add('message-time');
        messageTime.textContent = message.time;

        messageBubble.appendChild(img);
        messageBubble.appendChild(messageText);
        messageBubble.appendChild(messageTime);

        messageContent.appendChild(messageBubble);
    });

    messageContent.scrollTop = messageContent.scrollHeight;
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value;
    if (messageText.trim() === '') {
        return;
    }

    const messageContent = document.getElementById('message-content');

    const messageBubble = document.createElement('div');
    messageBubble.classList.add('message-bubble', 'received'); // Change to 'received'

    const img = document.createElement('img');
    img.src = 'images/alon.png'; // Sender's image

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message-text');
    messageDiv.textContent = messageText;

    const messageTime = document.createElement('span');
    messageTime.classList.add('message-time');
    messageTime.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    messageBubble.appendChild(img);
    messageBubble.appendChild(messageDiv);
    messageBubble.appendChild(messageTime);

    messageContent.appendChild(messageBubble);

    messageContent.scrollTop = messageContent.scrollHeight;

    messageInput.value = '';

    // Optionally, save the message to local storage or database
}