const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { signup, login, logout } = require('../controllers/auth.controller');
const { getProfile, updateProfile } = require('../controllers/user.controller');
const { searchMovie, getMovie, createMovie, updateMovie, deleteMovie } = require('../controllers/movie.controller');
const { getFavorites, addFavorite, deleteFavorite } = require('../controllers/favorite.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/role.middleware');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

// Perfil
router.get('/user', authMiddleware, getProfile);
router.put('/user', authMiddleware, updateProfile);

// Películas
router.get('/movie/:title', authMiddleware, searchMovie);
router.post('/movie', authMiddleware, adminMiddleware, createMovie);
router.put('/movie/:id', authMiddleware, adminMiddleware, updateMovie);
router.delete('/movie/:id', authMiddleware, adminMiddleware, deleteMovie);

// Favoritos
router.get('/favorites', authMiddleware, getFavorites);
router.post('/favorites', authMiddleware, addFavorite);
router.delete('/favorites/:movie_ref', authMiddleware, deleteFavorite);

// Google OAuth
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user.id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/dashboard');
  }
);

// GitHub OAuth
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/auth/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user.id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/dashboard');
  }
);

module.exports = router;