const db = require('../models/db');

exports.getAllUsers = (req, res) => {
    const sql = 'SELECT * FROM tbl_115_users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.createUser = (req, res) => {
    const newUser = req.body;
    const sql = 'INSERT INTO tbl_115_users SET ?';
    db.query(sql, newUser, (err, result) => {
        if (err) throw err;
        res.json({ userID: result.insertId, ...newUser });
    });
};

exports.deleteUser = (req, res) => {
    const { userID } = req.params;
    const sql = 'DELETE FROM tbl_115_users WHERE userID = ?';
    db.query(sql, userID, (err, result) => {
        if (err) throw err;
        res.json({ message: 'User deleted', userID });
    });
};
