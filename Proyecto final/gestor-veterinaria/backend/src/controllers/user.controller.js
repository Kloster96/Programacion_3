const { User } = require('../models/init-models').initModels();
const bcrypt = require('bcryptjs');

class UserController {
    async getUsers(req, res) {
        try {
            const users = await User.findAll({
                attributes: { exclude: ['password'] }
            });
            res.status(200).json(users);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener usuarios.' });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await User.findByPk(req.params.id, {
                attributes: { exclude: ['password'] }
            });
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error('Error al obtener usuario por ID:', error);
            res.status(500).json({ message: 'Error del servidor al obtener usuario.' });
        }
    }
    async updateUserProfile(req, res) {
        const { username, email, role, password } = req.body;
        const userId = parseInt(req.params.id, 10);
        if (isNaN(userId)) {
            return res.status(400).json({ message: 'ID de usuario inválido.' });
        }
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }
            if (req.user.role !== 'admin' && req.user.id !== userId) {
                return res.status(403).json({ message: 'No autorizado para actualizar este perfil.' });
            }

            user.username = username || user.username;
            user.email = email || user.email;

            if (req.user.role === 'admin') {
                user.role = role || user.role;
            }

            if (password) {
                user.password = await bcrypt.hash(password, 10);
            }

            await user.save();

            const userResponse = user.toJSON();
            delete userResponse.password;
            res.status(200).json({ message: 'Perfil actualizado correctamente.', user: userResponse });
        } catch (error) {
            console.error('Error al actualizar el perfil de usuario:', error);
            res.status(500).json({ message: 'Error del servidor al actualizar perfil.' });
        }
    }

    async deleteUser(req, res) {
        const userId = parseInt(req.params.id, 10);
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'No autorizado para eliminar usuarios.' });
            }
            await user.destroy();
            res.status(200).json({ message: 'Usuario eliminado exitosamente.' });
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            res.status(500).json({ message: 'Error del servidor al eliminar usuario.' });
        }
    }
}

module.exports = new UserController();