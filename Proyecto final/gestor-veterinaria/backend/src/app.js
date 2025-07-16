require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { sequelize } = require('./config/database');
const { initModels, syncModels } = require('./models/init-models');

//require('./models/postgreSQL/dueno');
//require('./models/postgreSQL/mascota');
//require('./models/postgreSQL/user');

const duenosRouter = require('./routes/duenos.routes');
const mascotasRouter = require('./routes/mascotas.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3001;
        this.paths = {
            duenos: '/api/duenos',
            mascotas: '/api/mascotas',
            auth: '/api/auth',
            users: '/api/users',
        };
        this.middleware();
        this.rutas();
    }

    middleware() {
        const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
        console.log(`DEBUG (Backend CORS): Configurando CORS con origen: ${corsOrigin}`);
        this.app.use(cors({
            origin: corsOrigin,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true
        }));
        this.app.use(bodyParser.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(morgan('dev'));
    }

    rutas() {
        this.app.use(this.paths.duenos, duenosRouter);
        this.app.use(this.paths.mascotas, mascotasRouter);
        this.app.use(this.paths.auth, authRoutes);
        this.app.use(this.paths.users, userRoutes);

        this.app.get('/', (req, res) => {
            res.send('Bienvenido a la API de la Veterinaria');
        });

        this.app.get('/health', async(req, res) => {
            try {
                await sequelize.authenticate();
                res.status(200).json({ status: 'ok', database: 'connected' });
            } catch (error) {
                console.error('Health check failed:', error);
                res.status(500).json({ status: 'error', database: 'disconnected', message: error.message });
            }
        });

        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            const statusCode = (typeof err.status === 'number' && err.status >= 100 && err.status < 600) ?
                err.status :
                500;
            res.status(statusCode).json({
                success: false,
                message: err.message || 'Error interno del servidor.'
            });
        });
    }

    async listen() {
        try {
            initModels();
            await syncModels();
            this.app.listen(this.port, () => {
                console.log(`Servidor corriendo en http://localhost:${this.port}`);
                console.log('Presiona Ctrl+C para detener el servidor.');
            });
        } catch (error) {
            console.error('Error al iniciar el servidor:', error);
            process.exit(1);
        }

    }
}

module.exports = Server;