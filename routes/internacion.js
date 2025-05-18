const express = require('express');
const router = express.Router();
const internacionController = require('../controllers/internacionController');

router.get('/asignar/:pacienteId', internacionController.mostrarFormularioAsignacion);
router.post('/asignar/:pacienteId', internacionController.asignarCama);
router.post('/cancelar/:pacienteId', internacionController.cancelarAdmision);
router.post('/alta/:pacienteId', internacionController.darDeAlta);

module.exports = router;
