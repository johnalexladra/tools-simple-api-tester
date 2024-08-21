document.getElementById('send-request').addEventListener('click', () => {
    const url = document.getElementById('url').value;
    const method = document.getElementById('method').value;
    const params = document.getElementById('params').value;
    const token = document.getElementById('token').value.trim();  // Trim whitespace

    fetch('/api/request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: url,
            method: method,
            params: params,
            token: token
        })
    })
    .then(response => response.json())
    .then(data => {
        const formattedJson = JSON.stringify(data, null, 2);
        document.getElementById('response-output').innerHTML = syntaxHighlight(formattedJson);
    })
    .catch(error => {
        document.getElementById('response-output').innerHTML = `<span class="error">Error: ${error}</span>`;
    });
});

function syntaxHighlight(json) {
    // Escape characters that have special meanings in HTML
    json = json.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;');

    // Highlight JSON keys
    json = json.replace(/"([^"]+)":/g, `<span class='key'>"$1":</span>`);

    // Highlight JSON strings
    json = json.replace(/"([^"]*)"/g, '<span class="string">"$1"</span>');

    // Highlight JSON numbers
    json = json.replace(/(\b\d+\b|\b\d+\.\d+\b)/g, '<span class="number">$1</span>');

    // Highlight JSON booleans
    json = json.replace(/\b(true|false)\b/g, '<span class="boolean">$1</span>');

    // Highlight JSON null
    json = json.replace(/\b(null)\b/g, '<span class="null">$1</span>');

    return json;
}
