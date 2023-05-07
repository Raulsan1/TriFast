const express = require('express');
const router = express.Router();

const seguimiento = require('../controllers/seguimiento.controller');

router.get('/', seguimiento.getSeguimientos);

module.exports = router;