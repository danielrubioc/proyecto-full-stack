const express = require("express");
const app = express();
const cors = require("cors");
const { engine } = require("express-handlebars");
const PORT = process.env.PORT || 5000;

// habilitar req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handlebars
app.use("/", express.static("public"));
app.use("/", express.static("dist"));
app.engine(".handlebars", engine());
app.set("view engine", ".handlebars");
app.set("views", "./view");
app.use(cors());

app.use("/api/v1/", require("./routes/api.route"));
/* 
app.use("/", require("./routes/public.route")); */

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
});

app.listen(PORT, () => console.log(`SERVER OK http://localhost:${PORT}`));
