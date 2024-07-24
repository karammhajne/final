const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../models/db');

exports.login = (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM tbl_115_users WHERE email = ?';

    pool.query(sql, [email], async (err, results) => {
        if (err) throw err;
        if (results.length === 0) return res.status(400).send('Email not found');

        const user = results[0];
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).send('Invalid Password');

        const token = jwt.sign({ id: user.userID }, 'your_secret_key');
        res.header('Authorization', `Bearer ${token}`).send({ token });
    });
};
