const express = require("express");
const expressFileUpload = require("express-fileupload");
const router = express.Router();
const {
    usersIndex,
    usersCreate,
    usersUpdate,
    usersDelete,
} = require("../controllers/users.controller");
const { login, register } = require("../controllers/auth.controller");

router.use(
    expressFileUpload({
        abortOnLimit: true,
    })
);

/*AUTH ROUTES*/
router.post("/login", login);
router.post("/register", register);

/*USERS ROUTES*/
router.get("/users", usersIndex);
router.post("/users", usersCreate);
router.put("/users/:id", usersUpdate);
router.delete("/users/:id", usersDelete);

module.exports = router;
