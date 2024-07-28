const pool = require('../models/db');

exports.createReport = (req, res) => {
    const { plate, details, userID } = req.body;
    const report = { plate, details, userID, date: new Date() };

    pool.query('INSERT INTO tbl_115_reports SET ?', report, (err, result) => {
        if (err) {
            console.error('Error creating report:', err);
            return res.status(500).json({ message: 'Error creating report' });
        }
        res.status(201).json({ message: 'Report created successfully' });
    });
};

exports.getReportsByUser = (req, res) => {
    const { userID } = req.params;

    pool.query('SELECT * FROM tbl_115_reports WHERE userID = ?', [userID], (err, results) => {
        if (err) {
            console.error('Error fetching reports:', err);
            return res.status(500).json({ message: 'Error fetching reports' });
        }
        res.json(results);
    });
};
