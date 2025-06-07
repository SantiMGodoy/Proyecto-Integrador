const express = require('express');
const router = express.Router();
const internacionController = require('../controllers/internacionController');

router.get('/asignar/:pacienteId', internacionController.mostrarFormularioAsignacion);
router.post('/asignar/:pacienteId', internacionController.asignarCama);
router.post('/cancelar/:pacienteId', internacionController.cancelarAdmision);
router.post('/alta/:pacienteId', internacionController.darDeAlta);
router.post('/cama/higienizar/:id', internacionController.higienizarCama);

router.get('/camas', async (req, res) => {
  const { Cama, Habitacion, Ala, Paciente, Internacion } = require('../models');

  try {
    const camas = await Cama.findAll({
      include: {
        model: Habitacion,
        include: [Ala]
      },
      order: [['HabitacionId', 'ASC'], ['numero', 'ASC']]
    });

    const internaciones = await Internacion.findAll({
      where: { estado: 'activa' },
      include: [Paciente, Cama]
    });

    const camaOcupacion = {};
    internaciones.forEach(internacion => {
      camaOcupacion[internacion.CamaId] = internacion.Paciente;
    });

    const mensaje = req.query.msg === 'ok' ? 'Cama higienizada correctamente ✅' : null;

    res.render('camas_estado', {
      camas,
      camaOcupacion,
      mensaje
    });
  } catch (err) {
    console.error(err);
    res.render('error', { mensaje: 'Error al mostrar el estado de camas' });
  }
});

module.exports = router;
