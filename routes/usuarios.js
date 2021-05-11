const express = require("express")
// importar el router
const router = express.Router()
const usuarioController = require('../controllers/usuarioController')
// rutina de validacion
const {check} = require('express-validator')

// api/usuarios
// creacion del middleware 
// router.post('/',() => { // sin controlador
//   console.log("creando usuarios...");
// }) 
// crea un usuario con el check
router.post('/',
  [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','Agrega un email válido').isEmail(),
    check('password','El password debe ser minimo de 6 caracteres').isLength({min:6})
  ],
  usuarioController.crearUsuario
)

module.exports = router

