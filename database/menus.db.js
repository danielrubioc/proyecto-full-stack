require("dotenv").config();
const { query } = require("./db");

const menusIndexDB = async (user_id) => {
    const sqlquery = {
        text: "SELECT * FROM menus WHERE user_id = $1 ORDER BY id DESC",
        values: [user_id],
    };
    const response = query(sqlquery);
    return response;
};

const menusCreateDB = async (data) => {
    const { name, url, user_id } = data;
    const sqlquery = {
        text: "INSERT INTO menus (name, url, user_id) VALUES ($1,$2,$3) RETURNING *",
        values: [name, url, user_id],
    };
    const response = query(sqlquery);
    return response;
};

const menusDeleteDB = async (data) => {
    const { id, user_id } = data;
    const sqlquery = {
        text: "DELETE FROM menus WHERE id=$1 AND user_id=$2 RETURNING*;",
        values: [id, user_id],
    };
    const response = query(sqlquery);
    return response;
};

const menusUpdateDB = async (data) => {
    const { id, name, url, user_id } = data;
    const sqlquery = {
        text: "UPDATE menus SET name = $1, url = $2 WHERE id = $3 AND user_id=$4 RETURNING*;",
        values: [name, url, id, user_id],
    };
    const response = await query(sqlquery);
    return response;
};

const menusUserExistDB = async (data) => {
    const { user_id, menu_id } = data;
    const sqlquery = {
        text: "SELECT * FROM menus WHERE user_id = $1 AND id = $2;",
        values: [user_id, menu_id],
    };
    const response = query(sqlquery);
    return response;
};

const menuByIdDB = async (id) => {
    const sqlquery = {
        text: "SELECT * FROM menus WHERE id = $1;",
        values: [id],
    };
    const response = query(sqlquery);
    return response;
};

module.exports = {
    menusIndexDB,
    menusCreateDB,
    menusDeleteDB,
    menusUpdateDB,
    menusUserExistDB,
    menuByIdDB,
};
