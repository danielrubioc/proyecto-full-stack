require("dotenv").config();
const { query } = require("./db");

const categoriesIndexDB = async (data) => {
    const { user_id, menu_id } = data;
    const sqlquery = {
        text: "SELECT c.id,c.name,c.description, c.menu_id FROM categories as c JOIN menus as m ON c.menu_id = m.id WHERE m.user_id = $1 AND c.menu_id = $2 ORDER BY id",
        values: [user_id, menu_id],
    };
    const response = query(sqlquery);
    return response;
};

const categoriesCreateDB = async (data) => {
    const { name, description, menu_id, user_id } = data;
    const sqlquery = {
        text: "INSERT INTO categories (name, description, menu_id) VALUES ($1,$2,$3) RETURNING *",
        values: [name, description, menu_id],
    };
    const response = query(sqlquery);
    return response;
};

const categoriesDeleteDB = async (id) => {
    const sqlquery = {
        text: "DELETE FROM categories WHERE id=$1 RETURNING*;",
        values: [id],
    };
    const response = query(sqlquery);
    return response;
};

const categoriesUpdateDB = async (data) => {
    const { category_id, name, description } = data;
    console.log({ category_id, name, description });
    const sqlquery = {
        text: "UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING*;",
        values: [name, description, category_id],
    };
    const response = query(sqlquery);
    return response;
};

const categoriesUserExistDB = async (data) => {
    const { user_id, category_id, menu_id } = data;
    const sqlquery = {
        text: "SELECT c.id, c.name, c.description, c.menu_id FROM categories as c JOIN menus as m ON c.menu_id = m.id WHERE m.user_id = $1 AND c.menu_id = $2 AND c.id = $3;",
        values: [user_id, menu_id, category_id],
    };
    const response = await query(sqlquery);
    return response;
};

module.exports = {
    categoriesIndexDB,
    categoriesCreateDB,
    categoriesDeleteDB,
    categoriesUpdateDB,
    categoriesUserExistDB,
};
