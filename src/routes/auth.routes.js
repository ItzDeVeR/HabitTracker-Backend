const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

/**
 * @openapi
 * /api/auth/users:
 *   get:
 *     summary: Получение списка пользователей
 *     responses:
 *       200:
 *         description: Просто список пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Json example
 */
router.get("/users", authController.getUsers);
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

module.exports = router;