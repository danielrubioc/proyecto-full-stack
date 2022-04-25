require("dotenv").config();
const { query } = require("./db");

const productsIndexDB = async (category_id) => {
    const sqlquery = {
        text: "SELECT * FROM products WHERE category_id = $1 ORDER BY id",
        values: [category_id],
    };
    const response = query(sqlquery);
    return response;
};

const productsCreateDB = async (data) => {
    const {
        name,
        description,
        normal_price,
        discount_price,
        image,
        visible,
        category_id,
    } = data;
    const sqlquery = {
        text: "INSERT INTO products (name, description, normal_price, discount_price, image, visible, category_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
        values: [
            name,
            description,
            normal_price,
            discount_price,
            image,
            visible,
            category_id,
        ],
    };
    const response = query(sqlquery);
    return response;
};

const productsDeleteDB = async (product_id) => {
    const sqlquery = {
        text: "DELETE FROM products WHERE id=$1 RETURNING*;",
        values: [product_id],
    };
    const response = query(sqlquery);
    return response;
};

const productsUpdateDB = async (data) => {
    const {
        product_id,
        name,
        description,
        normal_price,
        discount_price,
        image,
        visible,
    } = data;
    const sqlquery = {
        text: "UPDATE products SET name = $2, description = $3, normal_price = $4, discount_price = $5, image = $6, visible = $7 WHERE id = $1 RETURNING*;",
        values: [
            product_id,
            name,
            description,
            normal_price,
            discount_price,
            image,
            visible,
        ],
    };
    const response = query(sqlquery);
    return response;
};

const productGetDB = async (id) => {
    const sqlquery = {
        text: "SELECT * FROM products where id= $1;",
        values: [id],
    };
    const response = query(sqlquery);
    return response;
};

module.exports = {
    productsIndexDB,
    productsCreateDB,
    productsDeleteDB,
    productsUpdateDB,
    productGetDB,
};
