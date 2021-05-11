const Usuario = require('../modelo/Usuario')
// encriptacion de codigo
const bcryptjs = require('bcryptjs')
// validacion personalizada
const {validationResult} = require('express-validator')
// web token
const jwt = require('jsonwebtoken')
exports.crearUsuario = async(req, res) => {
    //request es lo que el usuario solicita(datos del cliente)
    //response lo que el servidor responde (datos de la respuesta)
    //console.log(req.body);
    // revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()) return res.status(400).json({errores:errores.array()})
    const {email,password} = req.body
    try {
        // revisar que el mail sea unico
        let usuario = await Usuario.findOne({email})
        if (usuario) return res.status(400).json({msg:'El usuario ya existe con ese email'})
        // crea el nuevo usuario
        usuario = new Usuario(req.body)
        // hashear el password
        const salt = await bcryptjs.genSalt(10)
        usuario.password= await bcryptjs.hash(password,salt)
        // guardar usuario
        await usuario.save()
        // crear token JWT
        const payload = {usuario:{id:usuario.id}}
        // firmar token JWT
        jwt.sign(payload,process.env.SECRETA,{
            expiresIn: 3600
        },(error,token) => {
          if(error) throw error
          res.json({token})
        })
    } catch (e) {
        console.log(e)
        res.status(400).send({msg:"Hubo un error"})
    }
}
