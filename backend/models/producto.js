const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductoEbaySchema = new Schema({
    id_producto: {type: String, required: true},
    nombre: {type: String},
    condicion: {type: String},
    precio: {type: String},
    descuento: {type: String},
    localizacion_producto: {type: String},
    envio: {type: String},
    descripcion: {type: String},
    potencial: {type: String},
    link: {type: String},
    img: {type: String},
    tienda: {type: String},
    categoria: {type: String},
});

module.exports = mongoose.model('Producto', ProductoEbaySchema);