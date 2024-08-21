const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (your HTML, CSS, and JS)
app.use(express.static('public'));

// Endpoint to handle API requests
app.post('/api/request', async (req, res) => {
    const { url, method, params, token } = req.body;

    // Create request headers
    const headers = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    headers['Content-Type'] = 'application/x-www-form-urlencoded';

    // Set up the request configuration
    const config = {
        method: method.toLowerCase(),
        url: url,
        headers: headers,
        data: method === 'POST' || method === 'PUT' ? params : undefined,
        params: method === 'GET' ? new URLSearchParams(params).toString() : undefined,
    };

    try {
        // Make the API request
        const response = await axios(config);
        res.json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            error: error.message,
            details: error.response ? error.response.data : null,
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
