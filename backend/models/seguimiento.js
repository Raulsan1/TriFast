const mongoose = require('mongoose');
const {Schema} = mongoose;

const SeguimientoSchema = new Schema({
    id_usuario: {type: String, required: true},
    id_producto: {type: String, required: true},
});

module.exports = mongoose.model('Seguimiento', SeguimientoSchema);