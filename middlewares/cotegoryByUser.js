const { categoriesUserExistDB } = require("../database/categories.db");

const categoryByUser = async (req, res, next) => {
    try {
        const user_id = req.userID;
        const { menu_id, category_id } = req.params;
        const { datas } = await categoriesUserExistDB({
            user_id,
            category_id,
            menu_id,
        });

        if (datas.length === 0) {
            throw new Error("No tienes permisos para la categoria");
        }

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: error.message,
        });
    }
};

module.exports = { categoryByUser };
