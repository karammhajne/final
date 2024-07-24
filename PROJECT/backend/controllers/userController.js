const pool = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { firstName, lastName, email, password, address, img, cars = [] } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { firstName, lastName, email, password: hashedPassword, address, img };

    pool.query('INSERT INTO tbl_115_users SET ?', newUser, (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            return res.status(500).send({ message: 'Error registering user' });
        }
        const userID = result.insertId;

        if (cars.length > 0) {
            cars.forEach(car => {
                const newCar = { ...car, userID };
                pool.query('INSERT INTO tbl_115_cars SET ?', newCar, (err) => {
                    if (err) {
                        console.error('Error adding car:', err);
                        return res.status(500).send({ message: 'Error adding car' });
                    }
                });
            });
        }

        const token = jwt.sign({ id: userID }, 'your_secret_key');
        res.header('Authorization', `Bearer ${token}`).send({ token, message: 'Registration successful' });
    });
};
