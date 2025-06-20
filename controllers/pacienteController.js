const { Paciente, Internacion, Cama, Habitacion, Ala } = require('../models');
const { Op } = require('sequelize');

const mostrarFormulario = (req, res) => {
  res.render('pacientes_nuevo');
};

const registrarPaciente = async (req, res) => {
  try {
    const { nombre, dni, fechaNacimiento, sexo, telefono, direccion, obraSocial, viaIngreso, medicoDerivante, motivoIngreso } = req.body;

    if (viaIngreso === 'derivacion' && (!medicoDerivante || medicoDerivante.trim() === '')) {
      return res.render('mensaje', {
        tipo: 'error',
        mensaje: 'Debes ingresar el nombre del médico derivante si la vía de ingreso es una derivación médica.'
      });
    }

    let paciente = await Paciente.findOne({ where: { dni } });

    let mensaje;
    if (paciente) {
      await paciente.update({ nombre, fechaNacimiento, sexo, telefono, direccion, obraSocial, viaIngreso, medicoDerivante, motivoIngreso });
      mensaje = 'Datos del paciente actualizados correctamente.';
    } else {
      paciente = await Paciente.create({ nombre, dni, fechaNacimiento, sexo, telefono, direccion, obraSocial, viaIngreso, medicoDerivante, motivoIngreso });
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
    const paciente = await Paciente.findByPk(id, {
      include: [
        {
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
        },
        {
          model: Cama,
          required: false,
          include: {
            model: Habitacion,
            include: Ala
          }
        }
      ]
    });

    if (!paciente) {
      return res.render('mensaje', {
        tipo: 'error',
        mensaje: 'Paciente no encontrado.'
      });
    }

    const internacion = paciente.Internacions?.[0] || null;
    const cama = internacion?.Cama || paciente.Cama || null;

    const evaluacionEnfermeria = await require('../models').EvaluacionEnfermeria?.findOne({ where: { PacienteId: id } });
    const evaluacionMedica = await require('../models').EvaluacionMedica?.findOne({ where: { PacienteId: id } });

    res.render('panel_paciente', {
      paciente,
      internacion,
      cama,
      evaluacionEnfermeria,
      evaluacionMedica
    });
  } catch (err) {
    console.error(err);
    res.render('mensaje', {
      tipo: 'error',
      mensaje: 'Error al cargar opciones del paciente.'
    });
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

    const include = [
      {
        model: Internacion,
        required: false,
        where: { estado: 'activa' },
        include: {
          model: Cama,
          include: {
            model: Habitacion,
            include: Ala
          }
        }
      }
    ];

    const result = await Paciente.findAndCountAll({
      where: whereClause,
      include,
      limit,
      offset,
      distinct: true
    });

    const camasOcupadas = await Cama.findAll({
      where: { estado: 'ocupada', PacienteId: { [Op.ne]: null } },
      include: [
        { model: Habitacion, include: [Ala] },
        { model: Paciente }
      ]
    });

    const camaAsignaciones = {};
    for (const cama of camasOcupadas) {
      camaAsignaciones[cama.PacienteId] = {
        numero: cama.numero,
        habitacion: cama.Habitacion.numero,
        ala: cama.Habitacion.Ala.nombre,
        tipo: cama.Habitacion.tipo
      };
    }

    for (const paciente of result.rows) {
      const internacion = paciente.Internacions.find(i => i.estado === 'activa');
      if (internacion) {
        camaAsignaciones[paciente.id] = {
          numero: internacion.Cama.numero,
          habitacion: internacion.Cama.Habitacion.numero,
          ala: internacion.Cama.Habitacion.Ala.nombre,
          tipo: internacion.Cama.Habitacion.tipo
        };
      }
    }

    const pacientesFiltrados = result.rows.filter(paciente => {
      const internacion = paciente.Internacions.find(i => i.estado === 'activa');

      if (filtro === 'internados') return !!internacion;
      if (filtro === 'no_internados') return !internacion;
      return true;
    });

    res.render('pacientes_listado', {
      pacientes: pacientesFiltrados,
      camaAsignaciones,
      total: pacientesFiltrados.length,
      currentPage: page,
      totalPages: Math.ceil(result.count / limit),
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

const mostrarFormularioEmergencia = async (req, res) => {
  try {
    const camas = await Cama.findAll({
      where: { estado: 'libre', higienizada: true },
      include: {
        model: Habitacion,
        include: Ala
      },
      order: [['HabitacionId', 'ASC'], ['numero', 'ASC']]
    });

    res.render('pacientes_emergencia', { camas });
  } catch (err) {
    console.error(err);
    res.render('mensaje', { tipo: 'error', mensaje: 'Error al cargar formulario de emergencia' });
  }
};

const ingresoEmergencia = async (req, res) => {
  try {
    const { camaId, sexo, motivo } = req.body;

    const cama = await Cama.findByPk(camaId, {
      include: {
        model: Habitacion,
        include: Ala
      }
    });

    if (!cama || cama.estado !== 'libre' || !cama.higienizada) {
      return res.render('mensaje', {
        tipo: 'error',
        mensaje: 'Cama no disponible para emergencia.'
      });
    }

    const nombre = `Emergencia ${cama.Habitacion.Ala.nombre}`;
    const dni = `Emerg-${cama.Habitacion.numero}-${Date.now()}`;

    const paciente = await Paciente.create({
      nombre,
      dni,
      fechaNacimiento: new Date(),
      sexo,
      telefono: '---',
      direccion: '---',
      obraSocial: 'Sin datos',
      viaIngreso: 'emergencia',
      medicoDerivante: null,
      motivoIngreso: motivo
    });

    const camaAsignada = await Cama.findOne({
      where: { PacienteId: paciente.id, estado: 'ocupada' }
    });
    if (camaAsignada) {
      return res.render('mensaje', {
        tipo: 'error',
        mensaje: 'El paciente ya tiene una cama asignada.'
      });
    }

    await cama.update({
      estado: 'ocupada',
      sexoOcupante: sexo,
      PacienteId: paciente.id
    });

    let mensaje = `Paciente de emergencia asignado a la cama ${cama.numero}`;
    if (cama.Habitacion.requiereInternacion) {
      await Internacion.create({
        PacienteId: paciente.id,
        CamaId: cama.id,
        fechaIngreso: new Date(),
        estado: 'activa'
      });
      mensaje += ' e internación realizada';
    }

    res.render('mensaje', {
      tipo: 'exito',
      mensaje,
      resumenId: paciente.id
    });
  } catch (err) {
    console.error(err);
    res.render('mensaje', { tipo: 'error', mensaje: 'Error al registrar paciente de emergencia' });
  }
};

module.exports = {
  mostrarFormulario,
  registrarPaciente,
  panelPaciente,
  listarPacientes,
  mostrarFormularioEditar,
  editarPaciente,
  eliminarPaciente,
  mostrarFormularioEmergencia,
  ingresoEmergencia
};