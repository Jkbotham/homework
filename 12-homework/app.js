
const cTable = require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql");

// Connection to mysql server at start of application
// -------------------------------------------------------------------------------------
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "james",
    password: "",
    database: "allemployees"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    // console.log("connected as id " + connection.threadId);
});

// Variables Used throughout the application to minimize database calls
// -------------------------------------------------------------------------------------
let role = [];
let employees = [];
let department = [];

// Populates variables with database data for usage within inquire questions
// -------------------------------------------------------------------------------------
function initialCalls() {

    roleCall();
    departmentCall();
    employeeCall();
}

function roleCall() {
    connection.query("SELECT r.id AS value, title AS name, r.salary,r.department_id FROM role r", function (err, results) {
        if (err) {
            throw err
        }
        role = results;
    });
}

function departmentCall() {
    connection.query("SELECT d.name, d.id AS value FROM department d", function (err, result) {
        if (err) {
            throw err
        }
        department = result
    })
}

function employeeCall() {
    connection.query("SELECT e.id AS value,CONCAT(e.first_name,' ', e.last_name) AS name FROM employee e", function (err, res) {
        if (err) {
            throw err
        }
        employees = res
    });
}

// Function used to pause between functions
// -------------------------------------------------------------------------------------
function restartQuestions() {
    console.log("\n");
    setTimeout(() => { question(); }, 1000);
}

// Action functions -- Receives data from user, sends proper mysql calls using functions and returns user to main menu.
// -------------------------------------------------------------------------------------
function removeEmployee() {

    inquirer.prompt([
        {
            type: "list",
            message: "Select Employee you wish to remove",
            choices: employees,
            name: "id"
        }
    ]).then(answer => {
        connection.query("DELETE FROM employee WHERE id = ?", answer.id, function (err, results) {
            if (err) {
                console.log(err);
                throw err
            }
        })
        employeeCall();
        restartQuestions();
    })
}

function updateEmployee() {

    inquirer.prompt([
        {
            type: "list",
            message: "Select Employee to Update",
            choices: employees,
            name: "employee"
        },
        {
            type: "list",
            message: "Choose New Role",
            choices: role,
            name: "role"
        }
    ]).then(answer => {
        update("employee", "role_id", answer.role, answer.employee);
        employeeCall();
        restartQuestions();
    })
}

function addDepartment() {

    inquirer.prompt([
        {
            type: "input",
            message: "Department Title",
            name: "name"
        }
    ]).then(answer => {
        insertINTO("department", "name", answer.name);
        departmentCall();
        restartQuestions();
    })
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "Job Title",
            name: "title"
        },
        {
            type: "list",
            message: "Role Yearly Salary",
            choices: [30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 125000, 150000],
            name: "salary"
        },
        {
            type: "list",
            message: "Department Role falls under",
            choices: department,
            name: "department"
        }
    ]).then(answer => {
        insertINTO("role", ["title", "salary", "department_id"], [answer.title, answer.salary, answer.department]);
        roleCall();
        restartQuestions();
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "Employee First Name",
            name: "fName"
        },
        {
            type: "input",
            message: "Employee Last Name",
            name: "lName"
        },
        {
            type: "list",
            message: "Employee Title",
            choices: role,
            name: "role"
        },
        {
            type: "list",
            message: "Direct Manager",
            choices: employees,
            name: "manager"
        }
    ]).then(answer => {
        insertINTO("employee", ["first_name", "last_name", "role_id", "manager_id"], [answer.fName, answer.lName, answer.role, answer.manager]);
        employeeCall();
        restartQuestions();
    })
};

// Main Menu -- Directs which funciton to call based user selection
// -------------------------------------------------------------------------------------
function question() {
    inquirer.prompt([
            {
                type: "list",
                name: "startMenu",
                message: "--Main Menu--",
                choices: ["View All Employees", "View All Roles", "View All Departments", "Add Employee", "Add Role", "Add Department", "Update Employee Role", "Remove Employee", "Exit"]
            }
        ]).then(answer => {
            switch (answer.startMenu) {
                case "View All Employees":
                    printEmployees();
                    break;
                case "View All Roles":
                    viewAll("role");
                    break;
                case "View All Departments":
                    viewAll("department");
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Update Employee Role":
                    updateEmployee();
                    break;
                case "Remove Employee":
                    removeEmployee();
                    break;
                case "Exit":
                    return;
            }
        })
}

// Different mysql call functions allowing for less code throughout the application. 
// -------------------------------------------------------------------------------------
function viewAll(table) {
    connection.query("SELECT * FROM ??", table, function (err, results) {
        if (err) {
            console.log(err);
        }
        console.table(results)
        restartQuestions();
    })

}

function printEmployees() {
    connection.query("SELECT e.id,CONCAT(e.first_name,' ', e.last_name) AS Employee, title AS Title, CONCAT('$ ',salary) AS Salary, name AS 'Department',CONCAT(m.first_name,' ', m.last_name) as 'Manager' FROM employee e INNER JOIN role r ON role_id = r.id  INNER JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id ORDER BY department", function (err, results) {
        if (err) {
            console.log(err);
        }
        console.table('\n', results);
        restartQuestions();
    })
}


function insertINTO(table, values, data) {
    connection.query("INSERT INTO ??(??) VALUES(?)", [table, values, data], function (err, result) {
        if (err) {
            console.log(err);
        }
    })
}

function update(table, name, newData, id) {
    connection.query("UPDATE ?? SET ?? = ? WHERE id = ?", [table, name, newData, id], function (err, results) {
        if (err) {
            console.log(err);
        }
    })
}

// Start of app
// -------------------------------------------------------------------------------------
initialCalls();
restartQuestions();
