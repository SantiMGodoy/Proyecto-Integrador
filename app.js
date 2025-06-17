// Carga de módulos
require('dotenv').config();
console.log("✅ Variables de entorno cargadas");

const express = require('express');
const path = require('path');
const app = express();
console.log("🚀 Express inicializado");

const sequelize = require('./db');
console.log("🔗 Módulo Sequelize cargado correctamente");

const { Ala, Cama, EvaluacionEnfermeria, EvaluacionMedica, Habitacion, Internacion, Paciente } = require('./models');
console.log("📦 Modelos importados correctamente");

const PORT = process.env.PORT || 3000;
console.log(`🌐 Puerto definido: ${PORT}`);

// Configuración de vistas y middlewares
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
console.log("🧩 Middlewares configurados");

// Ruta simple de prueba
app.get('/ping', (req, res) => {
  res.send('¡Servidor funcionando correctamente en Railway! 🚀');
});

// Ruta de inicio
app.get('/', async (req, res) => {
  try {
    const totalInternados = await Internacion.count({ where: { estado: 'activa' } });
    res.render('index', { titulo: 'Sistema de Admisión HIS', totalInternados });
  } catch (error) {
    console.error('❌ Error en la ruta /:', error);
    res.status(500).send('Error al cargar inicio');
  }
});

// Redirección para resumen
app.get('/resumen', (req, res) => {
  const id = req.query.id;
  res.redirect(`/resumen/${id}`);
});

// Rutas principales
try {
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
  console.log("🛣️ Rutas principales registradas");
} catch (error) {
  console.error("❌ Error cargando rutas:", error);
}

// Middleware de errores
app.use((err, req, res, next) => {
  console.error('🔥 Error en middleware:', err.stack);
  res.status(500).send('¡Algo salió mal!');
});

// Sincronización con Sequelize
sequelize.sync({ alter: true })
  .then(() => {
    console.log('📡 Base de datos sincronizada');
    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error al sincronizar la base de datos:', err);
  });
