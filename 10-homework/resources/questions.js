

const inquirer = require("inquirer");
const validator = require("email-validator");

module.exports = {
// Object of question functions to return user input
    employee: async function () {
        const res = await inquirer.prompt([
            {
                type: "input",
                message: "Employees Name",
                name: "name",
            },
            {
                type: "list",
                message: "Job Title",
                choices: ["Manager", "Engineer", "Intern"],
                name: "jobTitle"
            },
            {
                input: "input",
                message: "Employee ID(Numbers Only)",
                name: "id",
                validate: function (id) {
                    const check = id.match(/[0-9]/ig)
                    if (check) {
                        return true
                    }
                    else {
                        return 'IDs only use numbers. Please check the ID and try again'
                    }
                }
            },
            {
                type: "input",
                message: "Employee Email",
                name: "email",
                validate: function (email) {
                    if (validator.validate(email)) {
                        return true
                    }
                    else {
                        return 'Please enter a valid email'
                    };
                }
            }
        ])
        return res
    },
    engineer: async function () {
        const res = await inquirer.prompt([
            {
                type: "input",
                message: "GitHub Username",
                name: "gitHub"
            }
        ])
        return res.gitHub
    },
    manager: async function () {
        const res = await inquirer.prompt([
            {
                type: "input",
                message: "Office Number",
                name: "officeNumber"
            }
        ])
        return res.officeNumber
    },
    intern: async function () {
        const res = await inquirer.prompt([
            {
                type: "input",
                message: "School Name",
                name: "schoolName"
            }
        ])
        return res.schoolName
    },
    restart: async function () {
        const res = await inquirer.prompt([
            {
                type: "confirm",
                message: "Enter another employee?",
                name: "answer"
            }
        ])
        return res.answer
    }
}