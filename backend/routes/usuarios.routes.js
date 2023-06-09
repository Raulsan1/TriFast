const express = require('express');
const router = express.Router();

const usuario = require('../controllers/usuario.controller');

router.post('/login', usuario.login);
router.post('/register', usuario.register);

module.exports = router;