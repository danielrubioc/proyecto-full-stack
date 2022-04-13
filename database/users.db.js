require("dotenv").config();
const { query } = require("./db");

const usersIndexDB = async () => {
    const sqlquery = {
        text: "SELECT * FROM users ORDER BY id",
    };
    const response = query(sqlquery);
    return response;
};

const usersCreateDB = async (data) => {
    const { name, email, password } = data;
    const sqlquery = {
        text: "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *",
        values: [name, email, password],
    };
    const response = query(sqlquery);
    return response;
};

const usersDeleteDB = async (id) => {
    const sqlquery = {
        text: "DELETE FROM users WHERE id=$1 RETURNING*;",
        values: [id],
    };
    const response = query(sqlquery);
    return response;
};

const usersUpdateDB = async (data) => {
    const { name, password, id } = data;
    console.log({ name, password, id });
    const sqlquery = {
        text: "UPDATE users SET name = $1, password = $2 WHERE id = $3 RETURNING*;",
        values: [name, password, id],
    };
    const response = query(sqlquery);
    return response;
};

module.exports = {
    usersIndexDB,
    usersCreateDB,
    usersDeleteDB,
    usersUpdateDB,
};
