require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const passport = require('./src/config/passport');


app.use(cookieParser());
app.use(passport.initialize());

const connectMongo = require('./src/config/db.mongo');
connectMongo();

const { connectSQL, sequelize } = require('./src/config/db.sql');
connectSQL();

require('./src/models/User');
require('./src/models/Favorite');

sequelize.sync({ alter: true })
  .then(() => console.log('Tablas sincronizadas'))
  .catch((error) => console.error('Error sincronizando tablas:', error));

// Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));

// Rutas
const apiRoutes = require('./src/routes/api.routes');
app.use('/api', apiRoutes);
const webRoutes = require('./src/routes/web.routes');
app.use('/', webRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;