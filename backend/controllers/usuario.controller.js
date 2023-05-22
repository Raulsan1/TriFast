const Usuario = require('../models/usuario'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// Configuracion del transporte de correo
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'trifastcomparador@gmail.com', 
    pass: 'cygdczmgbioupdzs'
  }
});

const usuarioController = {}

usuarioController.login = async (req, res) => {

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
            tipo: "normal"
        });
    
        try {
            const usuarioGuardado = await nuevoUsuario.save();
            jwt.sign({_id: usuarioGuardado._id}, 'secretKey',{expiresIn: '86400s'}, (err, token) => {
                // Después de que un usuario se registre correctamente
                const correoDestino = usuarioGuardado.email;
                const asunto = 'Bienvenido a TriFast';
                const contenido = '¡Gracias por registrarte en nuestra página web!';

                enviarNotificacion(correoDestino, asunto, contenido);
                res.status(200).json(token);
            });
        } catch (error) {
            res.status(400).json({ mensaje: error.message });
        }
    }else{
        res.status(400).json({ mensaje: "Ya existe un usuario con el correo introducido" });
    }
}

function enviarNotificacion(correoDestino, asunto, contenido) {
    const mailOptions = {
      from: 'trifastcomparador@gmail.com',
      to: correoDestino,
      subject: asunto,
      text: contenido
    };
  
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Correo enviado: ' + info.response);
      }
    });
}

module.exports = usuarioController;