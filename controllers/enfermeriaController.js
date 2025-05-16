const { Paciente, Internacion, EvaluacionEnfermeria } = require('../models');

const mostrarFormulario = async (req, res) => {
  const paciente = await Paciente.findByPk(req.params.pacienteId);
  if (!paciente) return res.status(404).send('Paciente no encontrado');
  res.render('evaluacion_enfermeria', { paciente });
};

const registrarEvaluacion = async (req, res) => {
  try {
    const { pacienteId } = req.params;
    const internacion = await Internacion.findOne({ where: { PacienteId: pacienteId, estado: 'activa' } });

    if (!internacion) return res.status(400).send('No hay internación activa');

    await EvaluacionEnfermeria.create({
      PacienteId: pacienteId,
      internacionId: internacion.id,
      ...req.body
    });

    res.send('Evaluación de enfermería registrada con éxito');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al registrar evaluación');
  }
};

module.exports = { mostrarFormulario, registrarEvaluacion };
