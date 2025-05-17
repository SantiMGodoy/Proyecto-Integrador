const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index', { titulo: 'Sistema de Admisión HIS' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

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
