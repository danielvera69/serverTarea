const mongoose = require('mongoose')
// se crea un objeto schema para un modelo Proyecto
const ProyectoSchema = mongoose.Schema({
    nombre: {
        type:String,
        required:true,
        trim:true
    },
    creador: {
        type:mongoose.Schema.Types.ObjectId ,
        ref:'Usuario'
    },
    creado: {
        type:Date,
        default:Date.now()
    }
}) 
// se crea y se exporta el modelo con el schema definido
module.exports = mongoose.model("Proyecto",ProyectoSchema)