/**
 * UNIVERSAL CHATBOT PLUGIN - Core Logic
 */

(function () {
    // Determine the base path of the plugin script to load config.json relatively
    const scripts = document.getElementsByTagName('script');
    let pluginPath = '';
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src && scripts[i].src.includes('chatbot.js')) {
            pluginPath = scripts[i].src.replace('chatbot.js', '');
            break;
        }
    }

    // Default configuration directly embedded to work without localhost (file:// protocol)
    let config = {
        botName: "IslaBot",
        welcomeMessage: "Hola! 👋 Benvenuto a LA ISLA. Sono l'assistente virtuale del locale, chiedimi informazioni su orari, eventi o menu!",
        knowledgeBase: {
            "orario": ["orari", "apertura", "chiusura", "aperti", "ora", "quando aprite", "quando aperti"],
            "menu": ["menu", "cibo", "mangiare", "cena", "piatti", "carne", "drink", "cocktail", "prezzi", "bere"],
            "eventi": ["eventi", "musica", "cantare", "serate", "karaoke", "live", "sabato", "venerdì", "giovedì"],
            "contatti": ["telefono", "chiamare", "dove siete", "indirizzo", "prenotare", "prenotazioni", "via"]
        },
        answers: {
            "orario": "Siamo aperti tutti i giorni! 🎉 Ti aspettiamo per Colazione, un gustoso Pranzo, Aperitivo o una fantastica Cena Italo-Mex.",
            "menu": "Il nostro menu unisce i sapori di Italia e Messico! 🌮 Serviamo Fajitas calde, gustosi Tacos, succulente Costine Barbacoa e una ricchissima selezione di Cocktail.",
            "eventi": "All'Isla non ci si annoia mai! 🎸<br>Le nostre serate principali:<br>• <strong>Giovedì</strong>: Karaoke Show 🎤<br>• <strong>Venerdì</strong>: Serata Latina (Salsa e Reggaeton) 💃<br>• <strong>Sabato</strong>: Live Music con band! 🎶",
            "contatti": "Vuoi venirci a trovare o prenotare? 📍 Siamo in <strong>Via A. Cechov 1, San Giuliano Milanese (MI)</strong>.<br>Per tavoli, chiamaci al <a href='tel:+393666644093'>+39 366 664 4093</a>.",
            "default": "Mi dispiace, non ho la risposta a questa domanda. Prova a riformularla o guarda il sito!"
        }
    };

    // Initialize chatbot immediately
    initChatbot();

    function initChatbot() {
        // 1. Inject HTML Structure
        const chatHTML = `
            <div id="chatbot-launcher" aria-label="Open Chat">
                <svg viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path>
                </svg>
            </div>
            
            <div id="chatbot-window">
                <div class="cb-header">
                    <div class="cb-header-info">
                        <div class="cb-avatar">${config.botName.charAt(0)}</div>
                        <div>
                            <h3 class="cb-title">${config.botName}</h3>
                            <span class="cb-status">Online</span>
                        </div>
                    </div>
                    <button class="cb-close" aria-label="Close Chat">&times;</button>
                </div>
                
                <div class="cb-messages" id="cb-messages-container">
                    <!-- Initial Welcome Message -->
                    <div class="cb-msg cb-bot">${config.welcomeMessage}</div>
                </div>
                
                <div class="cb-input-area">
                    <input type="text" id="cb-input-field" class="cb-input" placeholder="Scrivi un messaggio..." autocomplete="off">
                    <button id="cb-btn-send" class="cb-send" aria-label="Send">
                        <svg viewBox="0 0 24 24">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatHTML);

        // 2. Select Elements
        const launcher = document.getElementById('chatbot-launcher');
        const chatWindow = document.getElementById('chatbot-window');
        const closeBtn = document.querySelector('.cb-close');
        const sendBtn = document.getElementById('cb-btn-send');
        const inputField = document.getElementById('cb-input-field');
        const messagesContainer = document.getElementById('cb-messages-container');

        // 3. Event Listeners for UI
        launcher.addEventListener('click', () => {
            chatWindow.classList.add('cb-active');
            launcher.style.transform = 'scale(0)';
            inputField.focus();
        });

        closeBtn.addEventListener('click', () => {
            chatWindow.classList.remove('cb-active');
            launcher.style.transform = '';
        });

        // Add message on Enter or Click
        sendBtn.addEventListener('click', handleUserInput);
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserInput();
        });

        // 4. Chatbot Logic
        function handleUserInput() {
            const text = inputField.value.trim();
            if (!text) return;

            // Display User Message
            addMessage(text, 'user');
            inputField.value = '';

            // Simulate typing delay
            setTimeout(() => {
                const response = generateResponse(text);
                addMessage(response, 'bot');
            }, 600 + Math.random() * 400); // 600-1000ms delay
        }

        function addMessage(text, sender) {
            const msgDiv = document.createElement('div');
            msgDiv.classList.add('cb-msg', sender === 'user' ? 'cb-user' : 'cb-bot');
            msgDiv.innerHTML = text; // allow links in config
            messagesContainer.appendChild(msgDiv);

            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function generateResponse(text) {
            const normalizedText = text.toLowerCase().replace(/[^\w\s\']/g, ""); // basic cleaning

            // Simple NLP Matching
            let bestMatch = null;
            let maxMatches = 0;

            // Iterate over the knowledge base categories
            for (const category in config.knowledgeBase) {
                const keywords = config.knowledgeBase[category];
                let matches = 0;

                for (const keyword of keywords) {
                    // Check if the exact keyword/phrase is in the user input
                    if (normalizedText.includes(keyword.toLowerCase())) {
                        matches++;
                    }
                }

                // If this category has the most keyword matches so far
                if (matches > maxMatches) {
                    maxMatches = matches;
                    bestMatch = category;
                }
            }

            // Return matching answer or default fallback
            if (bestMatch && config.answers[bestMatch]) {
                return config.answers[bestMatch];
            } else {
                return config.answers.default || "Mi dispiace, non ho la risposta a questa domanda. Prova a riformularla o guarda il sito!";
            }
        }
    }
})();
