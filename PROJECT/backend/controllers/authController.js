const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../models/db');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    console.log('Attempting to log in user with email:', email);

    try {
        const [user] = await pool.query('SELECT * FROM tbl_115_users WHERE email = ?', [email]);

        if (!user.length) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const validPass = await bcrypt.compare(password, user[0].password);

        if (!validPass) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user[0].userID }, 'your_secret_key');
        res.header('Authorization', `Bearer ${token}`).json({
            token,
            user: {
                userID: user[0].userID,
                firstName: user[0].firstName,
                lastName: user[0].lastName,
                email: user[0].email,
                img: user[0].img,
                phoneNumber: user[0].phoneNumber,
                address: user[0].address
            },
            message: 'Login successful'
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getCurrentUser = (req, res) => {
    const userId = req.user.id;
    
    pool.query('SELECT * FROM tbl_115_users WHERE userID = ?', [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user from database:', err);
            return res.status(500).json({ message: 'Error fetching user' });
        }
        if (!results.length) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = results[0];
        res.json({
            userID: user.userID,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            img: user.img,
            phoneNumber: user.phoneNumber,
            address: user.address
        });
    });
};
