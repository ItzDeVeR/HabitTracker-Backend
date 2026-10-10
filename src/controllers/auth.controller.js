const authService = require("../services/auth.service")
const jwt = require("../config/jwt");

exports.getUsers = (req, res) => {
    try {
        const result = authService.getAllUsers();

        return res.json(result);
    }
    catch (err) {
        console.log("err");
    }
}

exports.registerUser = (req, res) => {
    try {
        const { email, password } = req.body;
        const candidateId = authService.createUser(email, password);

        const result = jwt.createToken({ id: candidateId, email })

        return res.json(result);
    } catch (err) {
        console.log(err)
    }
}

exports.loginUser = (req, res) => {
    try {
        const { email, password} = req.body;

        const userId = authService.loginUser(email, password);

        const result = jwt.createToken({id: userId, email});

        return res.json(result);
    } catch (err) {
        console.log(err)
    }
}