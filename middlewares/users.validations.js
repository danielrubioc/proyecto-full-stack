const { check } = require("express-validator");
const { loginDB } = require("../database/auth.db");

const validateRegister = [
    check("name", "es requerido").exists().notEmpty(),
    check("email", "debe ser un email válido")
        .isEmail()
        .exists()
        .custom((value, { req }) => {
            const { email } = req.body;
            return loginDB(email).then((response) => {
                if (response.datas.length > 0) {
                    throw "El campo ya esta en uso";
                }
            });
        })
        .withMessage("El campo ya esta en uso"),
    check("password", "es requerido")
        .isLength({ min: 4 })
        .withMessage("debe ser mayor a 4")
        .custom((value, { req, loc, path }) => {
            if (value !== req.body.confirmPassword) {
                throw new Error("Las contraseñas no cohinciden");
            } else {
                return value;
            }
        }),
];

module.exports = {
    validateRegister,
};
