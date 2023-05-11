const Historial = require('../models/historial'); 
const Producto = require('../models/producto'); 
const axios = require('axios');
const jwt = require('jsonwebtoken');

const historialController = {}

historialController.getHistorial = async (req, res) => {
    
    const historial = await Historial.find();
    res.json(historial);

}
historialController.getHistorialProducto = async (req, res) => {

    const historial = await Historial.find({id_producto: req.params.id});
    res.json(historial);

}


let iteradorProductos = 0;

//funcion que se ejecuta cada cierto tiempo para comprobar los precios de los productos

actualizarProducto = async (req, res) =>{

    const numProductos = await Producto.countDocuments();   //numero de productos en la base de datos
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

            historial = new Historial({
                id_producto: producto.id_producto,
                precio: producto.precio,
                fecha: new Date()
            });

            await historial.save();
            console.log(historial);
        }else{
            console.log("El id producto no es el mismo");
        }

    } catch (error) {
        console.error(error);
    }

    console.log("Actualizando producto "+producto.id_producto);
    
}

//setInterval(actualizarProducto, 24*60*60);
//setInterval(actualizarProducto, 60*60);


module.exports = historialController;