const { loginDB, registerDB } = require("../database/auth.db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const response = await loginDB(email);

        const { datas } = await response;

        if (datas.length == 0) {
            throw new Error("No existe el email");
        }

        const [user] = datas;
        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            throw new Error("Contraseña incorrecta");
        }

        // generar JWT
        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            //expiresIn: "1h", expiresIn: "20s",
            expiresIn: process.env.JWT_TTL,
        });

        if (!response.ok) {
            return res.status(500).json({
                ok: false,
                msg: response.msg,
            });
        }
        return res.json({
            ok: true,
            token,
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: error.message,
        });
    }
};

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const response = await registerDB({
            name,
            email,
            password: hashPassword,
        });
        if (!response.ok) {
            return res.status(500).json({ ok: false, msg: response.msg });
        }

        return res.json({
            ok: true,
            data: response.datas,
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: error.message,
        });
    }
};

module.exports = {
    login,
    register,
};
