const { Paciente, Cama, Habitacion, Ala, Internacion } = require('../models');

const mostrarFormularioAsignacion = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.pacienteId);
    if (!paciente) return res.status(404).send('Paciente no encontrado');

    // Buscamos camas libres
    const camasDisponibles = await Cama.findAll({
      where: { estado: 'libre' },
      include: [{ model: Habitacion, include: [Ala] }]
    });

    // Filtramos por compatibilidad de sexo si hay otra cama ocupada en la misma habitacion
    const camasFiltradas = [];

    for (let cama of camasDisponibles) {
      const habitacion = await Habitacion.findByPk(cama.HabitacionId, {
        include: [Cama]
      });

      const camasOcupadas = habitacion.Camas.filter(c => c.estado === 'ocupada');

      if (camasOcupadas.length === 0) {
        camasFiltradas.push(cama); // habitacion libre
      } else {
        if (camasOcupadas[0].sexoOcupante === paciente.sexo) {
          camasFiltradas.push(cama);
        }
      }
    }

    res.render('asignar_cama', { paciente, camas: camasFiltradas });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al buscar camas');
  }
};

const asignarCama = async (req, res) => {
  try {
    const { camaId } = req.body;
    const paciente = await Paciente.findByPk(req.params.pacienteId);
    const cama = await Cama.findByPk(camaId);

    if (!paciente || !cama || cama.estado !== 'libre') {
      return res.status(400).send('Error en la asignación');
    }

    await cama.update({
      estado: 'ocupada',
      sexoOcupante: paciente.sexo
    });

    await Internacion.create({
      PacienteId: paciente.id,
      CamaId: cama.id,
      fechaIngreso: new Date(),
      estado: 'activa'
    });

    res.send('Cama asignada correctamente');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al asignar cama');
  }
};

const cancelarAdmision = async (req, res) => {
  try {
    const internacion = await Internacion.findOne({
      where: { PacienteId: req.params.pacienteId, estado: 'activa' },
      include: Cama
    });

    if (!internacion) {
      return res.status(404).send('No se encontró una internación activa para cancelar');
    }

    await internacion.Cama.update({
      estado: 'libre',
      sexoOcupante: null
    });

    await internacion.update({ estado: 'cancelada' });

    res.redirect(`/resumen/${req.params.pacienteId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cancelar internación');
  }
};

const darDeAlta = async (req, res) => {
  try {
    const internacion = await Internacion.findOne({
      where: { PacienteId: req.params.pacienteId, estado: 'activa' },
      include: Cama
    });

    if (!internacion) {
      return res.status(404).send('No se encontró internación activa para alta');
    }

    // Liberar cama
    await internacion.Cama.update({
      estado: 'libre',
      sexoOcupante: null
    });

    // Finalizar internación
    await internacion.update({
      estado: 'finalizada',
      fechaAlta: new Date()
    });

    res.redirect(`/resumen/${req.params.pacienteId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al dar de alta al paciente');
  }
};


module.exports = {
  mostrarFormularioAsignacion,
  asignarCama,
  cancelarAdmision,
  darDeAlta
};
