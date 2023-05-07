/**************     Configuracion de la base de datos     ****************/
const mongoose = require('mongoose');
const URI = 'mongodb://127.0.0.1:27017/TriFast';
const URI_ATLAS = 'mongodb+srv://rsaraulsanz:Rw2mchM6Y8HiEqDy@trifast.rhzapec.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(URI_ATLAS)
    .then(db => console.log('Base de datos conectada'))
    .catch(err => console.error(err));

module.exports = mongoose;