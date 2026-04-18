//Proteger las rutas privadas, es decir, comprobará que el usuario tiene un token JWT válido antes de dejarle acceder.
//Aqui instalamos npm install cookie-parser
//Guaramos el token en cookie
//Pinta el usuario que esta logueado en ese momento
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.redirect('/login');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password_hash', 'reset_token', 'reset_token_exp'] }
    });

    if (!usuario) {
      return res.redirect('/login');
    }

    req.user = usuario;
    next();
  } catch (error) {
    return res.redirect('/login');
  }
};

module.exports = authMiddleware;