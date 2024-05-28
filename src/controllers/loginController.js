const bcrypt = require("bcrypt");
const { request } = require("express");
const connection = require("express-myconnection");

function login(req, res) {
    if (req.session.loggedin != true){
        res.render("login/index");
    }else{
        res.redirect('/')
    }
  
}
/*probar methodo*/
function auth(req, res) {
  const data = req.body;
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT * FROM usuario WHERE email = ?",
      [data.email],
      (err, usuariodata) => {
        if (usuariodata.length > 0) {
          usuariodata.forEach((element) => {
            bcrypt.compare(data.password, element.password, (err, isMatch) => {
              if (!isMatch) {
                res.render("login/index", {
                  error: "Error Contraseña incorrecta"});
              } else {
                req.session.loggedin = true ;
                req.session.nombre = element.nombre;

                res.redirect('/');
              }
            });
          });
        } else {
          res.render("login/index", {
            error: "Error usuario no registrado" });
        }
      }
    );
  });
}/*fin probar*/

/*agregado recinete*/
function auth(req, res) {
  const data = req.body;
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT * FROM usuario WHERE email = ?",
      [data.email],
      (err, usuariodata) => {
        if (usuariodata.length > 0) {
          usuariodata.forEach((element) => {
            bcrypt.compare(data.password, element.password, (err, isMatch) => {
              if (!isMatch) {
                res.status(401).json({ error: "Contraseña incorrecta" });
              } else {
                req.session.loggedin = true;
                req.session.nombre = element.nombre;
                res.json({ message: "Autenticación exitosa", nombre: element.nombre });
              }
            });
          });
        } else {
          res.status(404).json({ error: "Usuario no registrado" });
        }
      }
    );
  });
}
/*hasta aqui*/

function registro(req, res) {
    if (req.session.loggedin != true){
        res.render("login/registro");
    }else{
        res.redirect('/')
    }
}

/*probar2*/function storeUser(req, res) {
  const data = req.body;

  req.getConnection((err, conn) => {
    conn.query(
      "SELECT * FROM usuario WHERE email = ?",
      [data.email],
      (err, usuariodata) => {
        if (usuariodata.length > 0) {
          res.render("login/registro", {
            error: "Error usuario ya registrado",
          });
        } else {
          bcrypt.hash(data.password, 12).then((hash) => {
            data.password = hash;

            req.getConnection((err, conn) => {
              conn.query("INSERT INTO usuario SET ?", [data], (err, rows) => {
                
                req.session.loggedin = true ;
                req.session.nombre = data.nombre;
                res.redirect("/");
              });
            });
          });
        }
      }
    );
  });
}/*fin probar2*/

/*nueva agregado*/
function storeUser(req, res) {
  const data = req.body;

  req.getConnection((err, conn) => {
    conn.query(
      "SELECT * FROM usuario WHERE email = ?",
      [data.email],
      (err, usuariodata) => {
        if (usuariodata.length > 0) {
          res.status(409).json({ error: "Usuario ya registrado" });
        } else {
          bcrypt.hash(data.password, 12).then((hash) => {
            data.password = hash;

            req.getConnection((err, conn) => {
              conn.query("INSERT INTO usuario SET ?", [data], (err, rows) => {
                req.session.loggedin = true;
                req.session.nombre = data.nombre;
                res.status(201).json({ message: "Usuario registrado exitosamente" });
              });
            });
          });
        }
      }
    );
  });
}
/*hasta aqui*/


function logout(req, res) {
    if(req.session.loggedin == true){
        req.session.destroy();

    }
    res.redirect('/login');
}

module.exports = {
  login,
  registro,
  storeUser,
  auth,
  logout,
};
