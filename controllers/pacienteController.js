const { Paciente } = require('../models');

const mostrarFormulario = (req, res) => {
  res.render('pacientes_nuevo');
};

const registrarPaciente = async (req, res) => {
  try {
    const { nombre, dni, fechaNacimiento, sexo, telefono, direccion, obraSocial } = req.body;

    // Verificar si ya existe paciente por DNI
    let paciente = await Paciente.findOne({ where: { dni } });

    if (paciente) {
      // Actualizar datos si ya existe
      await paciente.update({ nombre, fechaNacimiento, sexo, telefono, direccion, obraSocial });
    } else {
      // Crear nuevo paciente
      await Paciente.create({ nombre, dni, fechaNacimiento, sexo, telefono, direccion, obraSocial });
    }

    res.send('Paciente registrado con éxito.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al registrar paciente.');
  }
};

module.exports = {
  mostrarFormulario,
  registrarPaciente,
};
