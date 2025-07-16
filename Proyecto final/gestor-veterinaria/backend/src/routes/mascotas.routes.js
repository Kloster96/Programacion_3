const express = require('express');
const router = express.Router();

const mascotaController = require('../controllers/mascota.controller');
const authMiddleware = require('../../middleware/authMiddleware');

router.get('/', authMiddleware.protect, mascotaController.index);
router.post('/', authMiddleware.protect, authMiddleware.authorizeRoles('admin'), mascotaController.create);
router.get('/:id', authMiddleware.protect, mascotaController.showById);
router.put('/:id', authMiddleware.protect, authMiddleware.authorizeRoles('admin'), mascotaController.update);
router.delete('/:id',authMiddleware.protect, authMiddleware.authorizeRoles('admin'), mascotaController.delete);

module.exports = router;