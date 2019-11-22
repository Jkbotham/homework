const Employee = require("./Employee")
const template = require("../templates/intern")

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
        this.role = "Intern";
    }
    getRole(){
        return this.role
    }
    getSchool(){
        return this.school
    }
    createCard(){
        return template(this);
    
    }
}

module.exports = Intern;