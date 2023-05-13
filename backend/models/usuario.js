const mongoose = require('mongoose');
const {Schema} = mongoose;

const UsuarioSchema = new Schema({
    nombre: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    tipo: {type: String, required: true},
    productos_seguidos: {type: Array}
});

module.exports = mongoose.model('Usuario', UsuarioSchema);