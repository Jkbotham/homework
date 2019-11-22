
const Employee = require("./Employee")
const template = require("../templates/engineer")


class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
        this.role = "Engineer";
    }
    // Returns employees role
    getRole() {
        return this.role
    }
    // Returns employees Github username
    getGithub(){
        return this.github
    }
     // Creates the 'card' html text and returns the text
    createCard(){
        return template(this);
    }
}

module.exports = Engineer;