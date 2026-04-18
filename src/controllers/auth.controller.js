//Controlador de autenticación. Donde escribimos la lógica de signup, login y logout
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registro de usuario
const signup = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Comprueba si el email ya existe
    const usuarioExistente = await User.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Encripta la contraseña
    const password_hash = await bcrypt.hash(password, 10);

    // Crea el usuario
    const nuevoUsuario = await User.create({
      nombre,
      email,
      password_hash,
    });

    res.status(201).json({ mensaje: 'Usuario creado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca el usuario
    const usuario = await User.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    // Comprueba la contraseña
    const passwordCorrecta = await bcrypt.compare(password, usuario.password_hash);
    if (!passwordCorrecta) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    // Crea el token JWT
    const token = jwt.sign(
      { id: usuario.id, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, { httpOnly: true });
res.status(200).json({ mensaje: 'Login correcto', role: usuario.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// Logout
const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ mensaje: 'Logout correcto' });
};

module.exports = { signup, login, logout };