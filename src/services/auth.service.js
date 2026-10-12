const db = require("../config/db.js");
const bcrypt = require("../config/bcrypt.js");

function isExistEmail(email) {
    const candidateEmail = db.prepare("select count(email) from users where email = ?").pluck().get(email);

    return candidateEmail ? true : false;
}

async function createUser(email, password) {
    if (isExistEmail(email)) {
        const error = new Error("Данный email уже занят.");
        error.statusCode = 409;
        throw error;
    }
    const hashedPassword = await bcrypt.createHash(password);

    const {lastInsertRowid} = db.prepare("insert into users (email, password_hash) values (?, ?)").run(email, hashedPassword);

    return Number(lastInsertRowid);
}

function loginUser(email, password) {
    const candidateUser = db.prepare("select id, password_hash from users where email = ?").get(email);

    if (!candidateUser) return false;

    if (!bcrypt.checkPassword(password, candidateUser.password_hash)) return false;

    return candidateUser.id;
}

module.exports = {
    createUser,
    loginUser
}