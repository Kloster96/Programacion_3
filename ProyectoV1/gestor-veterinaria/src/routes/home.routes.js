const express = require('express');
const router = express.Router();

const homeWebController = require('../controllers/web/home.web.controller');

router.get('/', homeWebController.index);

module.exports = router;

