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
    const producto = await Producto.find({id_producto: req.params.id});
    res.json(producto[0]);
}

productoController.getProductoCategoria = async (req, res) => {
    const regex = new RegExp(req.params.categoria, 'i');
    const producto = await Producto.find({categoria: regex});
    res.json(producto);
}

productoController.getProductoNombre = async (req, res) => {
    const regex = new RegExp(req.params.nombre, 'i');
    const producto = await Producto.find({nombre: regex});
    res.json(producto);
}

productoController.getProductoDescuento = async (req, res) => {
    const productos = await Producto.find({ descuento: { $nin: ["", "uninformed"] } });
    res.json(productos);
}

module.exports = productoController;