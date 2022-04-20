const {
    usersIndexDB,
    usersCreateDB,
    usersDeleteDB,
    usersUpdateDB,
} = require("../database/users.db");
const bcrypt = require("bcryptjs");

const usersIndex = async (req, res) => {
    const response = await usersIndexDB();
    if (!response.ok) {
        return res.status(500).json({ msg: response.msg });
    }
    return res.json({ datas: response.datas });
};

const usersCreate = async (req, res) => {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const response = await usersCreateDB({
        name,
        email,
        password: hashPassword,
    });
    if (!response.ok) {
        return res.status(500).json({ msg: response.msg });
    }
    return res.json({ datas: response.datas });
};

const usersDelete = async (req, res) => {
    const { id } = req.params;
    const response = await usersDeleteDB(id);
    if (!response.ok) {
        return res.status(500).json({ msg: response.msg });
    }
    return res.json({ datas: response.datas });
};

const usersUpdate = async (req, res) => {
    const { id } = req.params;
    const { name, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const response = await usersUpdateDB({ id, name, password: hashPassword });
    if (!response.ok) {
        return res.status(500).json({ msg: response.msg });
    }
    return res.json({ datas: response.datas });
};

module.exports = {
    usersIndex,
    usersCreate,
    usersDelete,
    usersUpdate,
};
