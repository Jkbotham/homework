

const fs = require("fs");
const axios = require("axios");

module.exports = {

userCall: async function (userName) {
    console.log(userName)
    const queryUrl = `https://api.github.com/users/${userName}`;

    let res = await axios.get(queryUrl);
        return res.data;
        }
    }
