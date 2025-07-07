const express = require('express');
const router = express.Router();

const duenoWebController = require('../controllers/web/duenos.web.controller');

router.get('/', duenoWebController.list);
router.get('/crear',duenoWebController.createForm);
router.post('/crear',duenoWebController.create);
router.get('/editar/:id',duenoWebController.editForm);
router.post('/editar/:id',duenoWebController.update);
router.post('/eliminar/:id',duenoWebController.delete);

module.exports = router;