const Proyecto = require('../modelo/Proyecto')
// verificar resultado de validacion
const {validationResult} = require('express-validator')
exports.crearProyecto = async(req, res) => {
     // revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()) return res.status(400).json({errores:errores.array()})
    try {
        // crea el nuevo proyecto
        const proyecto = new Proyecto(req.body)
        // se obtiene el id del payload del token
        proyecto.creador = req.usuario.id
        await proyecto.save()
        res.json(proyecto)
    } catch (e) {
        console.log(e)
        res.status(500).send({msg:"Hubo un error"})
    } 
}
// Obtiene los proyectos del usuario actual
exports.obtenerProyectos = async(req, res) => {
    try {
        const proyectos = await Proyecto.find({creador: req.usuario.id})
        res.json({proyectos})
    } catch (e) {
        console.log(e)
        res.status(500).send({msg:"Hubo un error"})
    } 
}
// actualiza un proyecto
exports.actualizarProyecto = async(req, res) => {
    // revisar si hay errores
   const errores = validationResult(req)
   if(!errores.isEmpty()) return res.status(400).json({errores:errores.array()})
   const {nombre} = req.body
   const nuevoProyecto = {}
   if (nombre){
     nuevoProyecto.nombre = nombre
   }
   try {
    //    // crea el nuevo proyecto
    //    const proyecto = new Proyecto(req.body)
    //    // se obtiene el id del payload del token
    //    proyecto.creador = req.usuario.id
    //    await proyecto.save()
    //    res.json(proyecto)
    // revisar el ID
    let proyecto = await Proyecto.findById(req.params.id)
    // si el proyecto existe o no
    if (!proyecto) return res.status(404).json({msg:"Proyecto no Existe"})
    // verifcar el creador del proyecto
    if(proyecto.creador.toString() !== req.usuario.id){
       return res.status(401).json({msg:'No autorizado'})
    }
    // actualizar
    proyecto = await Proyecto.findByIdAndUpdate({_id: req.params.id},{$set : nuevoProyecto}, {new: true})
    res.json({proyecto})
   } catch (e) {
       console.log(e)
       res.status(500).send({msg:"Error en el servidor"})
   } 
}
// eliminar proyecto actual
exports.eliminarProyectos = async(req, res) => {
  try {
    // revisar el ID
    let proyecto = await Proyecto.findById(req.params.id)
    // si el proyecto existe o no
    if (!proyecto) return res.status(404).json({msg:"Proyecto no Existe"})
    // verifcar el creador del proyecto
    if(proyecto.creador.toString() !== req.usuario.id){
        return res.status(401).json({msg:'No autorizado'})
    }
    // eliminar el proyecto
    await Proyecto.findByIdAndRemove({_id:req.params.id})
    res.json({msg:`Proyecto:${req.params.id} eliminado`})
  } catch (e) {
    console.log(e)
    res.status(500).send({msg:"Error en el servidor"})
  }
  
}