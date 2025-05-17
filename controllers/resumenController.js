const { Paciente, Internacion, Cama, Habitacion, Ala, EvaluacionEnfermeria, EvaluacionMedica } = require('../models');

const mostrarResumen = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.pacienteId);
    if (!paciente) return res.status(404).send('Paciente no encontrado');

    const internacion = await Internacion.findOne({
      where: { PacienteId: paciente.id, estado: 'activa' },
      include: {
        model: Cama,
        include: {
          model: Habitacion,
          include: Ala
        }
      }
    });

    const evaluacionEnfermeria = await EvaluacionEnfermeria.findOne({ where: { PacienteId: paciente.id } });
    const evaluacionMedica = await EvaluacionMedica.findOne({ where: { PacienteId: paciente.id } });

    res.render('resumen_admision', {
      paciente,
      internacion,
      evaluacionEnfermeria,
      evaluacionMedica
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al generar resumen');
  }
};

module.exports = { mostrarResumen };
