const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/init-models').initModels();

class AuthService {
    async register(username,email,password,role = 'user') {
        const existingUser = await User.findOne({
            where: {
                [require('sequelize').Op.or] : [{username: username}, {email: email}]
            }
        });
        if(existingUser) {
            if(existingUser.username === username) {
                throw new Error('El nombre de usuario ya esta en uso.');
            } else {
                throw new Error('El email ya esta registrado.');
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role
        });
        const userResponse = newUser.toJSON();
        delete userResponse.password;
        return userResponse;
    }

    async login(identifier, password) {
        const user = await User.findOne({
            where: {
                [require('sequelize').Op.or]: [{username: identifier}, {email: identifier}]
            }
        });
        if(!user) {
            throw new Error('Usuario o contraseña incorrecta.');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            throw new Error('Usuario o contraseña incorrecta.');
        }
        const token = jwt.sign({id: user.id, username: user.username, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );
        const userResponse = user.toJSON();
        delete userResponse.password;
        return {user: userResponse, token};
    }
}

module.exports = new AuthService();