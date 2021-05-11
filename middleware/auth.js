const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    // leer el token dell header
    const token = req.header('x-auth-token')
    console.log("token",token);
    // revisar si no hay token
    if(!token){
      return res.status(401).json({msg:'No hay token, permiso no válido'})  
    }
    // validad el token
    try {
       const cifrado=jwt.verify(token,process.env.SECRETA)
       req.usuario = cifrado.usuario
       next() // se va al siguiente middleware
    } catch (e) {
        res.status(401).json({msg:'Token no válido'}) 
    }
}