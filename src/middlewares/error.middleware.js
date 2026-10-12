const errorHandler = (err, req, res, next) => {
    if (res.headersSent) return next(err);

    const status = err.statusCode ?? 500;

    if (status === 500) {
        console.error(err);
        return res.status(500).json({ error: "Внутренняя ошибка сервера"})
    }

    return res.status(status).json({
        error: err.message || "Ошибка на сервере"
    });
}

module.exports = errorHandler;