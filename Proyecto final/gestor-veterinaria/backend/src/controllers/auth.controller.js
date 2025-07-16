const authService = require('../services/auth.service');

class AuthController {
    async register(req, res){
        const { username, email, password, role} = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({message: 'Todos los campos son obligatorios.'});
        }
        try {
            const newUser = await authService.register(username, email, password, role);
            res.status(201).json({message: 'Usuario registrado exitosamente.', user: newUser});
        } catch ( error ) {
            console.error('Error al registrar usuario:', error.message);
            if(error.message.includes('ya esta en uso') || error.message.includes('ya esta registrado')){
                return res.status(409).json({message:error.message});
            }
            res.status(500).json({message: 'Error interno del servidor al registrar usuario.', error: error.message});
        }
        
    }

    async login(req, res) {
        const {identifier, password} = req.body;
        if (!identifier || !password) {
            return res.status(400).json({message: 'El identificador y la contraseña son obligatorios.'});
        }
        try {
            const {user, token} = await authService.login(identifier, password);
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Lax',
                maxAge: 3600000
            });
            res.status(200).json({message: 'Inicio de sesión exitoso.', user, token});
        } catch(error) {
            console.error('Error al iniciar sesión:', error.message);
            res.status(401).json({message: 'Credenciales invalidas.', error: error.message});
        }         
    }
}

module.exports = new AuthController();