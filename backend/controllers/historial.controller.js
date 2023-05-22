const Historial = require('../models/historial'); 
const Producto = require('../models/producto'); 
const Seguimiento = require('../models/seguimiento');
const Usuario = require('../models/usuario');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Configuracion del transporte de correo
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'trifastcomparador@gmail.com', 
    pass: 'cygdczmgbioupdzs'
  }
});

const historialController = {}

historialController.getHistorial = async (req, res) => {
    
    const historial = await Historial.find();
    res.json(historial);

}
historialController.getHistorialProducto = async (req, res) => {

    const historial = await Historial.find({id_producto: req.params.id});
    res.json(historial);

}


let iteradorProductos = 140;

//funcion que se ejecuta cada cierto tiempo para comprobar los precios de los productos

actualizarProducto = async (req, res) =>{

    const numProductos = await Producto.countDocuments({tienda: 'Ebay'});   //numero de productos en la base de datos
    let producto = new Producto();

    if(iteradorProductos < numProductos) {
        producto = await Producto.findOne({tienda: "Ebay"}).skip(iteradorProductos).exec(); //recupero el producto
        console.log(iteradorProductos);
        iteradorProductos++;

    }else{
        iteradorProductos = 0;
    }
    
    //Datos para la conexion con la api de ebay en rapidAPI
    const options = {
        method: 'GET',
        url: 'https://ebay-data-scraper.p.rapidapi.com/products/'+producto.id_producto,
        params: {
            country: ''
        },
        headers: {
            'X-RapidAPI-Key': '570a3c45a3mshbd067cf0a53628bp1759bajsn58c188faeb8a',
            'X-RapidAPI-Host': 'ebay-data-scraper.p.rapidapi.com'
        }
    };

    try {
        const productoApi = await axios.request(options); //peticion a la api

        //cambio el precio en caso de que sea distinto y guardo cambios en la base de datos
        if (productoApi.data.price != producto.precio && productoApi.data.product_id == producto.id_producto){
            console.log("Actualizando el precio de "+producto.precio+" a "+productoApi.data.price);
            producto.precio = productoApi.data.price;
            await producto.save();
            recuperarSeguimientos(producto.id_producto);
            historial = new Historial({
                id_producto: producto.id_producto,
                precio: producto.precio,
                fecha: new Date()
            });

            await historial.save();
            console.log(historial);
            console.log("Actualizado producto "+producto.id_producto);
        }else{
            console.log("El id producto no es el mismo o el precio no ha cambiado");
        }

    } catch (error) {
        console.error(error);
    }
}
//setInterval(actualizarProducto, 24*60*60);
//setInterval(actualizarProducto, 60*60);

async function recuperarSeguimientos (id_producto){
    const seguimientos = await Seguimiento.find({id_producto: id_producto});
    console.log(seguimientos);
    const email = [];
    seguimientos.forEach( async registro => {
        const usuario = await Usuario.find({_id: registro.id_usuario})
        console.log(usuario[0].email);
        const correoDestino = usuario[0].email;
        const asunto = 'Seguimiento del producto '+id_producto;
        const contenido = '¡Un producto que estabas siguiendo ha bajado de precio!. ¡Consulta el nuevo precio en nuestra página web!';
        enviarNotificacion(correoDestino, asunto, contenido);
    });
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

module.exports = historialController;