# Guida all'Installazione: Chatbot Plugin Locale

Benvenuto! Questo plugin ti permette di aggiungere un fantastico chatbot al tuo sito web senza alcun bisogno di server, database o abbonamenti a servizi di terze parti come ChatGPT. È autonomo, veloce e personalizzabile al 100%.

## 📁 Struttura della Cartella
All'interno della cartella `chatbot-plugin` troverai:
- `chatbot.css`: Contiene tutto il design e le animazioni (Interfaccia).
- `chatbot.js`: Il motore del chatbot che capisce le domande.
- `config.json`: **Il file più importante**. È il "cervello" dove tu inserisci le informazioni del sito.

---

## 🚀 Come Installare il Plugin in un Nuovo Sito

Se hai un nuovo sito web (ad esempio `index.html`) e vuoi aggiungere questo chatbot, segui questi **3 semplici passaggi**:

### Passo 1: Copia la cartella
Copia l'intera cartella `chatbot-plugin` (questa in cui ti trovi ora) all'interno della cartella principale del tuo nuovo progetto web.

### Passo 2: Collega i file
Apri il file `index.html` del tuo sito e incolla queste due righe all'interno del tag `<head>` (prima che si chiuda `</head>`):

```html
<!-- Importa lo stile e il motore del Chatbot -->
<link rel="stylesheet" href="chatbot-plugin/chatbot.css">
<script src="chatbot-plugin/chatbot.js" defer></script>
```

### Passo 3: Configura il Cervello (config.json)
Questo chatbot è "stupido" finché non gli dici cosa dire. Apri il file `config.json` e personalizzalo per il nuovo sito.

- **`botName`**: Il nome del tuo assistente virtuale.
- **`welcomeMessage`**: Il primissimo messaggio che appare quando apri la chat.
- **`knowledgeBase`**: Le parole chiave. Se l'utente scrive una di queste parole, il bot capirà l'argomento.
- **`answers`**: Le risposte che il bot darà in base all'argomento capito.

*Nota bene: L'algoritmo non ha bisogno di connessione internet. Legge quello che l'utente scrive e controlla se contiene le parole chiave definite in `knowledgeBase` per fornire la risposta associata in `answers`.*

---

## 🎨 Personalizzazione del Design
Se vuoi cambiare i colori del Chatbot (per adattarlo a un sito con un brand diverso), apri il file `chatbot.css` e modifica le variabili in cima al documento:

```css
:root {
  --chat-primary-color: #1c800a; /* Cambia questo con il colore principale del nuovo sito */
  --chat-bg-color: #ffffff;
}
```

Tutto qui! Buon divertimento con il tuo nuovo Plugin universale! 🎉
