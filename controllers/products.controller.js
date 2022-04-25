const { nanoid } = require("nanoid");
const path = require("path");
const fs = require("fs");
const {
    productsIndexDB,
    productsCreateDB,
    productsDeleteDB,
    productsUpdateDB,
    productGetDB,
} = require("../database/products.db");

const productsIndex = async (req, res) => {
    const { category_id } = req.params;
    const response = await productsIndexDB(category_id);
    if (!response.ok) {
        return res.status(500).json({ ok: false, msg: response.msg });
    }
    return res.json({ ok: true, data: response.datas });
};

const productsCreate = async (req, res) => {
    const { name, description, normal_price, discount_price, visible } =
        req.body;
    const user_id = req.userID;
    const { category_id, menu_id } = req.params;

    const { image } = req.files;
    const pathFoto = `${nanoid()}.${image.mimetype.split("/")[1]}`;
    const response = await productsCreateDB({
        name,
        description,
        normal_price,
        discount_price,
        image: pathFoto,
        visible,
        category_id,
    });

    // guardar img
    image.mv(path.join(__dirname, "../public/products/", pathFoto), (err) => {
        if (err) throw new Error("No se puede guardar la img");
    });

    if (!response.ok) {
        return res.status(500).json({ ok: false, msg: response.msg });
    }
    return res.json({ ok: true, data: response.datas });
};

const productsDelete = async (req, res) => {
    const { product_id } = req.params;
    const { datas } = await productGetDB(product_id);

    if (datas.lenght > 0) {
        const imageBD = datas[0].image;
        fs.unlink(
            path.join(__dirname, "../public/products/", imageBD),
            (err) => {
                console.log("fallo eliminar archivo", err);
            }
        );
    }
    const response = await productsDeleteDB(product_id);
    if (!response.ok) {
        return res.status(500).json({ ok: false, msg: response.msg });
    }
    return res.json({ ok: true, data: response.datas });
};

const productsUpdate = async (req, res) => {
    const { product_id, category_id } = req.params;
    const { name, description, normal_price, discount_price, visible } =
        req.body;
    const { image } = req.files ? req.files : { image: null };
    let path_image = "";
    const { datas } = await productGetDB(product_id);
    const imageBD = datas.length > 0 ? datas[0].image : "";

    if (image !== null) {
        const pathFoto = `${nanoid()}.${image.mimetype.split("/")[1]}`;
        path_image = pathFoto;

        fs.unlink(
            path.join(__dirname, "../public/products/", imageBD),
            (err) => {
                console.log("fallo eliminar archivo", err);
            }
        );

        // guardar img
        image.mv(
            path.join(__dirname, "../public/products/", pathFoto),
            (err) => {
                if (err) throw new Error("No se puede guardar la img");
            }
        );
    } else {
        path_image = imageBD;
    }

    const response = await productsUpdateDB({
        product_id,
        name,
        description,
        normal_price,
        discount_price,
        image: path_image,
        visible,
        category_id,
    });
    if (!response.ok) {
        return res.status(500).json({ ok: false, msg: response.msg });
    }
    return res.json({ ok: true, data: response.datas });
};

module.exports = {
    productsIndex,
    productsCreate,
    productsDelete,
    productsUpdate,
};
