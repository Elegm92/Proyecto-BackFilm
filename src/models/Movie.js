//Crear el modelo de películas para MongoDB
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    imagen: {
      type: String,
      required: true,
    },
    anio: {
      type: Number,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    genero: {
      type: String,
      required: true,
    },
    duracion: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;