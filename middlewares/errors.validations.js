const { validationResult } = require("express-validator");
/*Si existen errores en express validator retorno un throw error*/
const existsErrors = (req, res, next) => {
    try {
        const errorFormatter = ({ msg, param }) => {
            return `[${param}]: ${msg}`;
        };

        const result = validationResult(req).formatWith(errorFormatter);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new Error(result.array());
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
