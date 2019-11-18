
const axios = require("axios");

module.exports = {
// Call to return information about the entered users repos on github
repoCall: async function (userName) {
    console.log(userName)
    const queryUrl = `https://api.github.com/users/${userName}/repos?per_page=100`;
    
    let res = await axios.get(queryUrl);
    return res.data;
    }
}
