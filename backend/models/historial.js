const mongoose = require('mongoose');
const {Schema} = mongoose;

const HistorialPreciosSchema = new Schema({
    id_producto: {type: String, required: true},
    precio: {type: String, required: true},
    fecha: {type: Date, required: true}
});

module.exports = mongoose.model('Historial', HistorialPreciosSchema);