// importar el framework express
const express = require('express')
// importa la coneccion a la DB
const conectarDB = require('./config/db')
// importar cors para la comunicacion con otro dominio(frontend)
const cors = require('cors')


// crear el servidor
const app = express()
// middlewares
// habilitar espress.json para enviar un json por lo tanto en el header de la peticion: Content-Type:aplication/json. y en el body se seleciona json para escribir los datos a enviar
app.use(express.json({extended:true}))
// habilitar cors
app.use(cors())
// establecer la coneccion a la DB
conectarDB()
// puerto de app. se coloca 4000 para no colisionar con el puerto del cliente que normalmente es 3000
const PORT = process.env.PORT || 4000

// router: definir la pagina principal pero es mejor crear una carpeta aparte
// app.get('/',(req,res) => {
//   res.send({mensaje:'Ok'})
// })
// Middleware de ruttas
// importar las rutas.
app.use('/api/usuarios',require('./routes/usuarios'))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/proyectos',require('./routes/proyectos'))
app.use('/api/tareas',require('./routes/tarea'))
// arrancar el servidor app
app.listen(PORT, () => {
    console.log(`el servidor funcionando en Puerto: ${PORT}`);
})