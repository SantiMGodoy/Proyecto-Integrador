const express = require('express');
const path = require('path');
require('dotenv').config();
const sequelize = require('./db');
const { Ala, Cama, EvaluacionEnfermeria, EvaluacionMedica, Habitacion, Internacion, Paciente } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de vistas y middlewares
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Ruta base de prueba (opcional pero útil)
app.get('/ping', (req, res) => {
  res.send('¡Servidor funcionando correctamente en Railway! 🚀');
});

// Ruta de inicio
app.get('/', async (req, res) => {
  try {
    const totalInternados = await Internacion.count({ where: { estado: 'activa' } });
    res.render('index', { titulo: 'Sistema de Admisión HIS', totalInternados });
  } catch (error) {
    console.error('Error en la ruta /:', error);
    res.status(500).send('Error al cargar inicio');
  }
});

app.get('/resumen', (req, res) => {
  const id = req.query.id;
  res.redirect(`/resumen/${id}`);
});

// Rutas principales
const pacientesRoutes = require('./routes/pacientes');
app.use('/pacientes', pacientesRoutes);
const internacionRoutes = require('./routes/internacion');
app.use('/internacion', internacionRoutes);
const enfermeriaRoutes = require('./routes/enfermeria');
app.use('/enfermeria', enfermeriaRoutes);
const medicaRoutes = require('./routes/medica');
app.use('/medica', medicaRoutes);
const resumenRoutes = require('./routes/resumen');
app.use('/resumen', resumenRoutes);

// Middleware de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Conexión y sincronización de Sequelize
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });
