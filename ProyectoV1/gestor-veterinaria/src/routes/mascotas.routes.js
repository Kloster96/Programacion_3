const express = require('express');
const router = express.Router();

const mascotaWebController = require('../controllers/web/mascota.web.controller');

router.get('/',mascotaWebController.list);
router.get('/crear',mascotaWebController.createForm);
router.post('/crear',mascotaWebController.create);
router.get('/editar/:id',mascotaWebController.editForm);
router.post('/editar/:id',mascotaWebController.update);
router.post('/eliminar/:id',mascotaWebController.delete);

module.exports = router;