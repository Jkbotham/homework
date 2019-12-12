
const cTable = require("console.table")
const mysql = require("mysql");
const inquirer = require("inquirer");

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



function printEmployees() {
  
    connection.query("SELECT e.id,CONCAT(e.first_name,' ', e.last_name) AS Employee, title AS Title, CONCAT('$ ',salary) AS Salary, name AS 'Department',CONCAT(m.first_name,' ', m.last_name) as 'Manager' FROM employee e INNER JOIN role r ON role_id = r.id  INNER JOIN department d ON r.department_id = d.id INNER JOIN employee m ON e.manager_id = m.id ORDER BY department",function(req, results){
 
        console.table(results)
    });
};


// let  emp = ["first_name","last_name","role_id","manager_id"]
// let imp = ["employee"]
// let vals = ["jacob","BingBong",7,2]

function insertINTO(table,values,data){
    connection.query("INSERT INTO ??(??) VALUES(?)", [table,values,data],function(err, result){
        if (err){
            console.log(err)
        }
        console.log("New Employee")
    })
}

function update(table,name,newData,id){
    connection.query("UPDATE ?? SET ?? = ? WHERE id = ?",[table, name, newData, id], function(err, results){
        if (err){
            console.log(err);
        }
    })
}

printEmployees();
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



// inquirer.prompt([
//     {
//         type: "input",
//         message: "Employees Name",
//         name: "name",
//     },
//     {
//         type: "list",
//         message: "Job Title",
//         choices: ["Manager", "Engineer", "Intern"],
//         name: "jobTitle"
//     },
//     {
//         input: "input",
//         message: "Employee ID(Numbers Only)",
//         name: "id",
//         validate: function (id) {
//             const check = id.match(/[0-9]/ig)
//             if (check) {
//                 return true
//             }
//             else {
//                 return 'IDs only use numbers. Please check the ID and try again'
//             }
//         }
//     },
//     {
//         type: "input",
//         message: "Employee Email",
//         name: "email",
//         validate: function (email) {
//             if (validator.validate(email)) {
//                 return true
//             }
//             else {
//                 return 'Please enter a valid email'
//             };
//         }
//     }
// ])

// Start our server so that it can begin listening to client requests.
