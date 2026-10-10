const db = require("../config/db.js");
const bcrypt = require("../config/bcrypt.js");

async function getAllUsers() {
    const users = db.prepare("select * from users").all();

    return users;
}

function createUser(email, password) {
    const hashedPassword = bcrypt.createHash(password);

    const lastId = db.prepare("insert into users (email, password_hash) values (?, ?)").run(email, hashedPassword);

    return lastId.lastInsertRowid;
}

function loginUser(email, password) {
    const candidateUser = db.prepare("select id, password_hash from users where email = ?").get(email);

    if (!bcrypt.checkPassword(password, candidateUser.password_hash)) return false;

    return candidateUser.id;
}

module.exports = {
    getAllUsers,
    createUser,
    loginUser
}