const usuarioModel = require('../models/usuarioModel');

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel.getUsuarios(); // Obtener todos los usuarios
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los usuarios' });
    }
}

// Obtener un usuario por ID
const getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await usuarioModel.getById(id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ error: 'usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener el usuario' });
    }
}



const addUsuario = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Verificar si el usuario ya existe
        const existeUsuario = await usuarioModel.getByName(username);
        if (existeUsuario) {
            return res.status(400).json({
                message: 'El nombre de usuario ya está en uso'
            });
        }

        // Si el usuario no existe, proceder a agregarlo
        const nuevoUsuario = { username, password, role };
        const usuarioAgregado = await usuarioModel.add(nuevoUsuario);
        
        res.status(201).json({
            message: 'Usuario agregado exitosamente',
            usuario: usuarioAgregado
        });
    } catch (error) {
        res.status(500).json({
            message: 'Hubo un error al agregar al usuario',
            error: error.message
        });
    }
}
const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        await usuarioModel.deleteById(id);
        res.status(200).json({ message: `Usuario con ID ${id} eliminado correctamente` });
    } catch (error) {
        res.status(404).json({ error: `Usuario con ID ${id} no encontrado` });
    }
};
const updateById = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await usuarioModel.updateById(id, req.body);

        if (updatedUser) {
            res.status(200).json({ message: `Usuario con ID ${id} actualizado correctamente`, updatedUser });
        } else {
            res.status(404).json({ error: `Usuario con ID ${id} no encontrado` });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error al actualizar el usuario' });
    }
}
module.exports = {
    getUsuarios,
    getUsuarioById,
    addUsuario,
    deleteById,
    updateById
}
