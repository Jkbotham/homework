
const fs = require("fs");
const userCall = require('./calls/user');
const repoFile = require('./calls/repo');
const inquirer = require("inquirer");

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
    // console.log(repoResp)

    console.log(userDataRes.login)

    let totalStarGazers = 0;
    repoResp.forEach((obj) => {
        stars = obj.stargazers_count + totalStarGazers;
    });



function creatPDF() {

    var pdf = require('phantom-html2pdf');
    const options = {
        html: "./newPDF.html",
        css: "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
        paperSize: {width: "900px", height: "1000px"}
    }
    pdf.convert(options, function(err, result) {
 
        /* Using a buffer and callback */
        result.toBuffer(function(returnedBuffer) {});
     
        // /* Using a readable stream */
        // var stream = result.toStream();
     
        // /* Using the temp file path */
        // var tmpPath = result.getTmpPath();
     
        /* Using the file writer and callback */
        result.toFile("output1.pdf", function() {});
    });

};


const webpage = `<!doctype html>
    <html lang="en">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" type="text/css" href="style.css">
        <title>PDF</title>

    </head>
    <body>


        <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="jumbotron"">
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
                <div class="card text-white bg-dark mb-3 center">
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
            <div class="col-md-6">
                <div class="card text-white bg-dark mb-3 center">
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


        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    </body>
    </html>`

fs.writeFile("newPDF.html", webpage, function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("Success!");
    creatPDF();
});
}

main();


    // console.log(userDataRes)
    //     .then(async function (response) {
    //         const gitUser = response.username;
    //         const repoResp = await repoCallFunction(gitUser);
    //         const userDataRes = await userCallFunction(gitUser);
    //         console.log(repoResp);
    //         console.log(userDataRes);


            // const queryUrl = `https://api.github.com/users/${response.username}/repos?per_page=100`;

            // axios
            //     .get(queryUrl)
            //     .then(function (res) {
            //         console.log(res.data);
            //         // avatar
            //         res.data[0].avatar_url

            //         // Username
            //         res.data[0].login

            //         // Link to GitHub Profile
            //         res.data[0].html_url

            //         // link to blog
            //         res.data[0].blog

            //         // User Bio
            //         res.data[0].bio

            //         // Number of public repos
            //         res.data[0].public_repos

            //         // Number of followers
            //         res.data[0].followers

            //         // Number of GitHub Stars
            //         res.data[0]
            //     })

        // })

    // async function repoCallFunction(imput) {
    //     const response = await repoFile.repoCall(imput);

    //     return response
        // const secondCall = await userCall.userCall(response.username);
        // console.log(secondCall);    
    // }

    // async function userCallFunction(imput) {
    //     const response = await userCall.userCall(imput);

    //     return response
        // const secondCall = await userCall.userCall(response.username);
        // console.log(secondCall);    
    // }
    // .then(function (response){
    //     const secondCall = userCall.userCall(response.username);
    //     console.log(secondCall);

    // })
