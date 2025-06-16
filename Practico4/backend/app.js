const express = require('express');
const cors = require("cors");
require('dotenv').config();
const personaRouter = require('./routes/persona.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', personaRouter);
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Personas');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`API de personas disponible en http://localhost:${PORT}/api/personas`);
});