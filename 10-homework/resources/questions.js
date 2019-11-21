
const inquirer = require("inquirer");
const validator = require("email-validator");



const startQuestion = async function () {


    const response = await inquirer.prompt([
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
            name: "ID",
            validate: function(ID){
               const check = ID.match(/[0-9]/gi)
               console.log(check);
                if(check){
                    return true
                }
                else{
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

    if (response.jobTitle === "Manager") {
        const managerResponse = await inquirer.prompt([
            {
                type: "input",
                message: "Office Number",
                name: "officeNumber"
            }
        ])
        response.officeNumber = managerResponse.officeNumber;
        console.log(response);
        return response
    }
    else if (response.jobTitle === "Engineer") {
        const engineerResponse = await inquirer.prompt([
            {
                type: "input",
                message: "GitHub Username",
                name: "gitHub"
            },
        ])
        response.gitHub = engineerResponse.gitHub;
        console.log(response);
        return response
    }
    else {
        const internResponse = await inquirer.prompt([
            {
                type: "input",
                message: "School Name",
                name: "schoolName"
            }
        ])
        response.schoolName = internResponse.schoolName
        console.log(response);
        return response
        
    }
}

module.exports = startQuestion;
