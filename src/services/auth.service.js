const db = require("../config/db.js");

async function getAllUsers() {
    const users = db.prepare("select * from users").all();

    return users;
}

module.exports = {
    getAllUsers
}