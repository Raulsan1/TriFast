const Usuario = require('../models/usuario'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const usuarioController = {}

usuarioController.login = async (req, res) => {
    console.log(req.body);

    // Buscar el usuario en la base de datos por correo electrónico
    const usuario = await Usuario.findOne({ email: req.body.email });

    if (!usuario) {
        return res.status(401).json({ mensaje: 'Correo electrónico o contraseña incorrecta.' });
    }

    // Comparar la contraseña proporcionada por el usuario con la contraseña almacenada en la base de datos
    const contrasenaValida = await bcrypt.compare(req.body.password, usuario.password);

    if (!contrasenaValida) {
        return res.status(401).json({ mensaje: 'Correo electrónico o contraseña incorrecta.' });
    }

    jwt.sign({_id: usuario._id}, 'secretKey',{expiresIn: '86400s'}, (err, token) => {
        res.status(200).json(token);
    });
}

usuarioController.signup = async (req, res) => {


    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const usuario = await Usuario.findOne({ email: req.body.email });

    if(usuario == null){
        const nuevoUsuario = new Usuario({
            nombre: req.body.nombre,
            email: req.body.email,
            password: hashedPassword,
            tipo: "normal",
            productos_seguidos: []
        });
    
        try {
            const usuarioGuardado = await nuevoUsuario.save();
            jwt.sign({_id: usuarioGuardado._id}, 'secretKey',{expiresIn: '86400s'}, (err, token) => {
                res.status(200).json(token);
            });
        } catch (error) {
            res.status(400).json({ mensaje: error.message });
        }
    }else{
        res.status(400).json({ mensaje: "Ya existe un usuario con el correo introducido" });
    }
}

module.exports = usuarioController;