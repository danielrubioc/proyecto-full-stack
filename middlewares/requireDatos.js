const { nanoid } = require("nanoid");
const { check, validationResult } = require("express-validator");
const { getSkaterByEmailDB } = require("../database/db");
const requireDatos = (req, res, next) => {
    try {
        const errorFormatter = ({
            location,
            msg,
            param,
            value,
            nestedErrors,
        }) => {
            // Build your resulting errors however you want! String, object, whatever - it works!
            return `[${param}]: ${msg}`;
        };

        // validaciones de las fotos
        const { foto } = req.files;
        const pathFoto = `${nanoid()}.${foto.mimetype.split("/")[1]}`;
        req.pathFoto = pathFoto;

        const result = validationResult(req).formatWith(errorFormatter);
        if (!result.isEmpty()) {
            throw new Error(result.array());
            return res.json({ errors: result.array() });
        }

        next();
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: error.message,
        });
    }
};

const requireUpdate = (req, res, next) => {
    try {
        const errorFormatter = ({
            location,
            msg,
            param,
            value,
            nestedErrors,
        }) => {
            return `[${param}]: ${msg}`;
        };

        const result = validationResult(req).formatWith(errorFormatter);
        if (!result.isEmpty()) {
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

/*Todas las validaciones*/
const validateRegister = [
    check("nombre", "es requerido").exists().notEmpty(),
    check("especialidad", "es requerido").exists().notEmpty(),
    check("email", "debe ser un email válido")
        .isEmail()
        .exists()
        .custom((value, { req }) => {
            const { email } = req.body;
            return getSkaterByEmailDB(email).then((respuesta) => {
                if (respuesta.skater) {
                    throw "El campo ya esta en uso";
                }
            });
        })
        .withMessage("El campo ya esta en uso"),
    check("password", "invalid password")
        .isLength({ min: 4 })
        .withMessage("debe ser mayor a 4")
        .custom((value, { req, loc, path }) => {
            if (value !== req.body.confirmPassword) {
                throw new Error("Las contraseñas no cohinciden");
            } else {
                return value;
            }
        }),
    check("anos_experiencia").isNumeric().withMessage("debe ser un número"),
    check("foto")
        .custom((value, { req }) => {
            const { foto } = req.files;
            //console.log(req.files);
            const mimeTypes = ["image/jpeg", "image/png"];
            if (!mimeTypes.includes(foto.mimetype)) {
                return false;
            }
            return true;
        })
        .withMessage("Solo archivos png o jpg")
        .custom((value, { req }) => {
            const { foto } = req.files;
            if (foto.size > 5 * 1024 * 1024) {
                return false;
            }

            return true;
        })
        .withMessage("Máximo 5MB"), // custom error message that will be send back if the file in not a pdf.
];

/*Todas las validaciones*/
const validateUpdate = [
    check("nombre", "es requerido").exists().notEmpty(),
    check("especialidad", "es requerido").exists().notEmpty(),
    check("anos_experiencia").isNumeric().withMessage("debe ser un número"),
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
    requireDatos,
    requireUpdate,
    validateRegister,
    validateUpdate,
};
