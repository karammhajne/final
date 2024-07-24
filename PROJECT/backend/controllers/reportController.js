const pool = require('../models/db');

exports.getReports = (req, res) => {
    const userID = req.user.id;
    pool.query('SELECT * FROM tbl_115_reports WHERE userID = ?', [userID], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.getReportById = (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM tbl_115_reports WHERE reportID = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
};

exports.addReport = (req, res) => {
    const userID = req.user.id;
    const { plate, reason, location, date, status, urgent, img, map } = req.body;
    const newReport = { plate, reason, location, date, status, urgent, img, map, userID };

    pool.query('INSERT INTO tbl_115_reports SET ?', newReport, (err, result) => {
        if (err) throw err;
        res.json({ reportID: result.insertId, ...newReport });
    });
};
