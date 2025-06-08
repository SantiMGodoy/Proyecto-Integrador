const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.get('/nuevo', pacienteController.mostrarFormulario);
router.post('/', pacienteController.registrarPaciente);
router.get('/opciones', pacienteController.panelPaciente);
router.get('/listado', pacienteController.listarPacientes);
router.get('/editar/:id', pacienteController.mostrarFormularioEditar);
router.post('/editar/:id', pacienteController.editarPaciente);
router.post('/eliminar/:id', pacienteController.eliminarPaciente);

module.exports = router;
