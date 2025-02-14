const translateForm = document.getElementById('translate-form');
const translateBtn = document.getElementById('translate-btn');
const translatedTextDiv = document.getElementById('translated-text');

const API_KEY = 'YOUR_GOOGLE_TRANSLATION_API_KEY';

translateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const textToTranslate = document.getElementById('text-to-translate').value;
    const languageSelect = document.getElementById('language-select').value;

    const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    const data = {
        q: textToTranslate,
        target: languageSelect
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        const translatedText = data.data.translations[0].translatedText;
        translatedTextDiv.innerText = translatedText;
    })
    .catch(error => console.error(error));
});