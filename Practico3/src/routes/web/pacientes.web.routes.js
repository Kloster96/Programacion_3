const {Router} = require('express');
const pacientesController = require('../../controllers/web/pacientes.web.controller.js');
const pacientesWebRouter = Router();
const { requireLogin } = require('../../middleware/authMiddleware');

pacientesWebRouter.use(requireLogin);
pacientesWebRouter.get('/', pacientesController.listPacientes);
pacientesWebRouter.get('/nuevo', pacientesController.showNuevoPacienteForm);
pacientesWebRouter.post('/nuevo', pacientesController.crearPaciente);
pacientesWebRouter.get('/editar/:idPaciente', pacientesController.showEditarPacienteForm);
pacientesWebRouter.post('/editar/:idPaciente', pacientesController.editarPaciente);
pacientesWebRouter.post('/:idPaciente/baja', pacientesController.darBajaPaciente);

module.exports = pacientesWebRouter;