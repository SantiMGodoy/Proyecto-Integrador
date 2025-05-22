const { Paciente } = require('../models');

const mostrarFormulario = (req, res) => {
  res.render('pacientes_nuevo');
};

const registrarPaciente = async (req, res) => {
  try {
    const {
      nombre,
      dni,
      fechaNacimiento,
      sexo,
      telefono,
      direccion,
      obraSocial,
      viaIngreso,
      medicoDerivante
    } = req.body;

    if (viaIngreso === 'derivacion' && (!medicoDerivante || medicoDerivante.trim() === '')) {
      return res.render('error', {
        mensaje: 'Debes ingresar el nombre del medico derivante si la via de ingreso es una derivacion medica.'
      });
    }

    let paciente = await Paciente.findOne({ where: { dni } });

    if (paciente) {
      await paciente.update({
        nombre,
        fechaNacimiento,
        sexo,
        telefono,
        direccion,
        obraSocial,
        viaIngreso,
        medicoDerivante
      });
    } else {
      paciente = await Paciente.create({
        nombre,
        dni,
        fechaNacimiento,
        sexo,
        telefono,
        direccion,
        obraSocial,
        viaIngreso,
        medicoDerivante
      });
    }

    res.render('exito', {
      mensaje: 'Paciente registrado correctamente',
      resumenId: paciente.id
    });
  } catch (error) {
    console.error(error);
    res.render('error', { mensaje: 'Error al registrar paciente.' });
  }
};

module.exports = {
  mostrarFormulario,
  registrarPaciente,
};
