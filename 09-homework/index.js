
const fs = require("fs");
const userCall = require('./calls/user');
const repoFile = require('./calls/repo');
const inquirer = require("inquirer");
const pdf = require('html-pdf');


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

    const gitUser = response.username;

    const repoResp = await repoFile.repoCall(gitUser);

    const userDataRes = await userCall.userCall(gitUser);

    console.log(userDataRes);

    console.log(userDataRes.login)

    let totalStarGazers = 0;
    repoResp.forEach((obj) => {
        stars = obj.stargazers_count + totalStarGazers;
    });


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

// Website code to be written to html after ajax calls are finished
const webpage =  
`<!doctype html>
    <html lang="en">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <style>
        canvas{
            background-color:lightsteelblue; 
            }
            body{
                background-color: lightsteelblue;
                height:1200px;
            }
            #topOfPage {
                margin: auto;
                background-color: darkgrey;
                text-align: center;
                max-width: 890px;
            }
            .container { 
                background-color: lightsteelblue;
                max-width: 900px;
                margin:auto;
            }
            .center {
                text-align: center;
                margin: auto;
            }
            img {
                border-radius: 50%;
                border-style: solid;
                border-color: darkslategray;
                width: 200px;
              }
              a {
                  font-size: 30px;
                  color: #343a40;
                  font-weight: bold;
                  padding: 10px;
              }
              .lead {
                  padding-top: 20px;
              }
              .card {
                  float: left;
                  width: 400px;
                  min-height: 150px;
                  text-align: center;
                  margin: 40px;
              }
        </style>

        <title>PDF</title>

    </head>
    <body>


        <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="jumbotron jumbotron-fluid" id="topOfPage">
                <h1 style="color:${response.favoriteColor}">${userDataRes.login}</h1>
                <br>
                <img class="img-fluid profilePic" src="${userDataRes.avatar_url}" alt="Profile Image">
                <br>
                <p class="lead"><a href="https://www.google.com/maps/search/?api=1&${userDataRes.location}">${userDataRes.location}</a> -- <a href="${userDataRes.html_url}">GitHub</a> -- <a href="${userDataRes.blog}">Blog</a></p>

                </div>
            </div>
            </div>
            <div class="row">
            <div class="col-md-12 center">
                <br>
                <h3>${userDataRes.bio}</h3>
                <br>
            </div>
            </div>
            <div class="row ">
            <div class="col-md-6">
                <div class="card text-white bg-dark mb-3 center width: 18rem;">
                <div class="card-body">
                    <h2 class="card-title">Followers</h2>
                    <p class="card-text">${userDataRes.followers}</p>
                </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card text-white bg-dark mb-3 center">
                <div class="card-body">
                    <h2 class="card-title">Public Repositories</h2>
                    <p class="card-text">${userDataRes.public_repos}</p>
                </div>
                </div>
            </div>
            </div>
            <br>
            <br>
            <div class="row">
            <div class="col-md-6 align-middle">
                <div class="card text-white bg-dark mb-3 center align-middle">
                <div class="card-body">
                    <h2 class="card-title">GitHub Stars</h2>
                    <p class="card-text">${stars}</p>
                </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card text-white bg-dark mb-3 center">
                <div class="card-body">
                    <h2 class="card-title">Following</h2>
                    <p class="card-text">${userDataRes.following}</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </body>
    </html>`


// Writes html code to new html after ajax calls are complete
fs.writeFile("./pdf/newPDF.html", webpage, function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("Success!");
    creatPDF();
});
}

main();

