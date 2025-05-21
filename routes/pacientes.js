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

router.get('/listado', async (req, res) => {
  const { Paciente, Internacion, Cama, Habitacion, Ala } = require('../models');
  const { Op } = require('sequelize');
  const { q } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
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

    const pacientes = await Paciente.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      include: {
        model: Internacion,
        where: { estado: 'activa' },
        required: false,
        include: {
          model: Cama,
          include: {
            model: Habitacion,
            include: Ala
          }
        }
      }
    });

    res.render('pacientes_listado', {
      pacientes: pacientes.rows,
      total: pacientes.count,
      currentPage: page,
      totalPages: Math.ceil(pacientes.count / limit),
      query: q
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
