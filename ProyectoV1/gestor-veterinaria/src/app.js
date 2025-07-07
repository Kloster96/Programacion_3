require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts'); 

const webRouter = require('./routes/index.routes');

class Server {
    constructor(template = process.env.TEMPLATE || "ejs"){
        this.app = express()
        this.port = process.env.PORT || 3001
        this.template = template;
        this.middleware()
        this.engine()
        this.rutas()
    }

    engine(template) {
        try{
            require.resolve(this.template);
            this.app.set('view engine',this.template);
            this.app.set('views', path.join(__dirname, 'src','views'));
            this.app.set('layout','layouts/main')
        } catch (error){
            console.log("Error al configurar el mottor de plantillas: ",template);
        }
    }

    middleware(){
        this.app.use(express.static(path.join(__dirname,'..','public')));
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use(expressLayouts);
    }

    rutas(){
        this.app.use('/',webRouter);
        this.app.set('views','./src/views');
        this.app.use((err,req,res,next) => {
            console.error(err.stack);
            res.status(500).render('error', { message: `Algo salió mal! ${err.message}`});
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en http://localhost:${this.port}`);
            console.log('Presiona CTRL+C para detener el servidor');
        });
    }
}

module.exports = Server;