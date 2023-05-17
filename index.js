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

function allDepartments() {
  db.query(`SELECT * FROM department`, function (err, res) {
    if (err) throw err;
    console.table(res);
    menu();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department_name",
        message: "What is the name of the department?",
      },
    ])
    .then((response) => {
      db.query(`INSERT INTO department SET ?`, {
        department_name: response.department_name,
      });
      console.log(`Added ${response.department_name} to the database`);
      menu();
    });
}

function allRoles() {
  db.query(`SELECT * FROM role`, function (err, res) {
    if (err) throw err;
    console.table(res);
    menu();
  });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role_name",
        message: "What is the name of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "input",
        name: "role_department",
        message: "Which department does the role belong to?",
      },
    ])
    .then((response) => {
      db.query(`INSERT INTO role SET ?`, {
        title: response.role_name,
        salary: response.salary,
        department_id: response.role_department,
      });
      console.log(`Added ${response.role_name} to the database`);
      menu();
    });
}
