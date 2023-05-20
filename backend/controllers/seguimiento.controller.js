const Seguimiento = require('../models/seguimiento'); 
const jwt = require('jsonwebtoken');

const seguimientoController = {}

seguimientoController.getSeguimientos = async (req, res) => {
    verifyToken(req,res);
    jwt.verify(req.token, 'secretKey', async (error, authData) => {
        if(!error){
            const seguimientos = await Seguimiento.find({id_usuario: authData._id});
            res.status(200).json(seguimientos);
        }else{
            res.status(400).send("Token invalido");
        }
    });
}

seguimientoController.eliminarSeguimiento = async (req, res) => {
    verifyToken(req,res);
    jwt.verify(req.token, 'secretKey', async (error, authData) => {
        if(!error){
            console.log(req.params.id_producto);
            if(await Seguimiento.findOneAndRemove({id_producto: req.params.id_producto})){
                res.status(200).json({
                    mensaje: "Se ha dejado de seguir el producto",
                    bool: true
                })
            }else{
                res.status(400).json({
                    mensaje: "No se pudo dejar de seguir el producto",
                    bool: false
                })
            }
            
        }else{
            res.status(400).send("Token invalido");
        }
    });
}

seguimientoController.crearSeguimiento = async (req, res) => {
    verifyToken(req, res);
    jwt.verify(req.token, 'secretKey', async (error, authData) => {
        if(!error){
            const seguimiento = await Seguimiento.findOne({id_producto: req.body.id_producto});

            if(seguimiento != null){
                res.status(400).json({
                    mensaje: "Ya estas siguiendo a este producto.",
                    bool: true
                })
            }else{
                const nuevoSeguimiento = new Seguimiento({
                    id_usuario: authData._id,
                    id_producto: req.body.id_producto
                })

                const seguimientoGuardado = await nuevoSeguimiento.save();

                res.status(200).json({
                    seguimiento: seguimientoGuardado,
                    mensaje: "Seguimiento guardado exitosamente"
                })
            }


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