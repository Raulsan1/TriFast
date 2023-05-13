const Seguimiento = require('../models/seguimiento'); 
const jwt = require('jsonwebtoken');

const seguimientoController = {}

seguimientoController.getSeguimientos = async (req, res) => {
    verifyToken(req,res);
    jwt.verify(req.token, 'secretKey', (error, authData) => {
        if(!error){
            res.json({
                mensaje: "permiso para mirar los seguimientos",
                authData: authData
            })
        }else{
            res.status(400).send("Token invalido");
        }
    });
}

// Authorization: Bearer <token>
function verifyToken (req, res) {

    if(!req.headers.authorization){
        return res.status(401).send("No autorizado");
    }

    const bearerToken = req.headers.authorization.split(" ")[1];

    if(bearerToken === null){
        return res.status(401).send("No autorizado");
    }

    req.token = bearerToken;
}

module.exports = seguimientoController;