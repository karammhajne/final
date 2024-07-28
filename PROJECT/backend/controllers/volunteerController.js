const pool = require('../models/db');

exports.getVolunteerUpdates = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM tbl_115_update');
        res.json(results);
    } catch (error) {
        console.error('Error fetching volunteer updates:', error);
        res.status(500).json({ message: 'Error fetching volunteer updates' });
    }
};
