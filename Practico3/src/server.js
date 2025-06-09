const express = require('express');
const dotenv = require('dotenv');
const rutaPacientes = require('./routes/pacientes.route.js');
const rutaTurnos = require('./routes/turnos.route.js');
const home = require('./routes/home.routes.js');
const morgan = require('morgan');
const turnosWeb = require('./routes/web/turnos.web.routes.js');
const pacientesWeb = require('./routes/web/pacientes.web.routes.js');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
dotenv.config();

class Server {
  constructor(template = process.env.TEMPLATE || 'ejs') {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.template = template;
    this.middleware();
    this.engine();
    this.rutas();
  }

  engine() {
    try {
      require.resolve(this.template);

      this.app.set('view engine', this.template);

      // ✅ Usa la carpeta según el template (ejs, pug, etc.)
      const viewsPath = path.join(__dirname, 'views', this.template);
      this.app.set('views', viewsPath);
      console.log('📁 Ruta absoluta de views:', viewsPath);

      // ✅ Si se usa EJS, se configura layout
      if (this.template === 'ejs') {
        this.app.set('layout', 'layouts/main');
        this.app.use(expressLayouts);
      }
    } catch (error) {
      console.log('❌ Error al configurar el motor de plantillas:', this.template);
    }
  }

  middleware() {
    const session = require('express-session');

    this.app.use(express.static(path.join(__dirname, '..', 'public')));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());

    this.app.use(
      session({
        secret: 'clave_super_secreta_123',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
      })
    );

    this.app.use((req, res, next) => {
      res.locals.user = req.session.user || null;
      next();
    });

    this.app.use(morgan('dev'));
  }

  rutas() {
    this.app.use('/', home);
    this.app.use('/api/v1/pacientes', rutaPacientes);
    this.app.use('/api/v1/turnos', rutaTurnos);

    const authWebRouter = require('./routes/web/auth.web.routes.js');
    this.app.use(authWebRouter); // Rutas de login/logout

    this.app.use('/turnos', turnosWeb);
    this.app.use('/pacientes', pacientesWeb);

    this.app.use((req, res) => {
      res.status(404).send('404 - Página no encontrada');
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(
        `🚀 Server running on port ${this.port}, host: ${process.env.HOST}:${this.port}`
      );
    });
  }
}

module.exports = Server;