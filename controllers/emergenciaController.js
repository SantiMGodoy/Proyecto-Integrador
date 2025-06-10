// 1. Ruta: routes/emergencia.js
const express = require('express');
const router = express.Router();
const emergenciaController = require('../controllers/emergenciaController');

router.get('/activar', emergenciaController.registroEmergencia);

module.exports = router;

// 2. Controlador: controllers/emergenciaController.js
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
    const dni = `${habitacion.numero}`;

    let paciente = await Paciente.create({
      nombre,
      dni,
      sexo: 'X',
      viaIngreso: 'emergencia',
      obraSocial: 'No determinada',
      direccion: 'Sin datos',
      telefono: '-',
      motivo: 'Ingreso por emergencia automática'
    });

    await cama.update({ estado: 'ocupada', sexoOcupante: 'X' });

    await Internacion.create({
      PacienteId: paciente.id,
      CamaId: cama.id,
      fechaIngreso: new Date(),
      estado: 'activa'
    });

    res.render('mensaje', {
      tipo: 'exito',
      mensaje: 'Paciente registrado por emergencia y cama asignada correctamente.',
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
