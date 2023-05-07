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
        }
    });
}

// Authorization: Bearer <token>
function verifyToken (req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next;
    }else{
        res.sendStatus(403);
    }
}

module.exports = seguimientoController;