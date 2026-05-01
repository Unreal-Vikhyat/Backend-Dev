const express = require('express');
const config = require('./config/' + process.env.NODE_ENV);
const connectDB = require('./db/connection');
const healthRoute = require('./routes/health');

const app = express();
app.use(express.json());

connectDB();

// Health check
app.use('/health', healthRoute);

// Sample route
app.get('/', (req, res) => {
    res.json({ env: process.env.NODE_ENV, message: "Running" });
});

app.listen(config.PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV}`);
});
