//Creamos el controlador de usuario
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Ver perfil
const getProfile = async (req, res) => {
  try {
    const usuario = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password_hash', 'reset_token', 'reset_token_exp'] }
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el perfil' });
  }
};

// Editar perfil
const updateProfile = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const usuario = await User.findByPk(req.user.id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (nombre) usuario.nombre = nombre;
    if (email) usuario.email = email;
    if (password) usuario.password_hash = await bcrypt.hash(password, 10);

    await usuario.save();

    res.status(200).json({ mensaje: 'Perfil actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el perfil' });
  }
};
//Funcionalidad del admin

// Obtener todos los usuarios (admin)
const getAllUsers = async (req, res) => {
  try {
    const usuarios = await User.findAll({
      attributes: { exclude: ['password_hash', 'reset_token', 'reset_token_exp'] }
    });

    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Editar usuario (admin)
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, role } = req.body;

    const usuario = await User.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (nombre) usuario.nombre = nombre;
    if (email) usuario.email = email;
    if (role) usuario.role = role;

    await usuario.save();

    res.status(200).json({ mensaje: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// Borrar usuario (admin)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await User.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await usuario.destroy();

    res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

module.exports = { getProfile, updateProfile, getAllUsers, updateUser, deleteUser };