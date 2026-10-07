require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/test", (req, res) => {
    res.json({
        message: "Habit Tracker API is running"
    })
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
    console.log(`Swagger Docs available at http://localhost:${port}/api-docs`);
})