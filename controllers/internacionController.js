const { Paciente, Cama, Habitacion, Ala, Internacion } = require('../models');
const { Op } = require('sequelize');

const mostrarFormularioAsignacion = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.pacienteId);
    if (!paciente) {
      return res.render('mensaje', {
        tipo: 'error',
        mensaje: 'Paciente no encontrado'
      });
    }

    const yaInternado = await Internacion.findOne({
      where: { PacienteId: paciente.id, estado: 'activa' }
    });
    const camaAsignada = await Cama.findOne({
      where: { PacienteId: paciente.id, estado: 'ocupada' }
    });

    if (yaInternado || camaAsignada) {
      return res.render('mensaje', {
        tipo: 'error',
        mensaje: 'El paciente ya tiene una cama asignada.'
      });
    }

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

    const camasCompatibles = camas.filter(cama => {
      if (cama.estado !== 'libre' || !cama.higienizada) return false;

      const habitacion = cama.Habitacion;
      const camasEnHabitacion = camas.filter(c => c.HabitacionId === habitacion.id);
      const ocupadas = camasEnHabitacion.filter(c => c.estado === 'ocupada');

      return (
        ocupadas.length === 0 ||
        (habitacion.cantidadCamas > 1 &&
          ocupadas.every(c => c.sexoOcupante === paciente.sexo))
      );
    });

    res.render('camas_estado', {
      camas: camasCompatibles,
      camaOcupacion,
      mensaje: null,
      paciente
    });
  } catch (err) {
    console.error(err);
    res.render('mensaje', {
      tipo: 'error',
      mensaje: 'Error al buscar camas disponibles'
    });
  }
};

const asignarCama = async (req, res) => {
  try {
    const { camaId } = req.body;
    const paciente = await Paciente.findByPk(req.params.pacienteId);

    if (!paciente) {
      return res.render('mensaje', {
        tipo: 'error',
        mensaje: 'Paciente no encontrado'
      });
    }

    const yaInternado = await Internacion.findOne({
      where: { PacienteId: paciente.id, estado: 'activa' }
    });
    const camaAsignada = await Cama.findOne({
      where: { PacienteId: paciente.id, estado: 'ocupada' }
    });

    if (yaInternado || camaAsignada) {
      return res.render('mensaje', {
        tipo: 'error',
        mensaje: 'El paciente ya tiene una cama asignada.'
      });
    }

    const cama = await Cama.findByPk(camaId, {
      include: {
        model: Habitacion,
        include: [Cama]
      }
    });

    if (!cama || cama.estado !== 'libre' || !cama.higienizada) {
      return res.render('mensaje', {
        tipo: 'error',
        mensaje: 'Cama no disponible para asignar'
      });
    }

    const habitacion = cama.Habitacion;
    const camasOcupadas = habitacion.Camas.filter(c => c.estado === 'ocupada');

    if (camasOcupadas.length > 0) {
      const ocupanteSexo = camasOcupadas[0].sexoOcupante;
      if (ocupanteSexo !== paciente.sexo) {
        return res.render('mensaje', {
          tipo: 'error',
          mensaje: 'No se puede asignar cama: habitación con ocupante de distinto sexo'
        });
      }
    }

    await cama.update({
      estado: 'ocupada',
      sexoOcupante: paciente.sexo,
      PacienteId: paciente.id
    });

    if (habitacion.requiereInternacion) {
      await Internacion.create({
        PacienteId: paciente.id,
        CamaId: cama.id,
        fechaIngreso: new Date(),
        estado: 'activa'
      });
    }

    res.render('mensaje', {
      tipo: 'exito',
      mensaje: habitacion.requiereInternacion ? 'Cama asignada e internación realizada correctamente' : 'Cama asignada correctamente',
      resumenId: paciente.id
    });
  } catch (err) {
    console.error(err);
    res.render('mensaje', {
      tipo: 'error',
      mensaje: 'Error al asignar cama'
    });
  }
};

