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

const menu = () => {
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

const allDepartments = () => {
  db.query(`SELECT * FROM department`, function (err, res) {
    if (err) throw err;
    console.table(res);
    menu();
  });
}

const addDepartment = () => {
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

const allRoles = () => {
  db.query(`SELECT * FROM role`, function (err, res) {
    if (err) throw err;
    console.table(res);
    menu();
  });
}

const addRole = () => {
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

const allEmployees = () => {
  db.query(`SELECT * FROM employee`, function (err, res) {
    if (err) throw err;
    console.table(res);
    menu();
  });
}

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
      },
      {
        type: "input",
        name: "employee_role",
        message: "What is the employee's role id?",
      },
      {
        type: "input",
        name: "manager",
        message: "What is the employee's manager id?",
      },
    ])
    .then((response) => {
      db.query(`INSERT INTO employee SET ?`, {
        first_name: response.first_name,
        last_name: response.last_name,
        role_id: response.employee_role,
        manager_id: response.manager,
      });
      console.log(
        `Added ${response.first_name} ${response.last_name} to the database`
      );
      menu();
    });
}

const updateEmployee = () => {
  const employeeSql = `SELECT * FROM employee`;
  db.query(employeeSql, (err, data) => {
    if (err) throw err;

    const employees = data.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "name",
          message: "Which employee would you like to update?",
          choices: employees,
        },
      ])
      .then((empChoice) => {
        const employee = empChoice.name;
        const params = [];
        params.push(employee);
        db.query(`SELECT * FROM role`, (err, data) => {
          if (err) throw err;
          const roles = data.map(({ id, title }) => ({
            name: title,
            value: id,
          }));
          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: "What is the employee's new role?",
                choices: roles,
              },
            ])
            .then((roleChoice) => {
              const role = roleChoice.role;
              params.push(role);
              let employee = params[0];
              params[0] = role;
              params[1] = employee;
              db.query(
                `UPDATE employee SET role_id = ? WHERE id = ?`,
                params,
                (err, result) => {
                  if (err) throw err;
                  console.log("Employee has been updated!");
                  menu();
                }
              );
            });
        });
      });
  });
}
