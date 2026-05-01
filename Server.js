const express = require('express');
const app = express();

const PORT = 3000;

/*
Q1. Key differences between SQL and NoSQL
*/
app.get('/q1', (req, res) => {
    res.json({
        SQL: {
            type: "Relational",
            schema: "Fixed schema",
            example: "MySQL, PostgreSQL",
            data: "Tables (rows & columns)",
            scaling: "Vertical",
            query: "Structured Query Language (SQL)"
        },
        NoSQL: {
            type: "Non-relational",
            schema: "Flexible schema",
            example: "MongoDB",
            data: "Documents, key-value, graph",
            scaling: "Horizontal",
            query: "JSON-like queries"
        }
    });
});

/*
Q2. CAP Theorem
*/
app.get('/q2', (req, res) => {
    res.json({
        CAP: {
            Consistency: "All nodes see same data",
            Availability: "System always responds",
            PartitionTolerance: "System works despite network failure"
        },
        explanation: "In distributed systems, network failures are unavoidable, so Partition Tolerance is required. Hence, a system can only guarantee either Consistency or Availability, not both."
    });
});

/*
Q3. When MongoDB is preferred
*/
app.get('/q3', (req, res) => {
    res.json({
        scenarios: [
            "When data structure is flexible (e.g., user profiles)",
            "When handling large-scale distributed data",
            "When fast read/write operations are needed (real-time apps)"
        ]
    });
});

/*
Q4. Why MongoDB uses BSON
*/
app.get('/q4', (req, res) => {
    res.json({
        answer: "MongoDB uses BSON because it is binary-encoded, faster to parse, supports more data types (like Date, ObjectId), and is more efficient for storage and indexing compared to JSON."
    });
});

/*
Q5. MongoDB Query
*/
app.get('/q5', (req, res) => {
    const query = {
        gpa: { $gt: 3.5 },
        courses: "CS101"
    };

    res.json({
        mongodb_query: query,
        explanation: "Finds students with GPA > 3.5 and enrolled in CS101"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
