const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'Public' folder
app.use(express.static(path.join(__dirname, 'Public')));

// Middleware to rewrite URLs
app.use((req, res, next) => {
    if (req.url.startsWith('/Public')) {
        req.url = req.url.replace('/Public', '');
    }
    next();
});

// Fallback to index.html for any request that doesn't match a static file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
