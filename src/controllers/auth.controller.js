const authService = require("../services/auth.service")
const jwt = require("../config/jwt");

exports.registerUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const candidateId = await authService.createUser(email, password);

        const result = jwt.createToken({ id: candidateId, email })

        return res.json(result);
    } catch (err) {
        next(err)
    }
}

exports.loginUser = (req, res, next) => {
    try {
        const { email, password} = req.body;

        const userId = authService.loginUser(email, password);

        if (!userId) return res.status(401).json("Неверная почта или пароль");

        const result = jwt.createToken({id: userId, email});

        return res.json(result);
    } catch (err) {
        next(err);
    }
}