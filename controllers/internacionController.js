const { Paciente, Cama, Habitacion, Ala } = require('../models');

const mostrarFormularioAsignacion = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.pacienteId);
    if (!paciente) return res.status(404).send('Paciente no encontrado');

    // Buscar camas libres
    const camasDisponibles = await Cama.findAll({
      where: { estado: 'libre' },
      include: [{ model: Habitacion, include: [Ala] }]
    });

    // Filtrar por compatibilidad de sexo si hay otra cama ocupada en la misma habitación
    const camasFiltradas = [];

    for (let cama of camasDisponibles) {
      const habitacion = await Habitacion.findByPk(cama.HabitacionId, {
        include: [Cama]
      });

      const camasOcupadas = habitacion.Camas.filter(c => c.estado === 'ocupada');

      if (camasOcupadas.length === 0) {
        camasFiltradas.push(cama); // habitación vacía
      } else {
        // verificar sexo del ocupante
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

    await require('../models').Internacion.create({
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

module.exports = {
  mostrarFormularioAsignacion,
  asignarCama,
};
