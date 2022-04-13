require("dotenv").config();
const { query } = require("./db");

const loginDB = async (email) => {
    const sqlquery = {
        text: "SELECT * FROM users where email= $1;",
        values: [email],
    };
    const response = query(sqlquery);
    return response;
};

const registerDB = async (data) => {
    const { name, email, password } = data;
    const sqlquery = {
        text: "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *",
        values: [name, email, password],
    };
    const response = query(sqlquery);
    return response;
};

module.exports = {
    loginDB,
    registerDB,
};
