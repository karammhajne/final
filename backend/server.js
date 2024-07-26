const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const pool = require('./models/db');

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
