const express = require("express");
const { engine } = require("express-handlebars"); /*probar6*/
const myconnection = require("express-myconnection");
const mysql = require("mysql");
const session = require("express-session");
const bodyParser = require("body-parser");

const loginRoutes = require("./routers/login");

const app = express();
app.set("port", 4000);

/*probar3*/
app.set("views", __dirname + "/views");
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
  })
);

/* probar4*/
app.set("view engine", "hbs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(
  myconnection(mysql, {
    host: "localhost",
    user: "root",
    password: "",
    port: "3306",
    database: "nodelogin",
  })
);

app.use(
  session({
    secret: "secret",
    resave: "true",
    saveUninitialized: "true",
  })
);

// Usar las rutas de login
app.use("/api", loginRoutes);

// Endpoint para obtener el perfil del usuario autenticado
app.get("/api/profile", (req, res) => {
  if (req.session.loggedin) {
    res.json({ nombre: req.session.nombre });
  } else {
    res.status(401).json({ error: "Usuario no autenticado" });
  }
});
app.listen(app.get("port"), () => {
  console.log("escuchando un puerto", app.get("port"));
});

//app.use('/', loginRoutes);

/*probar5*/
app.get("/", (req, res) => {
  if (req.session.loggedin == true) {
    res.render("home", { nombre: req.session.nombre });
  } else {
    res.redirect("/login");
  }
});
/*fin probar5*/
