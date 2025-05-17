const express = require('express');
const router = express.Router();
const controller = require('../controllers/resumenController');

router.get('/:pacienteId', controller.mostrarResumen);

module.exports = router;
