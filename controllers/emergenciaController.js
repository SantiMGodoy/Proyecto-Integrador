const { Paciente, Cama, Habitacion, Ala, Internacion } = require('../models');

const registroEmergencia = async (req, res) => {
  try {
    const camas = await Cama.findAll({
      where: { estado: 'libre', higienizada: true },
      include: {
        model: Habitacion,
        include: Ala
      },
      order: [['HabitacionId', 'ASC'], ['numero', 'ASC']]
    });

    if (camas.length === 0) {
      return res.render('mensaje', {
        tipo: 'error',
        mensaje: 'No hay camas disponibles para emergencia.'
      });
    }

    const cama = camas[0];
    const habitacion = cama.Habitacion;

    const nombre = `Emergencia - ${habitacion.Ala.nombre}`;
    const dni = `Emerg-${habitacion.numero}-${Date.now()}`; // DNI único

    let paciente = await Paciente.create({
      nombre,
      dni,
      sexo: 'X',
      viaIngreso: 'emergencia',
      obraSocial: 'No determinada',
      direccion: 'Sin datos',
      telefono: '-',
      motivoIngreso: 'Ingreso por emergencia automática'
    });

    await cama.update({
      estado: 'ocupada',
      sexoOcupante: 'X',
      PacienteId: paciente.id
    });

    let mensaje = 'Paciente registrado por emergencia y cama asignada correctamente.';
    if (habitacion.tipo === 'cirugia') {
      await Internacion.create({
        PacienteId: paciente.id,
        CamaId: cama.id,
        fechaIngreso: new Date(),
        estado: 'activa'
      });
      mensaje = 'Paciente registrado por emergencia, cama asignada e internación realizada correctamente.';
    }

    res.render('mensaje', {
      tipo: 'exito',
      mensaje,
      resumenId: paciente.id
    });
  } catch (error) {
    console.error(error);
    res.render('mensaje', {
      tipo: 'error',
      mensaje: 'Error durante el proceso de emergencia.'
    });
  }
};

module.exports = { registroEmergencia };