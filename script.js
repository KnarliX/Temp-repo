// DOM Elements
const emojiInput = document.getElementById('emojiInput');
const pasteBtn = document.getElementById('pasteBtn');
const formatSelect = document.getElementById('formatSelect');
const downloadBtn = document.getElementById('downloadBtn');
const previewImg = document.getElementById('preview-img');
const placeholderText = document.getElementById('placeholder-text');
const statusEl = document.getElementById('status');

// Regex Patterns
// Group 1: 'a' (animation flag)
// Group 2: Name
// Group 3: ID
const regexFull = /<(a?):([\w-]+):(\d{17,20})>/;
const regexId = /(\d{17,20})/;

// Global State
let currentData = {
    id: null,
    name: null,
    isAnimated: false,
    url: null,
    format: 'png'
};

// --- EVENT LISTENERS ---

// 1. Paste Button Logic
pasteBtn.addEventListener('click', async () => {
    try {
        const text = await navigator.clipboard.readText();
        emojiInput.value = text;
        handleInput(); // Paste ke baad turant process karo
        showStatus("Pasted!", "success");
    } catch (err) {
        showStatus("Clipboard permission denied", "error");
    }
});

// 2. Input typing/change logic (Live Preview)
emojiInput.addEventListener('input', handleInput);

// 3. Format Change Logic
formatSelect.addEventListener('change', () => {
    if (currentData.id) {
        updateStateAndPreview();
    }
});

// 4. Download Button Logic
downloadBtn.addEventListener('click', downloadEmoji);


// --- FUNCTIONS ---

function handleInput() {
    const rawText = emojiInput.value.trim();

    // Reset UI if empty
    if (!rawText) {
        resetUI();
        return;
    }

    const fullMatch = rawText.match(regexFull);
    const idMatch = rawText.match(regexId);

    if (fullMatch) {
        // Full tag detect hua: <a:name:id>
        currentData.isAnimated = (fullMatch[1] === 'a');
        currentData.name = fullMatch[2];
        currentData.id = fullMatch[3];
        updateStateAndPreview();
    } else if (idMatch) {
        // Sirf ID detect hui
        currentData.isAnimated = false; // Default assumption
        currentData.name = `emoji_${idMatch[0]}`;
        currentData.id = idMatch[0];
        updateStateAndPreview();
    } else {
        // Invalid input
        resetUI();
    }
}

function updateStateAndPreview() {
    const mode = formatSelect.value;
    
    // Determine Format
    if (mode === 'smart') {
        currentData.format = currentData.isAnimated ? 'gif' : 'png';
    } else {
        currentData.format = mode;
    }

    // Construct URL
    currentData.url = `https://cdn.discordapp.com/emojis/${currentData.id}.${currentData.format}`;

    // Update UI
    previewImg.src = currentData.url;
    
    previewImg.onload = () => {
        previewImg.style.display = 'block';
        placeholderText.style.display = 'none';
        downloadBtn.disabled = false;
        statusEl.innerText = "";
    };

    previewImg.onerror = () => {
        showStatus("Invalid ID or Image not found", "error");
        resetUI(false); // clear preview but keep text
    };
}

async function downloadEmoji() {
    if (!currentData.url) return;

    const originalText = downloadBtn.innerText;
    downloadBtn.innerText = "Fetching...";
    downloadBtn.disabled = true;

    try {
        const response = await fetch(currentData.url);
        if (!response.ok) throw new Error("Network error");

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `${currentData.name}.${currentData.format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        window.URL.revokeObjectURL(blobUrl);
        showStatus("Download Started!", "success");

    } catch (error) {
        showStatus("Failed to download", "error");
    } finally {
        downloadBtn.innerText = originalText;
        downloadBtn.disabled = false;
    }
}

function resetUI(clearInput = false) {
    if (clearInput) emojiInput.value = "";
    previewImg.style.display = 'none';
    previewImg.src = "";
    placeholderText.style.display = 'block';
    downloadBtn.disabled = true;
    currentData.id = null;
}

function showStatus(msg, type) {
    statusEl.innerText = msg;
    statusEl.className = type === 'success' ? 'text-success' : 'text-error';
    setTimeout(() => {
        statusEl.innerText = "";
        statusEl.className = "";
    }, 3000);
}
