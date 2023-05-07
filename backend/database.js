/**************     Configuracion de la base de datos     ****************/
const mongoose = require('mongoose');
const URI = 'mongodb://127.0.0.1:27017/TriFast';

mongoose.connect(URI)
    .then(db => console.log('Base de datos conectada'))
    .catch(err => console.error(err));

module.exports = mongoose;