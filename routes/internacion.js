const express = require('express');
const router = express.Router();
const internacionController = require('../controllers/internacionController');
const emergenciaController = require('../controllers/emergenciaController');


router.get('/asignar/:pacienteId', internacionController.mostrarFormularioAsignacion);
router.post('/asignar/:pacienteId', internacionController.asignarCama);
router.post('/cancelar/:pacienteId', internacionController.cancelarAdmision);
router.post('/alta/:pacienteId', internacionController.darDeAlta);
router.get('/higienizar/:id', internacionController.higienizarCama);
router.get('/camas', internacionController.mostrarEstadoCamas);
router.get('/finalizar/:camaId', internacionController.finalizarAsignacion);
router.get('/activar', emergenciaController.registroEmergencia);
router.post('/finalizar/:camaId', internacionController.finalizarAsignacion);

module.exports = router;
