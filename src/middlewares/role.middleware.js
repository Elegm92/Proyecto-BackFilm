//crear el middleware que comprueba si el usuario es administrador
//Este middleware siempre se usará después de authMiddleware. Primero comprobamos que el usuario está logueado y luego que es administrador.
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso restringido a administradores' });
  }
  next();
};

module.exports = adminMiddleware;