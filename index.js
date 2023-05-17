const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employeeTracker"
});

db.connect(function (err) {
    if (err) throw err
    console.log("MySQL Connected")
    menu();
});