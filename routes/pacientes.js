const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.get('/nuevo', pacienteController.mostrarFormulario);
router.post('/', pacienteController.registrarPaciente);

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

router.get('/listado', async (req, res) => {
  const { Paciente, Internacion, Cama, Habitacion, Ala } = require('../models');
  const { Op } = require('sequelize');
  const { q, filtro } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;

  try {
    let whereClause = {};
    if (q) {
      whereClause = {
        [Op.or]: [
          { nombre: { [Op.like]: `%${q}%` } },
          { dni: { [Op.like]: `%${q}%` } }
        ]
      };
    }

    const includeInternacion = {
      model: Internacion,
      required: filtro === 'internados' ? true : false,
      where: filtro === 'internados'
        ? { estado: 'activa' }
        : filtro === 'no_internados'
        ? { estado: { [Op.ne]: 'activa' } }
        : undefined,
      include: {
        model: Cama,
        include: {
          model: Habitacion,
          include: Ala
        }
      }
    };

    const pacientes = await Paciente.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      include: includeInternacion
    });

    res.render('pacientes_listado', {
      pacientes: pacientes.rows,
      total: pacientes.count,
      currentPage: page,
      totalPages: Math.ceil(pacientes.count / limit),
      query: q,
      filtro
    });
  } catch (err) {
    console.error(err);
    res.render('error', { mensaje: 'Error al obtener lista de pacientes' });
  }
});

router.get('/editar/:id', async (req, res) => {
  const { Paciente } = require('../models');
  const paciente = await Paciente.findByPk(req.params.id);

  if (!paciente) {
    return res.render('error', { mensaje: 'Paciente no encontrado para editar.' });
  }

  res.render('pacientes_editar', { paciente });
});

router.post('/editar/:id', async (req, res) => {
  const { Paciente } = require('../models');
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) return res.render('error', { mensaje: 'Paciente no encontrado para editar.' });

    await paciente.update(req.body);

    res.render('exito', {
      mensaje: 'Datos del paciente actualizados correctamente',
      resumenId: paciente.id
    });
  } catch (err) {
    console.error(err);
    res.render('error', { mensaje: 'Error al editar paciente.' });
  }
});

router.post('/eliminar/:id', async (req, res) => {
  const { Paciente } = require('../models');
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) return res.render('error', { mensaje: 'Paciente no encontrado para eliminar.' });

    await paciente.destroy();

    res.redirect('/pacientes/listado');
  } catch (err) {
    console.error(err);
    res.render('error', { mensaje: 'Error al eliminar paciente.' });
  }
});

module.exports = router;
