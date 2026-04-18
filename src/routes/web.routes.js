// son las que renderizan las vistas EJS, es decir las páginas que ve el usuario en el navegador
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

// Vista de inicio
router.get('/', (req, res) => {
  res.render('index', { title: 'Movie App', user: null });
});

// Login
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login', user: null });
});

// Signup
router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Registro', user: null });
});

// Dashboard
router.get('/dashboard', authMiddleware, (req, res) => {
  res.render('dashboard', { title: 'Dashboard', user: req.user });
});

// Buscador
router.get('/search', authMiddleware, (req, res) => {
  res.render('search', { title: 'Buscador', user: req.user });
});

// Detalle película
router.get('/search/:title', authMiddleware, (req, res) => {
  res.render('movie-detail', { title: req.params.title, user: req.user });
});

// Favoritos
router.get('/favorites', authMiddleware, (req, res) => {
  res.render('favorites', { title: 'Mis favoritos', user: req.user });
});

// Perfil
router.get('/profile', authMiddleware, (req, res) => {
  res.render('profile', { title: 'Mi perfil', user: req.user });
});

// Admin - usuarios
router.get('/users', authMiddleware, (req, res) => {
  res.render('users', { title: 'Usuarios', user: req.user });
});

// Admin - películas
router.get('/movies', authMiddleware, (req, res) => {
  res.render('movies', { title: 'Películas', user: req.user });
});

module.exports = router;