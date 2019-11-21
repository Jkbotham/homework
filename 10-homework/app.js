const fs = require("fs");
const proto = require("./templates/prototypes.js");
const questions = require("./resources/questions");
const main = require("./templates/main")
const card = "<div><h2>nonononon</h2></div>"

async function appStart(){ 
    const response = await questions.start;
    console.log(response, "here",questions.employees)

   fs.writeFile("./main.html", main + card, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("Success!");
});
}

appStart();
