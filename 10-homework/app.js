const fs = require("fs");
const proto = require("./templates/prototypes.js");
const questions = require("./resources/questions");
const main = require("./templates/main")

async function appStart(){ 
    const response = await questions();
    console.log(response, "here")

   fs.writeFile("./main.html", main, function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("Success!");
});
}

appStart();
