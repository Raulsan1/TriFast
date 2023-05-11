const express = require('express');
const router = express.Router();

const historial = require('../controllers/historial.controller');

router.get('/producto/:id', historial.getHistorialProducto);
router.get('/', historial.getHistorial);

module.exports = router;