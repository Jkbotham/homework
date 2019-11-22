

class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = "Employee";
    }
    // Returns employees name
    getName(){
        return this.name
    }
    // Returns employees ID number
    getId(){
        return this.id
    }
    // Returns employees email
    getEmail(){
        return this.email
    }
    // Returns employees role
    getRole(){
        return this.role
    }
}

module.exports = Employee