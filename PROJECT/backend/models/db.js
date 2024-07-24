const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10, // Adjust the limit based on your needs
    host: '148.66.138.145',
    user: 'dbusrShnkr24',
    password: 'studDBpwWeb2!',
    database: 'dbShnkr24stud',
    connectTimeout: 10000 // 10 seconds
});

module.exports = pool;
