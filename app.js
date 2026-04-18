require('dotenv').config();
const express = require('express');
const app = express();
const connectMongo = require('./src/config/db.mongo');
const { connectSQL } = require('./src/config/db.sql');


// Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});
connectMongo();
connectSQL();
// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;