const Tarea = require('../modelo/Tarea')
const Proyecto = require('../modelo/Proyecto')
// verificar resultado de validacion
const {validationResult} = require('express-validator')
exports.crearTarea = async(req, res) => {
     // revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()) return res.status(400).json({errores:errores.array()})
    const {proyecto} = req.body
    console.log(req.body);
    try {
      const existeProyecto = await Proyecto.findById(proyecto)
      if(!existeProyecto) 
         return res.status(404).json({msg:"Proyecto no Existe"})
      // verificar si el proyecto pertenece al usuario autentificado
      if(existeProyecto.creador.toString() !== req.usuario.id)
         return res.status(401).json({msg:'No autorizado'})

      const tarea = new Tarea(req.body)
      await tarea.save()
      res.json({tarea})
  
  } catch (e) {
      console.log(e)
      res.status(500).send({msg:"Hubo un error"})
  } 
    // try {
    //     // crea  nueva tarea
    //     const proyecto = new Proyecto(req.body)
    //     // se obtiene el id del payload del token
   
    // } catch (e) {
    //     console.log(e)
    //     res.status(500).send({msg:"Hubo un error"})
    // } 
}
// Obtiene las tarea del proyecto actual
exports.obtenerTareas = async(req, res) => {
    try {
      console.log("entro a tareas");
        // const {proyecto} = req.body
        const {proyecto} = req.query // pq se lo envia como params
        const existeProyecto = await Proyecto.findById(proyecto)
        if(!existeProyecto) 
          return res.status(404).json({msg:"Proyecto no Existe"})
        // verificar si el proyecto pertenece al usuario autentificado
        if(existeProyecto.creador.toString() !== req.usuario.id)
          return res.status(401).json({msg:'No autorizado'})
        console.log("entro a tareas");
        const tareas = await Tarea.find({proyecto}).sort({creado:-1})
        console.log("salgo tareas");
        res.json({tareas})

    } catch (e) {
        console.log(e)
        res.status(500).send({msg:"Hubo un error"})
    } 
}
// actualiza una tarea
exports.actualizarTarea = async(req, res) => {
   try {
    const {proyecto,nombre,estado} = req.body
    // verifica la tarea
    let tarea = await Tarea.findById(req.params.id)
    if(!tarea) 
      return res.status(404).json({msg:"Tarea no Existe"})
    // verificar si el proyecto pertenece al usuario autentificado
    const existeProyecto = await Proyecto.findById(proyecto)
    if(existeProyecto.creador.toString() !== req.usuario.id)
      return res.status(401).json({msg:'No autorizado'})
    // crear un objeto con la nueva informacion
    const nuevaTarea={}
    nuevaTarea.nombre=nombre
    nuevaTarea.estado=estado
    // if(nombre) nuevaTarea.nombre=nombre
    // if(estado) nuevaTarea.estado=estado
    // actualizar la tarea
    tarea = await Tarea.findByIdAndUpdate({_id: req.params.id},{$set : nuevaTarea}, {new: true})
    res.json({tarea})
   } catch (e) {
       console.log(e)
       res.status(500).send({msg:"Error en el servidor"})
   } 
}
// eliminar tarea actual
exports.eliminarTarea = async(req, res) => {
  try {
    //const {proyecto} = req.body
    const {proyecto} = req.query
    // verifica la tarea
    let tarea = await Tarea.findById(req.params.id)
    if(!tarea) 
      return res.status(404).json({msg:"Tarea no Existe"})
    // verificar si el proyecto pertenece al usuario autentificado
    const existeProyecto = await Proyecto.findById(proyecto)
    if(existeProyecto.creador.toString() !== req.usuario.id)
      return res.status(401).json({msg:'No autorizado'})
  
    // eliminar el proyecto
    await Tarea.findByIdAndRemove({_id:req.params.id})
    res.json({msg:`Tarea:${req.params.id} eliminado`})
    
   } catch (e) {
       console.log(e)
       res.status(500).send({msg:"Error en el servidor"})
   }
  
  
}