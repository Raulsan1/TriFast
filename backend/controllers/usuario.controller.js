const Usuario = require('../models/usuario'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const usuarioController = {}

usuarioController.login = async (req, res) => {
    console.log(req.body);

    // Buscar el usuario en la base de datos por correo electrónico
    const usuario = await Usuario.findOne({ correo_electronico: req.body.correo_electronico });
    console.log(usuario.password);

    if (!usuario) {
        return res.status(401).json({ mensaje: 'Correo electrónico o contraseña incorrecta.' });
    }

    // Comparar la contraseña proporcionada por el usuario con la contraseña almacenada en la base de datos
    const contrasenaValida = await bcrypt.compare(req.body.password, usuario.password);

    if (!contrasenaValida) {
        return res.status(401).json({ mensaje: 'Correo electrónico o contraseña incorrecta.' });
    }

    jwt.sign({user: req.body}, 'secretKey',{expiresIn: '86400s'}, (err, token) => {
        res.json(token);
    });
}

usuarioController.register = async (req, res) => {


    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const nuevoUsuario = new Usuario({
        nombre: "raul",
        correo_electronico: "raul@gmail.com",
        password: hashedPassword,
        tipo: "admin",
        productos_seguidos: []
    });

    try {
        const usuarioGuardado = await nuevoUsuario.save();
        res.status(201).json(usuarioGuardado);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
    
}

module.exports = usuarioController;