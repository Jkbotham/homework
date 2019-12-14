
const cTable = require("console.table")
const inquirer = require("inquirer");
const mysql = require("mysql")

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "20352035",
    database: "allemployees"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
});

let role = []
let employees = []
let department = []

function initialCalls(){
    connection.query("SELECT * FROM role",function(err, results){
        if (err){
            throw err
        }
        role = results
        // console.log(role)
    })
    connection.query("SELECT * FROM department", function(err,result){
        if (err){
            throw err
        }
        department = result 
    })
    connection.query("SELECT e.id,CONCAT(e.first_name,' ', e.last_name) AS name FROM employee e", function(err,res){
        if (err){
            throw err
        }
        employees = res 
    })
}

async function removeEmp(){
    const remove = await inquirer.prompt([
        {
            type:"input",
            message: "Enter ID of Employee you wish to Remove",
            name: "id"
        }
    ]).then(function(remove){
        connection.query("DELETE FROM employee WHERE id = ?", remove.id,function(err,results){
            if (err){
                console.log(err)
                throw err
            }
            question();
        })


    })
}

async function updateEmployee(){
    const updateEmpRole = await inquirer.prompt([
        {
            type: "list",
            message: "Select Employee to Update",
            choices: employees,
            name: "name"
        },
        {
            type:"list",
            message:"Choose New Role",
            choices: role.map((role) => role.title),
            name: "newRole"
        }
    ]).then(function(updateEmpRole){
        let roleId = ""
        let employeeId = ""
        role.forEach(function(obj){
            if(updateEmpRole.newRole === obj.title){
                console.log(obj.id,"role")
                return roleId = obj.id  
            }
        })
        employees.forEach(function(obbj){
            if(updateEmpRole.name === obbj.name){
                console.log(employees)
                console.log(obbj.id,"employees")
               return employeeId = obbj.id
            }
        })

        update("employee","role_id",roleId,employeeId);
        question()
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
            choices: [30000,40000,50000,60000,70000,80000,90000,100000,125000,150000],
            name: "salary"
        },
        {
            type: "list",
            message: "Department Role falls under",
            choices: department,
            name: "department"
        }
    ]).then(function(newRole){
        let departmentId = ""
        department.forEach(function(obj){
            if(newRole.department === obj.name){
                departmentId = obj.id
            }
        })
        insertINTO("role",["title","salary","department_id"],[newRole.title,newRole.salary,departmentId])
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
        choices: role.map((role) => role.title),
        name: "role"
    },
    {
        type: "list",
        message: "Direct Manager",
        choices: employees.map((employees) => employees.Name),
        name: "manager"
    }
]).then(function(newEmp) {
    insertINTO("employee", ["first_name","last_name","role_id","manager_id"],[newEmp.fName,newEmp.lName,newEmp.role,newEmp.manager])
    question();
})
};


async function question() {
    const answer = await inquirer.prompt([
        {
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Roles", "View All Departments", "Add Employee", "Add Role", "Add Department", "Update Employee Role", "Remove Employee","Exit"],
        name: "startMenu"
    }]).then(function (answer) {
        console.log(answer)
        switch (answer.startMenu) {
            case "View All Employees":
                connection.query("SELECT e.id,CONCAT(e.first_name,' ', e.last_name) AS Employee, title AS Title, CONCAT('$ ',salary) AS Salary, name AS 'Department',CONCAT(m.first_name,' ', m.last_name) as 'Manager' FROM employee e INNER JOIN role r ON role_id = r.id  INNER JOIN department d ON r.department_id = d.id INNER JOIN employee m ON e.manager_id = m.id ORDER BY department", function (err, results) {
                    if (err){ 
                        console.log(err);
                    }
                    console.log('\n')
                    console.table('\n',results)
                    
                question()
                })

                break;
            case "View All Roles":
                viewAll("role");
                break;
            case "View All Department":
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
                printEmployees();
                removeEmp();
                break;
            case "Exit":
                return;
        }
    })
}


function viewAll(table) {
    connection.query("SELECT * FROM ??", table, function (err, results) {
        if (err) {
            console.log(err);
        }
        console.table('\n',results)
        question();
    })
}

function printEmployees() {

    connection.query("SELECT e.id,CONCAT(e.first_name,' ', e.last_name) AS Employee, title AS Title, CONCAT('$ ',salary) AS Salary, name AS 'Department',CONCAT(m.first_name,' ', m.last_name) as 'Manager' FROM employee e INNER JOIN role r ON role_id = r.id  INNER JOIN department d ON r.department_id = d.id INNER JOIN employee m ON e.manager_id = m.id ORDER BY department", function (req, results) {
    console.table(results)

    });
};


function insertINTO(table, values, data) {
    connection.query("INSERT INTO ??(??) VALUES(?)", [table, values, data], function (err, result) {
        if (err) {
            console.log(err)
        }
        console.log('\n')
        question();
    })
}

function update(table, name, newData, id) {
    connection.query("UPDATE ?? SET ?? = ? WHERE id = ?", [table, name, newData, id], function (err, results) {
        if (err) {
            console.log(err);
        }
        console.log('\n')        
        question();
    })
}


// printEmployees();
initialCalls();
question();


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
