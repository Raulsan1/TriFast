const express = require('express');
const router = express.Router();

const producto = require('../controllers/producto.controller');

router.get('/', producto.getProductos);
router.get('/:id', producto.getProducto);
router.get('/categoria/:categoria',producto.getProductoCategoria);

module.exports = router;