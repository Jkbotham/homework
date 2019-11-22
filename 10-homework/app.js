const fs = require("fs");
const Engineer = require("./lib/Engineer")
const Manager = require("./lib/Manager")
const Intern = require("./lib/Intern")
const main = require("./templates/main")
const questions = require("./resources/questions");
const employees = []

async function begin() {
    console.log("\n ---------------------- \n")
    const res = await questions.employee()
    role(res);
}

async function role(res) {

    if (res.jobTitle === "Manager") {
        res.officeNumber = await questions.manager();
        employees.push(new Manager(res.name, res.id, res.email, res.officeNumber))
    }
    else if (res.jobTitle === "Engineer") {
        res.gitHub = await questions.engineer();
        employees.push(new Engineer(res.name, res.id, res.email, res.gitHub))
    }
    else {
        res.school = await questions.intern();
        employees.push(new Intern(res.name, res.id, res.email, res.school))
    }
    anotherEmployee();
}

async function anotherEmployee() {
    const res = await questions.restart();

    if (res) {
        console.log("\n ---------------------- \n")
        begin();
    } else {
       createHtml(employees);
    }
}

async function createHtml(employees){
    let htmlCards = " "
    await employees.forEach(function(res){
        const e = res.createCard();
        htmlCards = htmlCards + e;
    })

    const obj = main(htmlCards)

    fs.writeFile("./output/output.html", obj, function (err) {
        if (err) {
            return console.log(err);
        }
    
        console.log("The HTML file as written!");

    });
}
begin();
