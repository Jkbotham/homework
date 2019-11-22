const Employee = require("./Employee")
const template = require("../templates/intern")

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
        this.role = "Intern";
    }
    // Returns the role
    getRole() {
        return this.role
    }
    // Returns the school name
    getSchool() {
        return this.school
    }
      // Creates the 'card' html text and returns the text
    createCard() {
        return template(this);
    }
}

module.exports = Intern;