
const fs = require("fs");
const axios = require("axios");

module.exports = {

repoCall: async function (userName) {
    console.log(userName)
    const queryUrl = `https://api.github.com/users/${userName}/repos?per_page=100`;
    
    let res = await axios.get(queryUrl);
    return res.data;
    }
}

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