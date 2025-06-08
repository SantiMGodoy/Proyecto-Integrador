const { Paciente, Internacion, Cama, Habitacion, Ala } = require('../models');
const { Op } = require('sequelize');

const mostrarFormulario = (req, res) => {
  res.render('pacientes_nuevo');
};

const registrarPaciente = async (req, res) => {
  try {
    const { nombre, dni, fechaNacimiento, sexo, telefono, direccion, obraSocial, viaIngreso, medicoDerivante } = req.body;

    if (viaIngreso === 'derivacion' && (!medicoDerivante || medicoDerivante.trim() === '')) {
      return res.render('mensaje', {
        tipo: 'error',
        mensaje: 'Debes ingresar el nombre del médico derivante si la vía de ingreso es una derivación médica.'
      });
    }

    let paciente = await Paciente.findOne({ where: { dni } });

    let mensaje;
    if (paciente) {
      await paciente.update({ nombre, fechaNacimiento, sexo, telefono, direccion, obraSocial, viaIngreso, medicoDerivante });
      mensaje = 'Datos del paciente actualizados correctamente.';
    } else {
      paciente = await Paciente.create({ nombre, dni, fechaNacimiento, sexo, telefono, direccion, obraSocial, viaIngreso, medicoDerivante });
      mensaje = 'Paciente registrado correctamente.';
    }

    res.render('mensaje', {
      tipo: 'exito',
      mensaje,
      resumenId: paciente.id
    });
  } catch (error) {
    console.error(error);
    res.render('mensaje', { tipo: 'error', mensaje: 'Error al registrar paciente.' });
  }
};

const panelPaciente = async (req, res) => {
  const id = req.query.id;
  try {
    const paciente = await Paciente.findByPk(id);
    if (!paciente) return res.status(404).send('Paciente no encontrado');
    res.render('panel_paciente', { paciente });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al cargar opciones del paciente');
  }
};

const listarPacientes = async (req, res) => {
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

    const include = [];

    if (filtro) {
      include.push({
        model: Internacion,
        required: filtro === 'internados',
        where: filtro === 'internados'
          ? { estado: 'activa' }
          : filtro === 'no_internados'
          ? { [Op.or]: [{ estado: { [Op.ne]: 'activa' } }, { estado: null }] }
          : {},
        include: {
          model: Cama,
          include: {
            model: Habitacion,
            include: Ala
          }
        }
      });
    } else {
      include.push({
        model: Internacion,
        required: false,
        include: {
          model: Cama,
          include: {
            model: Habitacion,
            include: Ala
          }
        }
      });
    }

    const pacientes = await Paciente.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      include
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
    res.render('mensaje', {
      tipo: 'error',
      mensaje: 'Error al obtener lista de pacientes'
    });
  }
};

const mostrarFormularioEditar = async (req, res) => {
  const paciente = await Paciente.findByPk(req.params.id);
  if (!paciente) {
    return res.render('mensaje', {
      tipo: 'error',
      mensaje: 'Paciente no encontrado para editar.'
    });
  }
  res.render('pacientes_editar', { paciente });
};

const editarPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) {
      return res.render('mensaje', {
        tipo: 'error',
        mensaje: 'Paciente no encontrado para editar.'
      });
    }

    await paciente.update(req.body);

    res.render('mensaje', {
      tipo: 'exito',
      mensaje: 'Datos del paciente actualizados correctamente',
      resumenId: paciente.id
    });
  } catch (err) {
    console.error(err);
    res.render('mensaje', { tipo: 'error', mensaje: 'Error al editar paciente.' });
  }
};

const eliminarPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) {
      return res.render('mensaje', {
        tipo: 'error',
        mensaje: 'Paciente no encontrado para eliminar.'
      });
    }

    await paciente.destroy();

    res.redirect('/pacientes/listado');
  } catch (err) {
    console.error(err);
    res.render('mensaje', { tipo: 'error', mensaje: 'Error al eliminar paciente.' });
  }
};

module.exports = {
  mostrarFormulario,
  registrarPaciente,
  panelPaciente,
  listarPacientes,
  mostrarFormularioEditar,
  editarPaciente,
  eliminarPaciente
};
