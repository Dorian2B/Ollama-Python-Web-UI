let conversation = '';
const maxConversationLength = 8192;

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});


function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;
    const modelSelect = document.getElementById('model-select');
    const model = modelSelect.value;
    if (message.trim() !== '') {
        const userMessage = `user: ${message}`;
        conversation = `${conversation}\n${userMessage}`.slice(-maxConversationLength);
        const messagesDiv = document.getElementById('messages');
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'user-message');
        // Remplacer les occurrences de "_" par des balises <u> et </u>, et les occurrences de "**" par des balises <strong> et </strong>
        messageElement.innerHTML = message.replace(/_(.*?)_/g, '<u>$1</u>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        messagesDiv.appendChild(messageElement);
        messageInput.value = '';
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ conversation, model })
        })
        .then(response => response.json())
        .then(data => {
            const botMessage = `AI : ${data.response}`;
            conversation = `${conversation}\n${botMessage}`.slice(-maxConversationLength);
            const botMessageElement = document.createElement('div');
            botMessageElement.classList.add('message', 'bot-message');
            // Remplacer les sauts de ligne par des balises <br>, les occurrences de "_" par des balises <u> et </u>, et les occurrences de "**" par des balises <strong> et </strong>
            botMessageElement.innerHTML = botMessage.replace(/\n/g, '<br>').replace(/_(.*?)_/g, '<u>$1</u>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            messagesDiv.appendChild(botMessageElement);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        })
        .catch(error => {
            const errorMessageElement = document.createElement('div');
            errorMessageElement.classList.add('message', 'error-message');
            errorMessageElement.textContent = `Error: ${error}`;
            messagesDiv.appendChild(errorMessageElement);
        });
    }
}