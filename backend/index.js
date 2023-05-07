const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const {mongoose} = require('./database');


// Configuracion
app.set('port', process.env.PORT || 3000);


// Middlewares
app.use(morgan('dev'));
app.use(express.json()); //Ayuda al servidor a entender los datos en formato json
app.use(cors({origin: 'http://localhost:4200'}));



// Routes
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/productos/:producto', require('./routes/productos.routes'));
app.use('/api', require('./routes/usuarios.routes'));
app.use('/api/seguimientos', require('./routes/seguimientos.routes'));

// Inicia el servidor
app.listen(app.get('port'), () =>{
    console.log('Servidor en el puerto '+app.get('port'));
});