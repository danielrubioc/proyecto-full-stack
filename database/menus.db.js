require("dotenv").config();
const { query } = require("./db");

const menusIndexDB = async () => {
    const sqlquery = {
        text: "SELECT * FROM menus ORDER BY id",
    };
    const response = query(sqlquery);
    return response;
};

const menusCreateDB = async (data) => {
    const { name, email, password } = data;
    const sqlquery = {
        text: "INSERT INTO menus (name, email, password) VALUES ($1,$2,$3) RETURNING *",
        values: [name, email, password],
    };
    const response = query(sqlquery);
    return response;
};

const menusDeleteDB = async (id) => {
    const sqlquery = {
        text: "DELETE FROM menus WHERE id=$1 RETURNING*;",
        values: [id],
    };
    const response = query(sqlquery);
    return response;
};

const menusUpdateDB = async (data) => {
    const { name, password, id } = data;
    console.log({ name, password, id });
    const sqlquery = {
        text: "UPDATE menus SET name = $1, password = $2 WHERE id = $3 RETURNING*;",
        values: [name, password, id],
    };
    const response = query(sqlquery);
    return response;
};

module.exports = {
    menusIndexDB,
    menusCreateDB,
    menusDeleteDB,
    menusUpdateDB,
};
