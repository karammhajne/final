const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Import routes
const carRoutes = require('./routes/cars');
const reportRoutes = require('./routes/reports');
const userRoutes = require('./routes/users');

// Use routes
app.use('/api/cars', carRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/users', userRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
