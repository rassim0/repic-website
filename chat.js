document.addEventListener('DOMContentLoaded', () => {
    // ta3 side bar
    const toggleButton = document.getElementById('toggleSidebar');
    const sidebar = document.querySelector('.sidebar');

    if (toggleButton && sidebar) {
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
        });
    }

    // simple programe bach nb3tho les messages (htal backend)
    const sendButton = document.getElementById('sendMessage');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');

    if (sendButton && messageInput && chatMessages) {
        sendButton.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });

        function sendMessage() {
            const messageText = messageInput.value.trim();

            if (messageText) {
                const messageDiv = document.createElement('div');
                messageDiv.className = 'message';

                const messageContent = document.createElement('div');
                messageContent.className = 'message-content';
                messageContent.textContent = messageText;

                const timestamp = document.createElement('div');
                timestamp.className = 'message-timestamp';
                timestamp.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                messageDiv.appendChild(messageContent);
                messageDiv.appendChild(timestamp);
                chatMessages.appendChild(messageDiv);

                chatMessages.scrollTop = chatMessages.scrollHeight;

                messageInput.value = '';
            }
        }
    }
});