const cancelarAdmision = async (req, res) => {
  try {
    const internacion = await Internacion.findOne({
      where: { PacienteId: req.params.pacienteId, estado: 'activa' },
      include: Cama
    });

    if (!internacion) {
      return res.render('mensaje', {
        tipo: 'error',
        mensaje: 'No se encontró una internación activa para cancelar'
      });
    }

    await internacion.Cama.update({
      estado: 'libre',
      sexoOcupante: null,
      PacienteId: null,
      higienizada: false
    });

    await internacion.update({ estado: 'cancelada' });

    res.render('mensaje', {
      tipo: 'exito',
      mensaje: 'Internación cancelada correctamente',
      resumenId: req.params.pacienteId
    });
  } catch (error) {
    console.error(error);
    res.render('mensaje', {
      tipo: 'error',
      mensaje: 'Error al cancelar internación'
    });
  }
};

const darDeAlta = async (req, res) => {
  try {
    const internacion = await Internacion.findOne({
      where: { PacienteId: req.params.pacienteId, estado: 'activa' },
      include: Cama
    });

    if (!internacion) {
      return res.render('mensaje', {
        tipo: 'error',
        mensaje: 'No se encontró internación activa para dar de alta'
      });
    }

    await internacion.Cama.update({
      estado: 'libre',
      sexoOcupante: null,
      PacienteId: null,
      higienizada: false
    });

    await internacion.update({
      estado: 'finalizada',
      fechaAlta: new Date()
    });

    res.render('mensaje', {
      tipo: 'exito',
      mensaje: 'Paciente dado de alta correctamente',
      resumenId: req.params.pacienteId
    });
  } catch (error) {
    console.error(error);
    res.render('mensaje', {
      tipo: 'error',
      mensaje: 'Error al dar de alta al paciente'
    });
  }
};

const higienizarCama = async (req, res) => {
  try {
    const cama = await Cama.findByPk(req.params.id);
    if (!cama) {
      return res.render('mensaje', {
        tipo: 'error',
        mensaje: 'Cama no encontrada'
      });
    }

    await cama.update({ higienizada: true });

    res.redirect('/internacion/camas?msg=ok');
  } catch (err) {
    console.error(err);
    res.render('mensaje', {
      tipo: 'error',
      mensaje: 'Error al higienizar cama'
    });
  }
};

const finalizarAsignacion = async (req, res) => {
  try {
    const cama = await Cama.findByPk(req.params.camaId, {
      include: Habitacion
    });
    if (!cama || cama.estado !== 'ocupada') {
      return res.render('mensaje', {
        tipo: 'error',
        mensaje: 'Cama no encontrada o no está ocupada'
      });
    }

    if (cama.Habitacion.requiereInternacion) {
      return res.render('mensaje', {
        tipo: 'error',
        mensaje: 'Esta cama está asignada para internación. Use "Dar de alta" o "Cancelar admisión" para liberarla.'
      });
    }

    await cama.update({
      estado: 'libre',
      sexoOcupante: null,
      PacienteId: null,
      higienizada: false
    });

    res.render('mensaje', {
      tipo: 'exito',
      mensaje: 'Asignación finalizada y cama liberada correctamente'
    });
  } catch (err) {
    console.error(err);
    res.render('mensaje', {
      tipo: 'error',
      mensaje: 'Error al finalizar asignación'
    });
  }
};

const mostrarEstadoCamas = async (req, res) => {
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
    const internacionesActivas = {};
    internaciones.forEach(internacion => {
      camaOcupacion[internacion.CamaId] = internacion.Paciente;
      internacionesActivas[internacion.PacienteId] = internacion;
    });

    const camasOcupadas = await Cama.findAll({
      where: { estado: 'ocupada', PacienteId: { [Op.ne]: null } },
      include: [Paciente, { model: Habitacion, include: [Ala] }]
    });
    camasOcupadas.forEach(cama => {
      if (!camaOcupacion[cama.id]) {
        camaOcupacion[cama.id] = cama.Paciente;
      }
    });

    const mensaje = req.query.msg === 'ok' ? 'Cama higienizada correctamente ✅' : null;

    res.render('camas_estado', {
      camas,
      camaOcupacion,
      internacionesActivas,
      mensaje
    });
  } catch (err) {
    console.error(err);
    res.render('mensaje', { tipo: 'error', mensaje: 'Error al mostrar el estado de camas' });
  }
};

module.exports = {
  mostrarFormularioAsignacion,
  asignarCama,
  cancelarAdmision,
  darDeAlta,
  higienizarCama,
  finalizarAsignacion,
  mostrarEstadoCamas
};