const express = require("express")
const router = express.Router()
const tareaController = require('../controllers/tareaController')
const auth = require('../middleware/auth')
// escribir  validacion de la vista del endpoint
const {check} = require('express-validator')
// api/tareas
// crea una nueva tarea
router.post('/',
    auth,
    [
      check('nombre','El nombre de la tarea es obligatorio').not().isEmpty(),
      check('proyecto','El proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
  )
  // obtiene todos los tareas
router.get('/',
     auth,
     tareaController.obtenerTareas
)
  // actualizar tarea via ID
router.put('/:id',
    auth,
    tareaController.actualizarTarea
  )
  // eliminar tarea via ID
router.delete('/:id',
    auth,
    tareaController.eliminarTarea
  )

module.exports = router

