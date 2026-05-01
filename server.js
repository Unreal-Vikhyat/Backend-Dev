const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const crypto = require('crypto');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());
app.use(helmet());

// 🔒 Rate limiting (brute force protection)
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));

// 🔐 Secure session
app.use(session({
    secret: 'super_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    }
}));

// In-memory DB (for exam)
const users = [];

// 🔐 Helper: Device fingerprint
function getDeviceFingerprint(req) {
    return crypto.createHash('sha256')
        .update(req.headers['user-agent'] + req.ip)
        .digest('hex');
}

// 🔐 Register
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    const hash = await bcrypt.hash(password, 12);

    users.push({
        email,
        password: hash,
        devices: [],
        resetToken: null,
        resetExpiry: null
    });

    res.json({ message: "Registered" });
});

// 🔐 Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).send("Invalid");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).send("Invalid");

    const fingerprint = getDeviceFingerprint(req);

    if (!user.devices.includes(fingerprint)) {
        user.devices.push(fingerprint);
        console.log("⚠️ New device detected");
    }

    req.session.user = email;
    res.json({ message: "Login success" });
});

// 🔐 2FA for transactions > 1000
app.post('/transaction', (req, res) => {
    const { amount, otp } = req.body;

    if (amount > 1000) {
        if (otp !== "123456") {
            return res.status(403).send("2FA required");
        }
    }

    res.json({ message: "Transaction success" });
});

// 🔐 Password reset request
app.post('/reset-request', (req, res) => {
    const { email } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) return res.send("If exists, email sent");

    const token = crypto.randomBytes(32).toString('hex');

    user.resetToken = token;
    user.resetExpiry = Date.now() + 10 * 60 * 1000;

    res.json({ resetToken: token });
});

// 🔐 Reset password
app.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    const user = users.find(u =>
        u.resetToken === token &&
        user.resetExpiry > Date.now()
    );

    if (!user) return res.status(400).send("Invalid token");

    user.password = await bcrypt.hash(newPassword, 12);
    user.resetToken = null;

    res.json({ message: "Password updated" });
});

app.listen(3000);
