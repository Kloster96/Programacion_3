const personasModel = require('../models/persona.model');

const getAllPersonas = (req, res) => {
    const personas = personasModel.getAllPersonas();
    console.log('Enviando datos de personas:', personas);
    res.json(personas);
}

module.exports = {
    getAllPersonas
};