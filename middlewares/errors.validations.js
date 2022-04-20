const { validationResult } = require("express-validator");

const existsErrors = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                ok: false,
                msg: errors.array(),
            });
        }

        next();
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: error.message,
        });
    }
};

module.exports = {
    existsErrors,
};
