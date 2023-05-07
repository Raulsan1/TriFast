const Usuario = require('../models/usuario'); 
const jwt = require('jsonwebtoken');

const usuarioController = {}

usuarioController.login = async (req, res) => {
    console.log(req.body);

    jwt.sign({user: req.body}, 'secretKey',{expiresIn: '86400s'}, (err, token) => {
        res.json(token);
    });
}

module.exports = usuarioController;