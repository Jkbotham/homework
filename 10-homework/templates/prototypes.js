



class employee{
    constructor(name, role, id, email){
    this.name = name
    this.role = role
    this.id = id
    this.email = email
}
}
class engineer extends employee {
    constructor(name, role, id, email,github){
        super(name, role, id, email);
        this.github = github;
    }
}
class manager extends employee {
    constructor(name, role, id, email,officeNum){
        super(name, role, id, email);
        this.officeNum = officeNum;
    }
}
class intern extends employee {
    constructor(name, role, id, email,school){
        super(name, role, id, email);
        this.school = school;
    }
}


module.exports = engineer;
module.exports = manager;
module.exports = intern;
