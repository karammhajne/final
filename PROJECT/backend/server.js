const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const pool = require('./models/db'); // Ensure this path is correct

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://127.0.0.1:5500'  // or wherever your frontend is hosted
}));

// Test database connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
        connection.query('SELECT 1 + 1 AS solution', (err, results) => {
            connection.release();
            if (err) throw err;
            console.log('The solution is: ', results[0].solution);
        });
    }
});

app.use(express.static(path.join(__dirname, '../frontend')));

const carRoutes = require('./routes/cars');
const reportRoutes = require('./routes/reports');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

app.use('/api/cars', carRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
