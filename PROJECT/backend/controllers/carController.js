const db = require('../models/db');

exports.getAllCars = (req, res) => {
    const sql = 'SELECT * FROM tbl_115_cars';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.createCar = (req, res) => {
    const newCar = req.body;
    const sql = 'INSERT INTO tbl_115_cars SET ?';
    db.query(sql, newCar, (err, result) => {
        if (err) throw err;
        res.json({ carID: result.insertId, ...newCar });
    });
};

exports.deleteCar = (req, res) => {
    const { carID } = req.params;
    const sql = 'DELETE FROM tbl_115_cars WHERE carID = ?';
    db.query(sql, carID, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Car deleted', carID });
    });
};
