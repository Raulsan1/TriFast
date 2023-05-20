const express = require('express');
const router = express.Router();

const seguimiento = require('../controllers/seguimiento.controller');

router.get('/' ,seguimiento.getSeguimientos);
router.post('/' ,seguimiento.crearSeguimiento);
router.delete('/:id_producto', seguimiento.eliminarSeguimiento);

module.exports = router;