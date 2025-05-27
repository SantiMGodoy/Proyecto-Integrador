const { Paciente } = require('../models');

const mostrarFormulario = (req, res) => {
  res.render('pacientes_nuevo');
};

const registrarPaciente = async (req, res) => {
  try {
    const { nombre, dni, fechaNacimiento, sexo, telefono, direccion, obraSocial, viaIngreso, medicoDerivante } = req.body;

    if (viaIngreso === 'derivacion' && (!medicoDerivante || medicoDerivante.trim() === '')) {
      return res.render('error', {
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

    res.render('exito', {
      mensaje,
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
