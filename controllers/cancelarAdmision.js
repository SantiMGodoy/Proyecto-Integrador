const { Internacion, Cama } = require('../models');

const cancelarAdmision = async (req, res) => {
  try {
    const internacion = await Internacion.findOne({
      where: { PacienteId: req.params.pacienteId, estado: 'activa' },
      include: Cama
    });

    if (!internacion) {
      return res.status(404).send('No se encontró una internación activa para cancelar');
    }

    // Liberar cama
    await internacion.Cama.update({
      estado: 'libre',
      sexoOcupante: null
    });

    // Cambiar estado de internación
    await internacion.update({ estado: 'cancelada' });

    res.send('Internación cancelada correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cancelar internación');
  }
};
