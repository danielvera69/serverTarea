const Usuario = require('../modelo/Usuario')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.autenticarUsuario = async(req, res) => {
    const errores = validationResult(req)
    if(!errores.isEmpty()) 
      return res.status(400).json({errores:errores.array()})
    // extraer el email y password
    const {email,password} = req.body
    try {
        // revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({email})
        if (!usuario) return res.status(400).json({msg:'El usuario no existe...!!!'})
        
        // Revisar el password
        const passCorrecto= await bcryptjs.compare(password,usuario.password)
        if (!passCorrecto){
            return res.status(400).json({msg:'Password Incorrecto!!!'})
        }
        // si todo es correcto crear y firmar el JWT
        const payload = {usuario:{id:usuario.id}}
        // firmar token JWT
        jwt.sign(payload,process.env.SECRETA,{
            expiresIn: 360000
        },(error,token) => {
          if(error) throw error
          res.json({token})
        })
    } catch (e) {
        console.log(e)
        res.status(500).send({msg:"Hubo un error"})
    }
}
// obtiene que usuario está autentificado
exports.usuarioAutenticado = async(req, res) => {
    try {
        // trae el registro del usuario segun el id, menos el campo password
        const usuario = await Usuario.findById(req.usuario.id).select('-password')
        res.json({usuario})
    } catch (e) {
        console.log(e)
        res.status(500).send({msg:"Hubo un error"})
    }
}