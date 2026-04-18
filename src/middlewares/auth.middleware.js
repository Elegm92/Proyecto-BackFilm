//Proteger las rutas privadas, es decir, comprobará que el usuario tiene un token JWT válido antes de dejarle acceder.
//Aqui instalamos npm install cookie-parser
//Guaramos el token en cookie
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'Acceso no autorizado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = authMiddleware;