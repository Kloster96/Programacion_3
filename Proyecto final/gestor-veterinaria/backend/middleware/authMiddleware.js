const jwt = require('jsonwebtoken');
const {User} = require('../src/models/init-models').initModels();

class AuthMiddleware {
    async protect(req, res, next) {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await User.findByPk(decoded.id, {
                    attributes: ['id', 'username', 'email', 'role']
                });
                next();
            } catch (error) {
                console.error('Error de autenticación (token invalido/expirado):', error);
                return res.status(401).json({ message: 'No autorizado, token fallido o expirado.' });
            }
        } else if (req.cookies && req.cookies.token) {
            try {
                token = req.cookies.token;
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await User.findByPk(decoded.id, {
                    attributes: ['id', 'username', 'email', 'role']
                });
                if (!req.user) {
                    return res.status(401).json({ message: 'Token inválido, usuario no encontrado (cookie).' });
                }
                next();
            } catch (error) {
                console.error('Error de autenticación (cookie inválido/expirado):', error);
                return res.status(401).json({ message: 'No autorizado, cookie de token fallida o expirada.' })
            }
        }

        if (!token) {
            return res.status(401).json({ message: 'No autorizado, token no encontrado.' });
        }
    }

    authorizeRoles(...roles) {
        return (req, res, next) => {
            if (!req.user || !roles.includes(req.user.role)) {
                return res.status(403).json({ message: `Acceso denegado. Se requiere uno de los siguientes roles: ${roles.join(', ')}.` })
            }
            next();
        };
    }
}

module.exports = new AuthMiddleware();