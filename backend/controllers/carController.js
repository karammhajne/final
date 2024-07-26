const pool = require('../models/db');

exports.getCars = (req, res) => {
    const userID = req.user.id;
    pool.query('SELECT * FROM tbl_115_cars WHERE userID = ?', [userID], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.addCar = (req, res) => {
    const userID = req.user.id;
    const { model, color, numberOfReports, image, plate } = req.body;
    const newCar = { model, color, numberOfReports, image, plate, userID };

    pool.query('INSERT INTO tbl_115_cars SET ?', newCar, (err, result) => {
        if (err) throw err;
        res.json({ carID: result.insertId, ...newCar });
    });
};
