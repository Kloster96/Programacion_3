const express = require('express');
const router = express.Router();
const personaController = require('../controllers/personas.controller');

router.get('/personas',personaController.getAllPersonas);

module.exports = router;