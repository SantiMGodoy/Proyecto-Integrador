const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.get('/nuevo', pacienteController.mostrarFormulario);
router.post('/', pacienteController.registrarPaciente);

module.exports = router;
