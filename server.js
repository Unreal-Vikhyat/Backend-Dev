const express = require('express');
const app = express();

app.use(express.json());

// 🔐 Sanitization function
function sanitizeInput(value) {
    if (typeof value !== 'string') return value;

    // Remove script tags (XSS)
    value = value.replace(/<script.*?>.*?<\/script>/gi, '');

    // Remove HTML tags
    value = value.replace(/<\/?[^>]+(>|$)/g, '');

    // Remove common SQL injection patterns
    value = value.replace(/('|--|;|\/\*|\*\/|xp_)/gi, '');

    return value.trim();
}

// 🔥 Middleware
function sanitizeMiddleware(req, res, next) {
    // Sanitize body
    if (req.body) {
        for (let key in req.body) {
            req.body[key] = sanitizeInput(req.body[key]);
        }
    }

    // Sanitize query
    if (req.query) {
        for (let key in req.query) {
            req.query[key] = sanitizeInput(req.query[key]);
        }
    }

    // Sanitize params
    if (req.params) {
        for (let key in req.params) {
            req.params[key] = sanitizeInput(req.params[key]);
        }
    }

    next();
}

// Apply middleware globally
app.use(sanitizeMiddleware);

// Test route
app.post('/test', (req, res) => {
    res.json({
        message: "Sanitized data received",
        data: req.body
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
