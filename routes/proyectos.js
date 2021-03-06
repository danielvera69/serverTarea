const express = require("express")
const router = express.Router()
const proyectoController = require('../controllers/proyectoController')
const auth = require('../middleware/auth')
// escribir  validacion de la vista del endpoint
const {check} = require('express-validator')
// api/proyectos
// crea un nuevo proeyecto
try {
  
  router.post('/',
    auth,
    [
      check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
  )
  // obtiene todos los proyectos
  router.get('/',
    auth,
    proyectoController.obtenerProyectos
  )
  // actualizar proyecto via ID
  router.put('/:id',
    auth,
    [
      check('nombre','El nombre del proyecto es obligatorip').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
  )
  // eliminar proyecto via ID
  router.delete('/:id',
    auth,
    proyectoController.eliminarProyectos
  )
} catch (error) {
   console.log("error del proyecto",error); 
}

module.exports = router

