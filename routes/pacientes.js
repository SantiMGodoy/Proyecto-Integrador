const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.get('/nuevo', pacienteController.mostrarFormulario);
router.post('/', pacienteController.registrarPaciente);

module.exports = router;

router.get('/internados', async (req, res) => {
  const { Paciente, Internacion, Cama, Habitacion, Ala } = require('../models');

  try {
    const internaciones = await Internacion.findAll({
      where: { estado: 'activa' },
      include: [
        {
          model: Paciente
        },
        {
          model: Cama,
          include: {
            model: Habitacion,
            include: Ala
          }
        }
      ]
    });

    res.render('lista_internados', { internaciones });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener pacientes internados');
  }
});
