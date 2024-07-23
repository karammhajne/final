const mysql = require('mysql');

const db = mysql.createConnection({
    host: '148.66.138.145',
    user: 'dbusrShnkr24',
    password: 'studDBpwWeb2!' ,
    database: 'dbShnkr24stud'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

module.exports = db;

