//Creamos el controlador de favoritos
const Favorite = require('../models/Favorite');
const { getMovieById } = require('../services/omdb.service');
const Movie = require('../models/Movie');

// Obtener favoritos del usuario
const getFavorites = async (req, res) => {
  try {
    const favoritos = await Favorite.findAll({
      where: { user_id: req.user.id }
    });

    // Obtener los datos de cada película
    const peliculas = await Promise.all(favoritos.map(async (favorito) => {
      if (favorito.movie_source === 'omdb') {
        return await getMovieById(favorito.movie_ref);
      } else {
        return await Movie.findById(favorito.movie_ref);
      }
    }));

    res.status(200).json(peliculas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener favoritos' });
  }
};

// Añadir favorito
const addFavorite = async (req, res) => {
  try {
    const { movie_ref, movie_source } = req.body;

    // Comprueba si ya existe ese favorito
    const existe = await Favorite.findOne({
      where: { user_id: req.user.id, movie_ref }
    });

    if (existe) {
      return res.status(400).json({ error: 'La película ya está en favoritos' });
    }

    await Favorite.create({
      user_id: req.user.id,
      movie_ref,
      movie_source
    });

    res.status(201).json({ mensaje: 'Película añadida a favoritos' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al añadir favorito' });
  }
};

// Eliminar favorito
const deleteFavorite = async (req, res) => {
  try {
    const { movie_ref } = req.params;

    const favorito = await Favorite.findOne({
      where: { user_id: req.user.id, movie_ref }
    });

    if (!favorito) {
      return res.status(404).json({ error: 'Favorito no encontrado' });
    }

    await favorito.destroy();

    res.status(200).json({ mensaje: 'Película eliminada de favoritos' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar favorito' });
  }
};

module.exports = { getFavorites, addFavorite, deleteFavorite };