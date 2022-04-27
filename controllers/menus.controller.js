const {
    menusIndexDB,
    menusCreateDB,
    menusDeleteDB,
    menusUpdateDB,
    menuByIdDB,
    menuAll,
} = require("../database/menus.db");

const menusIndex = async (req, res) => {
    const user_id = req.userID;
    const response = await menusIndexDB(user_id);
    if (!response.ok) {
        return res.status(500).json({ ok: false, msg: response.msg });
    }
    return res.json({ ok: true, data: response.datas });
};

const menusCreate = async (req, res) => {
    const { name, url } = req.body;
    const user_id = req.userID;
    const response = await menusCreateDB({ name, url, user_id });
    if (!response.ok) {
        return res.status(500).json({ ok: false, msg: response.msg });
    }
    return res.json({ ok: true, data: response.datas });
};

const menusDelete = async (req, res) => {
    const { menu_id: id } = req.params;
    const user_id = req.userID;
    const response = await menusDeleteDB({ id, user_id });
    if (!response.ok) {
        return res.status(500).json({ ok: false, msg: response.msg });
    }
    return res.json({ ok: true, data: response.datas });
};

const menusUpdate = async (req, res) => {
    const { menu_id: id } = req.params;
    const { name, url } = req.body;
    const user_id = req.userID;
    try {
        const response = await menusUpdateDB({ id, name, url, user_id });
        if (!response.ok) {
            return res.status(500).json({ ok: false, msg: response.msg });
        }
        return res.json({ ok: true, data: response.datas });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: response.msg });
    }
};

const menuById = async (req, res) => {
    const { menu_id: id } = req.params;
    const response = await menuByIdDB(id);
    if (!response.ok) {
        return res.status(500).json({ ok: false, msg: response.msg });
    }
    return res.json({ ok: true, data: response.datas });
};

const menusDigital = async (req, res) => {
    const { menu_id: id } = req.params;
    const response = await menuAll(id);
    console.log(response);
    if (!response.ok) {
        return res.status(500).json({ ok: false, msg: response.msg });
    }
    return res.json({ ok: true, data: response.datas });
};

module.exports = {
    menusIndex,
    menusCreate,
    menusDelete,
    menusUpdate,
    menuById,
    menusDigital,
};
