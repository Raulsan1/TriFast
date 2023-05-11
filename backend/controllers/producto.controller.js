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

module.exports = productoController;