const express = require("express");
const expressFileUpload = require("express-fileupload");
const router = express.Router();
const { validateRegister } = require("../middlewares/auth.validations");
const { requireAuth } = require("../middlewares/requireAuth");
const { existsErrors } = require("../middlewares/errors.validations");
const { menuByUser } = require("../middlewares/menuByUser");
const { categoryByUser } = require("../middlewares/cotegoryByUser");
const {
    usersIndex,
    usersCreate,
    usersUpdate,
    usersDelete,
} = require("../controllers/users.controller");
const {
    menusIndex,
    menusCreate,
    menusUpdate,
    menusDelete,
    menuById,
    menusDigital,
} = require("../controllers/menus.controller");
const {
    categoriesIndex,
    categoriesCreate,
    categoriesUpdate,
    categoriesDelete,
} = require("../controllers/categories.controller");
const {
    productsIndex,
    productsCreate,
    productsUpdate,
    productsDelete,
} = require("../controllers/products.controller");
const { login, register } = require("../controllers/auth.controller");

router.use(
    expressFileUpload({
        abortOnLimit: true,
    })
);

/*AUTH ROUTES*/
router.post("/login", login);
router.post("/register", [validateRegister, existsErrors], register);

/*USERS ROUTES*/

router.get("/users", requireAuth, usersIndex);
router.post("/users", usersCreate);
router.put("/users/:id", usersUpdate);
router.delete("/users/:id", usersDelete);

/*MENUS ROUTES*/
router.get("/menus", requireAuth, menusIndex);
router.get("/menus/:menu_id", requireAuth, menuById);
router.post("/menus", requireAuth, menusCreate);
router.put("/menus/:menu_id", [requireAuth, menuByUser], menusUpdate);
router.delete("/menus/:menu_id", [requireAuth, menuByUser], menusDelete);
router.get("/menus/:menu_id/menu-digital", menusDigital);

/*CATEGORIES ROUTES*/
router.get(
    "/menus/:menu_id/categories",
    [requireAuth, menuByUser],
    categoriesIndex
);
router.post(
    "/menus/:menu_id/categories",
    [requireAuth, menuByUser],
    categoriesCreate
);
router.put(
    "/menus/:menu_id/categories/:category_id",
    [requireAuth, menuByUser, categoryByUser],
    categoriesUpdate
);
router.delete(
    "/menus/:menu_id/categories/:category_id",
    [requireAuth, menuByUser, categoryByUser],
    categoriesDelete
);

/*PRODUCTS ROUTES*/
router.get(
    "/menus/:menu_id/categories/:category_id/products",
    [requireAuth, menuByUser, categoryByUser],
    productsIndex
);
router.post(
    "/menus/:menu_id/categories/:category_id/products",
    [requireAuth, menuByUser, categoryByUser],
    productsCreate
);
router.put(
    "/menus/:menu_id/categories/:category_id/products/:product_id",
    [requireAuth, menuByUser, categoryByUser],
    productsUpdate
);
router.delete(
    "/menus/:menu_id/categories/:category_id/products/:product_id",
    [requireAuth, menuByUser, categoryByUser],
    productsDelete
);

module.exports = router;
