const {
    categoriesIndexDB,
    categoriesCreateDB,
    categoriesDeleteDB,
    categoriesUpdateDB,
} = require("../database/categories.db");
const bcrypt = require("bcryptjs");
const path = require("path");

const categoriesIndex = async (req, res) => {
    const user_id = req.userID;
    const { menu_id } = req.params;
    const response = await categoriesIndexDB({ user_id, menu_id });
    if (!response.ok) {
        return res.status(500).json({ ok: false, msg: response.msg });
    }
    return res.json({ ok: true, data: response.datas });
};

const categoriesCreate = async (req, res) => {
    const { name, description } = req.body;
    const user_id = req.userID;
    const { menu_id } = req.params;
    const response = await categoriesCreateDB({
        name,
        description,
        menu_id,
        user_id,
    });
    if (!response.ok) {
        return res.status(500).json({ ok: false, msg: response.msg });
    }
    return res.json({ ok: true, data: response.datas });
};

const categoriesDelete = async (req, res) => {
    const { category_id } = req.params;
    const response = await categoriesDeleteDB(category_id);
    if (!response.ok) {
        return res.status(500).json({ ok: false, msg: response.msg });
    }
    return res.json({ ok: true, data: response.datas });
};

const categoriesUpdate = async (req, res) => {
    const { category_id } = req.params;
    const { name, description } = req.body;
    const response = await categoriesUpdateDB({
        category_id,
        name,
        description,
    });
    if (!response.ok) {
        return res.status(500).json({ ok: false, msg: response.msg });
    }
    return res.json({ ok: true, data: response.datas });
};

module.exports = {
    categoriesIndex,
    categoriesCreate,
    categoriesDelete,
    categoriesUpdate,
};
