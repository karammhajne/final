const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: '148.66.138.145',
    user: 'dbusrShnkr24',
    password: 'studDBpwWeb2!',
    database: 'dbShnkr24stud',
    connectTimeout: 10000 // 10 seconds
});

pool.getConnection()
    .then(connection => {
        console.log('Connected to the database');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });

module.exports = pool;
