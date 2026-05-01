const express = require('express');
const app = express();

const PORT = 3000;

// Sample in-memory data
const books = [
    { id: 1, title: "Book One", author: "John", year: 2020 },
    { id: 2, title: "Book Two", author: "Alice", year: 2021 },
    { id: 3, title: "Book Three", author: "John", year: 2022 },
    { id: 4, title: "Book Four", author: "Bob", year: 2020 }
];

// GET all books with query filtering
app.get('/books', (req, res) => {
    let { author, year } = req.query;

    let filteredBooks = books;

    if (author) {
        filteredBooks = filteredBooks.filter(
            book => book.author.toLowerCase() === author.toLowerCase()
        );
    }

    if (year) {
        filteredBooks = filteredBooks.filter(
            book => book.year == year
        );
    }

    res.json(filteredBooks);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
