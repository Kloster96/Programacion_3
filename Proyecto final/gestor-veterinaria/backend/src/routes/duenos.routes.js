const express = require('express');
const router = express.Router();

const duenoController = require('../controllers/duenos.controller');
const authMiddleware = require('../../middleware/authMiddleware');

router.get('/', authMiddleware.protect, duenoController.index);
router.post('/', authMiddleware.protect, authMiddleware.authorizeRoles('admin'), duenoController.create);
router.get('/:id', authMiddleware.protect, duenoController.showById);
router.put('/:id', authMiddleware.protect, authMiddleware.authorizeRoles('admin'), duenoController.update);
router.delete('/:id',authMiddleware.protect, authMiddleware.authorizeRoles('admin'), duenoController.delete);

module.exports = router;