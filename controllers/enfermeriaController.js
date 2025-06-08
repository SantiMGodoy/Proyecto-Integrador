const { Paciente, Internacion, EvaluacionEnfermeria } = require('../models');

const mostrarFormulario = async (req, res) => {
  const paciente = await Paciente.findByPk(req.params.pacienteId);
  if (!paciente) return res.render('mensaje', { 
    tipo: 'error',
    mensaje: 'Paciente no encontrado' });
  res.render('evaluacion_enfermeria', { paciente });
};

const registrarEvaluacion = async (req, res) => {
  try {
    const { pacienteId } = req.params;
    const internacion = await Internacion.findOne({ where: { PacienteId: pacienteId, estado: 'activa' } });

    if (!internacion) return res.render('mensaje', { 
      tipo: 'error',
      mensaje: 'No hay internación activa' });

    await EvaluacionEnfermeria.create({
      PacienteId: pacienteId,
      internacionId: internacion.id,
      ...req.body
    });

    res.render('mensjae', {
      tipo: 'exito',
      mensaje: 'Evaluación de enfermería registrada con éxito',
      resumenId: pacienteId
    });
  } catch (err) {
    console.error(err);
    res.render('mensaje', { 
      tipo: 'error',
      mensaje: 'Error al registrar evaluación' });
  }
};

module.exports = { mostrarFormulario, registrarEvaluacion };
