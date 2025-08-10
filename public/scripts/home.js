// public/scripts/home.js
document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selectors ---
    const menuToggle = document.getElementById('menu-toggle');
    const historyToggle = document.getElementById('history-toggle');
    const leftSidebar = document.getElementById('left-sidebar');
    const rightSidebar = document.getElementById('right-sidebar');
    const closeLeftSidebar = document.getElementById('close-left-sidebar');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const charCount = document.getElementById('char-count');

    // --- Mobile Menu Logic ---
    if (menuToggle) menuToggle.addEventListener('click', () => leftSidebar.classList.add('show'));
    if (historyToggle) historyToggle.addEventListener('click', () => rightSidebar.classList.add('show'));
    if (closeLeftSidebar) closeLeftSidebar.addEventListener('click', () => leftSidebar.classList.remove('show'));

    document.addEventListener('click', (event) => {
        if (!leftSidebar.contains(event.target) && !menuToggle.contains(event.target)) {
            leftSidebar.classList.remove('show');
        }
        if (!rightSidebar.contains(event.target) && !historyToggle.contains(event.target)) {
            rightSidebar.classList.remove('show');
        }
    });

    // --- Theme Toggling ---
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
        });
    }

    // --- Auto-Resize Textarea & Character Counter ---
    if (chatInput) {
        chatInput.addEventListener('input', () => {
            // Update character count
            const currentLength = chatInput.value.length;
            charCount.textContent = `${currentLength} / 3000`;

            // Auto-resize textarea
            chatInput.style.height = 'auto'; // Reset height
            chatInput.style.height = `${chatInput.scrollHeight}px`;
        });
    }

    // --- Chat Form Submission ---
    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const messageText = chatInput.value.trim();
            if (messageText) {
                addMessage(messageText, 'user');
                chatInput.value = '';
                chatInput.style.height = 'auto'; // Reset height after send
                charCount.textContent = '0 / 3000'; // Reset char count

                setTimeout(() => {
                    addMessage('This is a simulated response.', 'ai');
                }, 1000);
            }
        });
    }

   
    function addMessage(text, sender) {
        let messageElement;

        if (sender === 'user') {
            // Create a simple div for the user's message
            messageElement = document.createElement('div');
            messageElement.className = 'message user-message';
            messageElement.textContent = text;
        } else {
            // Create a container for the AI's response (header + body)
            messageElement = document.createElement('div');
            messageElement.className = 'ai-message-container';

            // Create the "AI Response" header
            const aiHeader = document.createElement('div');
            aiHeader.className = 'ai-header';
            aiHeader.textContent = 'AI Response';

            // Create the body of the AI's message
            const aiBody = document.createElement('div');
            aiBody.className = 'message ai-message';
            aiBody.textContent = text;

            // Append header and body to the container
            messageElement.appendChild(aiHeader);
            messageElement.appendChild(aiBody);
        }

        chatMessages.appendChild(messageElement);
        // Scroll to the bottom to see the latest message
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});


