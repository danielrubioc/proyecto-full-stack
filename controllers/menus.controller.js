const {
    menusIndexDB,
    menusCreateDB,
    menusDeleteDB,
    menusUpdateDB,
} = require("../database/menus.db");
const bcrypt = require("bcryptjs");
const path = require("path");

const menusIndex = async (req, res) => {
    const response = await menusIndexDB();
    if (!response.ok) {
        return res.status(500).json({ msg: response.msg });
    }
    return res.json({ datas: response.datas });
};

const menusCreate = async (req, res) => {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const response = await menusCreateDB({
        name,
        email,
        password: hashPassword,
    });
    if (!response.ok) {
        return res.status(500).json({ msg: response.msg });
    }
    return res.json({ datas: response.datas });
};

const menusDelete = async (req, res) => {
    const { id } = req.params;
    const response = await menusDeleteDB(id);
    if (!response.ok) {
        return res.status(500).json({ msg: response.msg });
    }
    return res.json({ datas: response.datas });
};

const menusUpdate = async (req, res) => {
    const { id } = req.params;
    const { name, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const response = await menusUpdateDB({ id, name, password: hashPassword });
    if (!response.ok) {
        return res.status(500).json({ msg: response.msg });
    }
    return res.json({ datas: response.datas });
};

module.exports = {
    menusIndex,
    menusCreate,
    menusDelete,
    menusUpdate,
};
