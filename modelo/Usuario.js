const mongoose = require('mongoose')

// se crea un objeto schema para un modelo
const UsuarioSchema = mongoose.Schema({
    nombre: {
        type:String,
        required:true,
        trim:true
    },
    email: {
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password: {
        type:String,
        required:true,
        trim:true
    },
    registro: {
        type:Date,
        default:Date.now()
    }
}) 
// se crea y se exporta el modelo con el schema definido
module.exports = mongoose.model("Usuario",UsuarioSchema)