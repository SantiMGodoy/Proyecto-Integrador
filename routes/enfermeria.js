const express = require('express');
const router = express.Router();
const controller = require('../controllers/enfermeriaController');

router.get('/registrar/:pacienteId', controller.mostrarFormulario);
router.post('/registrar/:pacienteId', controller.registrarEvaluacion);

module.exports = router;
