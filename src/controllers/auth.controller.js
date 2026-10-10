const authService = require("../services/auth.service")

exports.getUsers = (req, res) => {
    try {
        const result = authService.getAllUsers();

        res.json(result);
    }
    catch (err) {
        console.log("err");
    }
}  