const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

const createToken = (data) => {
    const token = jwt.sign({
        ...data
    }, secretKey, { expiresIn: '8h' });

    return token;
}

const verifyToken = (token) => {
    const data = jwt.verify(token, secretKey);

    return data;
}

module.exports = { createToken, verifyToken }