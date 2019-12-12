
const cTable = require("console.table")
const connection = require("../config/connection.js");
const inquirer = require("inquirer");

// const connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "20352035",
//     database: "allemployees"
// });

// connection.connect(function (err) {
//     if (err) {
//         console.error("error connecting: " + err.stack);
//         return;
//     }

//     console.log("connected as id " + connection.threadId);
// });

let role = connetion.query("SELECT * FROM role",function(){if (err){console.log(err)}})
let employees = []
let department = connetion.query("SELECT * FROM deparmtnet",function(){if (err){console.log(err)}})

async function removeEmp(){
    printEmployees();
    const remove = await inquirer.prompt([
        {
            type:"input",
            message: "Enter ID of Employee you wish to Remove",
            name: "id"
        }
    ]).then(function(remove){
        connetion.query("DELETE employee WHERE id = ?", remove.id,function(err,results){
            if (err){
                console.log(err)
                throw err
            }
        })
        question();
    })
}

async function updateEmployee(){
    printEmployees();
    const updateEmpRole = await inquirer.prompt([
        {
            type: "input",
            message: "ID of Employee you wish to edit",
            name: "id"
        },
        {
            type:"list",
            message:"Choose New Role",
            choices: role,
            name: "newRole"
        }
    ]).then(function(updateEmpRole){
        update("employee","role",updateEmpRole.newRole,updateEmpRole.id);
        question();
    })
}

async function addDepartment(){
    const newDepart = await inquirer.prompt([
        {
            type: "input",
            message: "Department Title",
            name: "name"
        }
    ]).then(function(newDepartment){
        insertINTO("department","name",newDepartment.name);
    })
}


async function addRole(){
    const newRole = await inquirer.prompt([
        {
            type: "input",
            message: "Job Title",
            name: "title"
        },
        {
            type:"list",
            message:"Role Yearly Salary",
            choices: [30000,40000,50000,60000,700000,80000,90000,100000,125000,150000],
            name: "salary"
        },
        {
            type: "list",
            message: "Department Role falls under",
            choices: department,
            name: department
        }
    ]).then(function(newRole){
        insertINTO("role",["title","salary","department_id"],[newRole.title,newRole.salary,newRole.department])
        question();
    })
}

async function addEmployee(){
    const newEmp = await inquirer.prompt([
    {
        type:"input",
        message:"Employee First Name",
        name: "fName"
    },
    {
        type:"input",
        message:"Employee Last Name",
        name: "lName"
    },
    {
        type: "list",
        message: "Employee Title",
        choices: role,
        name: role

    },
    {
        type: "list",
        message: "Direct Manager",
        choices: employees,
        name: manager
    }
]).then(function(newEmp) {
    insertINTO("employee", ["first_name","last_name","role_id","manager_id"],[newEmp.fName,newEmp.lName,newEmp.role,newEmp.manager])
    question();
})
};


async function question() {
    const answer = await inquirer.prompt([{
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Roles", "View All Department", "Add Employee", "Add Role", "Add Department", "Update Employee Role", "Remove Employee","Exit"],
        name: "startMenu"
    }]).then(function (answer) {
        console.log(answer)
        switch (answer.startMenu) {
            case "View All Employees":
                console.log("works")
                printEmployees();
                break;
            case "View All Roles":
                viewAll("role");
                console.log("works")
                break;
            case "View All Department":
                viewAll("department");
                console.log("works")
                break;
            case "Add Employee":
                addEmployee();
                console.log("works")
                break;
            case "Add Role":
                addRole();
                console.log("works")
                break;
            case "Add Department":
                addDepartment();
                console.log("works")
                break;
            case "Update Employee Role":
                console.log("works")
                break;
            case "Remove Employee":
                removeEmp();
                console.log("works")
                break;
            case "Exit":
                return;
        }
    })
}



// ["Veiw All Employees, Role, or Department", "Add Employee, Role, or Department", "Update Employee, Role, or Department"],
// ["View All Employees","View All Roles","View All Department", "Add Employee", "Add Role","Add Department", "Update Employee Information", "Remove Employee"]
function viewAll(table) {
    connection.query("SELECT * FROM ??", table, function (err, results) {
        if (err) {
            console.log(err);
        }
        console.table(results)
    })
}

function printEmployees() {

    connection.query("SELECT e.id,CONCAT(e.first_name,' ', e.last_name) AS Employee, title AS Title, CONCAT('$ ',salary) AS Salary, name AS 'Department',CONCAT(m.first_name,' ', m.last_name) as 'Manager' FROM employee e INNER JOIN role r ON role_id = r.id  INNER JOIN department d ON r.department_id = d.id INNER JOIN employee m ON e.manager_id = m.id ORDER BY department", function (req, results) {

        console.table(results)
    });
};


// let  emp = ["first_name","last_name","role_id","manager_id"]
// let imp = ["employee"]
// let vals = ["jacob","BingBong",7,2]


function insertINTO(table, values, data) {
    connection.query("INSERT INTO ??(??) VALUES(?)", [table, values, data], function (err, result) {
        if (err) {
            console.log(err)
        }
        console.log("New Employee")
    })
}

function update(table, name, newData, id) {
    connection.query("UPDATE ?? SET ?? = ? WHERE id = ?", [table, name, newData, id], function (err, results) {
        if (err) {
            console.log(err);
        }
    })
}


// printEmployees();
question();
console.log(role,department);
// insertINTO();

// Min---Req
// View All Employees, departments, Roles

// Add Department , Roles, Employees

// Update Employee Roles

// Bonus --- 

// View Employees by Manager

// Update Employee Managers

// Delete departments, roles, and Employees
// View the total utilized budget of a department -- ie the combined salries of all employees in that department
