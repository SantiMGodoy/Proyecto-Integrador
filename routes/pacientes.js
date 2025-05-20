const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

// Rutas controladas por archivo pacienteController.js
router.get('/nuevo', pacienteController.mostrarFormulario);
router.post('/', pacienteController.registrarPaciente);

// Listado de pacientes internados
router.get('/internados', async (req, res) => {
  const { Paciente, Internacion, Cama, Habitacion, Ala } = require('../models');

  try {
    const internaciones = await Internacion.findAll({
      where: { estado: 'activa' },
      include: [
        { model: Paciente },
        { model: Cama, include: { model: Habitacion, include: Ala } }
      ]
    });

    res.render('lista_internados', { internaciones });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener pacientes internados');
  }
});

// Gestión rápida por ID
router.get('/opciones', async (req, res) => {
  const id = req.query.id;
  const { Paciente } = require('../models');

  try {
    const paciente = await Paciente.findByPk(id);
    if (!paciente) return res.status(404).send('Paciente no encontrado');

    res.render('panel_paciente', { paciente });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al cargar opciones del paciente');
  }
});

module.exports = router;
