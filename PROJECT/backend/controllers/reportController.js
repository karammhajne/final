const db = require('../models/db');

exports.getAllReports = (req, res) => {
    const sql = 'SELECT * FROM tbl_115_reports';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.createReport = (req, res) => {
    const newReport = req.body;
    const sql = 'INSERT INTO tbl_115_reports SET ?';
    db.query(sql, newReport, (err, result) => {
        if (err) throw err;
        res.json({ reportID: result.insertId, ...newReport });
    });
};

exports.deleteReport = (req, res) => {
    const { reportID } = req.params;
    const sql = 'DELETE FROM tbl_115_reports WHERE reportID = ?';
    db.query(sql, reportID, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Report deleted', reportID });
    });
};
