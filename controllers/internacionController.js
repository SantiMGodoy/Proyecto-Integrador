const { Paciente, Cama, Habitacion, Ala, Internacion } = require('../models');

const mostrarFormularioAsignacion = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.pacienteId);
    if (!paciente) return res.render('error', { mensaje: 'Paciente no encontrado' });

    // 🚫 Prevenir doble internación
    const yaInternado = await Internacion.findOne({
      where: { PacienteId: paciente.id, estado: 'activa' }
    });
    if (yaInternado) {
      return res.render('error', { mensaje: 'El paciente ya tiene una internación activa.' });
    }

    const camasDisponibles = await Cama.findAll({
      where: { estado: 'libre', higienizada: true },
      include: [{ model: Habitacion, include: [Cama, Ala] }]
    });

    const camasFiltradas = [];

    for (let cama of camasDisponibles) {
      const habitacion = cama.Habitacion;
      const camasOcupadas = habitacion.Camas.filter(c => c.estado === 'ocupada');

      if (camasOcupadas.length === 0) {
        camasFiltradas.push(cama);
      } else if (
        habitacion.cantidadCamas > 1 &&
        camasOcupadas.every(c => c.sexoOcupante === paciente.sexo)
      ) {
        camasFiltradas.push(cama);
      }
    }

    res.render('asignar_cama', { paciente, camas: camasFiltradas });
  } catch (err) {
    console.error(err);
    res.render('error', { mensaje: 'Error al buscar camas disponibles' });
  }
};

const asignarCama = async (req, res) => {
  try {
    const { camaId } = req.body;
    const paciente = await Paciente.findByPk(req.params.pacienteId);

    // 🚫 Validar que el paciente no tenga internación activa
    const yaInternado = await Internacion.findOne({
      where: { PacienteId: paciente.id, estado: 'activa' }
    });
    if (yaInternado) {
      return res.render('error', { mensaje: 'El paciente ya tiene una cama asignada.' });
    }

    const cama = await Cama.findByPk(camaId, {
      include: {
        model: Habitacion,
        include: [Cama]
      }
    });

    if (!paciente || !cama || cama.estado !== 'libre' || !cama.higienizada) {
      return res.render('error', { mensaje: 'Cama no disponible para asignar' });
    }

    const habitacion = cama.Habitacion;
    const camasOcupadas = habitacion.Camas.filter(c => c.estado === 'ocupada');

    if (camasOcupadas.length > 0) {
      const ocupanteSexo = camasOcupadas[0].sexoOcupante;
      if (ocupanteSexo !== paciente.sexo) {
        return res.render('error', { mensaje: 'No se puede asignar cama: habitación con ocupante de distinto sexo' });
      }
    }

    await cama.update({
      estado: 'ocupada',
      sexoOcupante: paciente.sexo,
    });

    await Internacion.create({
      PacienteId: paciente.id,
      CamaId: cama.id,
      fechaIngreso: new Date(),
      estado: 'activa'
    });

    res.render('exito', {
      mensaje: 'Cama asignada correctamente',
      resumenId: paciente.id
    });
  } catch (err) {
    console.error(err);
    res.render('error', { mensaje: 'Error al asignar cama' });
  }
};

const cancelarAdmision = async (req, res) => {
  try {
    const internacion = await Internacion.findOne({
      where: { PacienteId: req.params.pacienteId, estado: 'activa' },
      include: Cama
    });

    if (!internacion) {
      return res.render('error', { mensaje: 'No se encontró una internación activa para cancelar' });
    }

    await internacion.Cama.update({
      estado: 'libre',
      sexoOcupante: null,
      higienizada: false
    });

    await internacion.update({ estado: 'cancelada' });

    res.render('exito', {
      mensaje: 'Internación cancelada correctamente',
      resumenId: req.params.pacienteId
    });
  } catch (error) {
    console.error(error);
    res.render('error', { mensaje: 'Error al cancelar internación' });
  }
};

const darDeAlta = async (req, res) => {
  try {
    const internacion = await Internacion.findOne({
      where: { PacienteId: req.params.pacienteId, estado: 'activa' },
      include: Cama
    });

    if (!internacion) {
      return res.render('error', { mensaje: 'No se encontró internación activa para dar de alta' });
    }

    await internacion.Cama.update({
      estado: 'libre',
      sexoOcupante: null,
      higienizada: false
    });

    await internacion.update({
      estado: 'finalizada',
      fechaAlta: new Date()
    });

    res.render('exito', {
      mensaje: 'Paciente dado de alta correctamente',
      resumenId: req.params.pacienteId
    });
  } catch (error) {
    console.error(error);
    res.render('error', { mensaje: 'Error al dar de alta al paciente' });
  }
};

const higienizarCama = async (req, res) => {
  try {
    const cama = await Cama.findByPk(req.params.id);
    if (!cama) return res.render('error', { mensaje: 'Cama no encontrada' });

    await cama.update({ higienizada: true });

    res.redirect('/internacion/camas?msg=ok');
  } catch (err) {
    console.error(err);
    res.render('error', { mensaje: 'Error al higienizar cama' });
  }
};

module.exports = {
  mostrarFormularioAsignacion,
  asignarCama,
  cancelarAdmision,
  darDeAlta,
  higienizarCama
};
