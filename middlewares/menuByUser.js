const { menusUserExistDB } = require("../database/menus.db");

const menuByUser = async (req, res, next) => {
    try {
        const user_id = req.userID;
        const { menu_id } = req.params;
        const { datas } = await menusUserExistDB({ user_id, menu_id });
        if (datas.length === 0) {
            throw new Error("No tienes permisos para ese menú");
        }

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: error.message,
        });
    }
};

module.exports = { menuByUser };
