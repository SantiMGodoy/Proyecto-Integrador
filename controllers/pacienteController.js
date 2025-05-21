const { Paciente } = require('../models');

const mostrarFormulario = (req, res) => {
  res.render('pacientes_nuevo');
};

const registrarPaciente = async (req, res) => {
  try {
    const { nombre, dni, fechaNacimiento, sexo, telefono, direccion, obraSocial } = req.body;

    let paciente = await Paciente.findOne({ where: { dni } });

    if (paciente) {
      await paciente.update({ nombre, fechaNacimiento, sexo, telefono, direccion, obraSocial });
    } else {
      paciente = await Paciente.create({ nombre, dni, fechaNacimiento, sexo, telefono, direccion, obraSocial });
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
