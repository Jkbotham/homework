const Employee = require("./Employee")
const template = require("../templates/manager")


// Manager prototype
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
        this.role = "Manager";
    }
    // Returns roll
    getRole(){
        return this.role;
    };
    // Returns Office Number
    getOfficeNumber(){
        return this.officeNumber
    }
      // Creates the 'card' html text and returns the text
    createCard(){
        return template(this);
    }
}

module.exports = Manager;