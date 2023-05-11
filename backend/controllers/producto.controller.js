const Producto = require('../models/producto'); 
const axios = require('axios');

const productoController = {}

//recupera todos los productos de la base de datos
productoController.getProductos = async (req, res) =>{
    const productos = await Producto.find();
    res.json(productos);
}

//recupero el producto indicado por parametro
productoController.getProducto = async (req, res) => {
    const producto = await Producto.findById(req.params.id);
    res.json(producto);
}
productoController.getProductoCategoria = async (req, res) => {
    const producto = await Producto.find({categoria: req.params.categoria});
    console.log(producto);
    res.json(producto);
}


let iteradorProductos = 0;

//funcion que se ejecuta cada cierto tiempo para comprobar los precios de los productos
/*
actualizarProducto = async () =>{

    const numProductos = await Producto.countDocuments();   //numero de productos en la base de datos
    let producto = new Producto();

    if(iteradorProductos < numProductos) {
        producto = await Producto.findOne().skip(iteradorProductos).exec(); //recupero el producto
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
            country: 'spain'
        },
        headers: {
            'X-RapidAPI-Key': '570a3c45a3mshbd067cf0a53628bp1759bajsn58c188faeb8a',
            'X-RapidAPI-Host': 'ebay-data-scraper.p.rapidapi.com'
        }
    };

    try {
        const productoApi = await axios.request(options); //peticion a la api
        console.log(productoApi.data);

        //cambio el precio en caso de que sea distinto y guardo cambios en la base de datos
        if (productoApi.data.price != producto.precio){
            console.log("Actualizando el precio de "+producto.precio+" a "+productoApi.data.price);
            producto.precio = productoApi.data.price;
            await producto.save();
        }

    } catch (error) {
        console.error(error);
    }

    console.log("Actualizando producto "+producto.id_producto);
    
}
*/
//setInterval(actualizarProducto, 24*60*60);
//setInterval(actualizarProducto, 60*60);

module.exports = productoController;