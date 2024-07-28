const pool = require('./models/db');

pool.query('SELECT * FROM tbl_115_users WHERE email = ?', ['test4@example.com'], (err, results) => {
    if (err) {
        console.error('Error executing query:', err);
    } else {
        console.log('Query results:', results);
    }
    process.exit();
});
