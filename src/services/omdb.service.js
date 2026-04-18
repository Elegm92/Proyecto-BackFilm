//Archivo que se encarga de comunicarse con APIs externas
//Así se mantiene el código organizado y separado de la lógica del controlador.
const axios = require('axios');

const OMDB_URL = 'http://www.omdbapi.com';

// Buscar películas por título
const searchMovies = async (titulo) => {
  const response = await axios.get(OMDB_URL, {
    params: {
      apikey: process.env.OMDB_API_KEY,
      s: titulo,
      type: 'movie'
    }
  });

  if (response.data.Response === 'False') {
    return [];
  }

  return response.data.Search;
};

// Obtener detalle de una película por ID de OMDB
const getMovieById = async (imdbID) => {
  const response = await axios.get(OMDB_URL, {
    params: {
      apikey: process.env.OMDB_API_KEY,
      i: imdbID,
      plot: 'full'
    }
  });

  if (response.data.Response === 'False') {
    return null;
  }

  return response.data;
};

module.exports = { searchMovies, getMovieById };