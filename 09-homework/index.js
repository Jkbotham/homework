
const fs = require("fs");
const userCall = require('./calls/user');
const repoFile = require('./calls/repo');
const inquirer = require("inquirer");
const pdf = require('html-pdf');
const websiteTemp = require('./resources/htmlTemplate');

// Main function that starts the app
async function main() {

    const response = await inquirer.prompt([
        {
            type: "input",
            message: "Enter your GitHub username",
            name: "username",
        },
        {
            type: "input",
            message: "Enter your favorite color",
            name: "favoriteColor",
        }
    ])
    
    const userFavColor = response.favoriteColor
    const gitUser = response.username;

    const repoResp = await repoFile.repoCall(gitUser);
    const userDataRes = await userCall.userCall(gitUser);

    // console.log(userDataRes);

    // console.log(userDataRes.login)

    let totalStarGazers = 0;
    repoResp.forEach((obj) => {
        stars = obj.stargazers_count
         + totalStarGazers;
    });
    
    // Passes both repo calls to the HTML template and returns the HTML code.
    const website = websiteTemp.pdfHtml(userFavColor, userDataRes,stars);


// Creates the PDf by reading the created html based on the ajax calls
async function creatPDF() {
    try {
  
      const readHtml = fs.readFileSync('./pdf/newPDF.html', 'utf-8');
      const options = {height: '900px',width: '800px', renderDelay:'1000'};
       
      pdf.create(readHtml, options).toFile('./pdf/newPDF.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res); 
      });
  
      console.log("Successfully wrote to newPDF.html");
    } catch (err) {
      console.log(err);
    }
  };

// Writes html code to new html after ajax calls are complete
fs.writeFile("./pdf/newPDF.html", website, function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("Success!");
    creatPDF();
});
}

main();

