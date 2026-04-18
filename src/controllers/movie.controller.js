const { searchMovies, getMovieById } = require('../services/omdb.service');
const Movie = require('../models/Movie');

// Buscar películas por título
const searchMovie = async (req, res) => {
  try {
    const { title } = req.params;

    // Primero busca en OMDB
    const omdbResults = await searchMovies(title);

    if (omdbResults.length > 0) {
      return res.status(200).json(omdbResults);
    }

    // Si no encuentra en OMDB busca en MongoDB
    const mongoResults = await Movie.find({
      titulo: { $regex: title, $options: 'i' }
    });

    if (mongoResults.length === 0) {
      return res.status(404).json({ mensaje: 'No hay resultados' });
    }

    res.status(200).json(mongoResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar películas' });
  }
};

// Obtener detalle de una película
const getMovie = async (req, res) => {
  try {
    const { title } = req.params;

    // Busca en OMDB por imdbID
    const omdbMovie = await getMovieById(title);

    if (omdbMovie) {
      return res.status(200).json(omdbMovie);
    }

    // Si no encuentra en OMDB busca en MongoDB
    const mongoMovie = await Movie.findById(title);

    if (!mongoMovie) {
      return res.status(404).json({ mensaje: 'Película no encontrada' });
    }

    res.status(200).json(mongoMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la película' });
  }
};

// Crear película (admin)
const createMovie = async (req, res) => {
  try {
    const { titulo, imagen, anio, director, genero, duracion } = req.body;

    const nuevaPelicula = await Movie.create({
      titulo,
      imagen,
      anio,
      director,
      genero,
      duracion
    });

    res.status(201).json({ mensaje: 'Película creada correctamente', pelicula: nuevaPelicula });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la película' });
  }
};

// Editar película (admin)
const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, imagen, anio, director, genero, duracion } = req.body;

    const pelicula = await Movie.findByIdAndUpdate(
      id,
      { titulo, imagen, anio, director, genero, duracion },
      { new: true }
    );

    if (!pelicula) {
      return res.status(404).json({ error: 'Película no encontrada' });
    }

    res.status(200).json({ mensaje: 'Película actualizada correctamente', pelicula });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la película' });
  }
};

// Borrar película (admin)
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const pelicula = await Movie.findByIdAndDelete(id);

    if (!pelicula) {
      return res.status(404).json({ error: 'Película no encontrada' });
    }

    res.status(200).json({ mensaje: 'Película eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la película' });
  }
};

module.exports = { searchMovie, getMovie, createMovie, updateMovie, deleteMovie };