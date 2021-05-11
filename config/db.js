// importar el  orm de mongoDB
const mongoose = require('mongoose')
// importar variables de entorno con la cadena de coneccion a la basedatos de mongodb
require('dotenv').config({path:'variables.env'})
// funcion de coneccion a la DB
const conectarDB = async() => {
    try {
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        })
        console.log('BaseDato conectada...')

    } catch (e) {
        console.log(e)
        process.exit(1)// detener la app
    }
}
// exporta variable de coneccion
module.exports = conectarDB



