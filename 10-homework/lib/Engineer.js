
const Employee = require("./Employee")
const template = require("../templates/engineer")


class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
        this.role = "Engineer";
    }
    getRole() {
        return this.role
    }
    getGithub(){
        return this.github
    }
    createCard(){
        return template(this);
    }
}

module.exports = Engineer;