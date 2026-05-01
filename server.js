const express = require('express');
const app = express();

const PORT = 3000;

const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Alice" },
    { id: 3, name: "Bob" },
    { id: 4, name: "Johnny" }
];

app.get('/users', (req, res) => {
    const { name } = req.query;

    let result = users;

    if (name) {
        result = users.filter(user =>
            user.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
