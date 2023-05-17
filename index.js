const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Scarface12",
  database: "employeeTracker",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("MySQL Connected");
  menu();
});

function menu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View all Departments",
          "View all Roles",
          "View all Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee",
          "Quit",
        ],
      },
    ])
    .then((data) => {
      if (data.choice === "View all Departments") {
        allDepartments();
      }
      if (data.choice === "View all Roles") {
        allRoles();
      }
      if (data.choice === "View all Employees") {
        allEmployees();
      }
      if (data.choice === "Add Department") {
        addDepartment();
      }
      if (data.choice === "Add Role") {
        addRole();
      }
      if (data.choice === "Add Employee") {
        addEmployee();
      }
      if (data.choice === "Update Employee") {
        updateEmployee();
      }
      if (data.choice === "Quit") {
        console.log("Goodbye!");
        process.exit();
      }
    });
}
