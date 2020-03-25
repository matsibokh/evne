const express = require('express');
const router = express.Router();
const rootPath = ('../');

// Add swagger documentation route
router.use("/swagger", require("./swaggerDoc"));
router.use('/', require('./auth'));
router.use('*', require(rootPath + 'middleware/authentication'));
router.use('/', require('./currencies'));
router.get("*", function (req, res) {
    const message = "No service found";
    const statusCode = 404;

    res.status(statusCode);
    res.send({
        status: statusCode,
        message: message,
        type: "request"
    });
});

module.exports = router;