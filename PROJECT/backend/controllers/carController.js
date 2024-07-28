const pool = require('../models/db');

console.log('start carcontrol');
exports.getCarsByUser = (req, res) => {
    const userID = req.params.userID;
    console.log(`Fetching cars for user ID: ${userID}`); // Debugging line
    pool.query('SELECT * FROM tbl_115_cars WHERE userID = ?', [userID], (err, results) => {
        if (err) {
            console.error('Error fetching cars from database:', err); // Debugging line
            return res.status(500).json({ message: 'Error fetching cars' });
        }
        console.log('Cars fetched from database:', results); // Debugging line
        res.json(results);
    });
};

exports.addCar = (req, res) => {
    const newCar = req.body;
    pool.query('INSERT INTO tbl_115_cars SET ?', newCar, (err, result) => {
        if (err) {
            console.error('Error adding car:', err); // Debugging line
            return res.status(500).json({ message: 'Error adding car' });
        }
        console.log('Car added to database:', { ...newCar, carID: result.insertId }); // Debugging line
        res.json({ ...newCar, carID: result.insertId });
    });
};

exports.deleteCar = (req, res) => {
    const carID = req.params.carID;
    pool.query('DELETE FROM tbl_115_cars WHERE carID = ?', [carID], (err, result) => {
        if (err) {
            console.error('Error deleting car:', err); // Debugging line
            return res.status(500).json({ message: 'Error deleting car' });
        }
        console.log('Car deleted from database:', result); // Debugging line
        res.json({ message: 'Car deleted successfully' });
    });
};
