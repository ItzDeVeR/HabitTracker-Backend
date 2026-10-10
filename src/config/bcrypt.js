const bcrypt = require('bcrypt');
const saltRounds = 10;

const createHash = (plainPassword) => {
    const hashed_password = bcrypt.hashSync(plainPassword, saltRounds);

    return hashed_password;
}

const checkPassword = (candidatePassword, hashedPassword) => {
    const resultOfCompare = bcrypt.compareSync(candidatePassword, hashedPassword);

    return resultOfCompare;
}


module.exports = { createHash, checkPassword }