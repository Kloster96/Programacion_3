const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();
router.get('/', authMiddleware.protect, authMiddleware.authorizeRoles('admin'), userController.getUsers);
router.get('/:id', authMiddleware.protect, authMiddleware.authorizeRoles('admin'), userController.getUserById);
router.put('/:id', authMiddleware.protect, authMiddleware.authorizeRoles('admin'), userController.updateUserProfile);
router.delete('/:id', authMiddleware.protect, authMiddleware.authorizeRoles('admin'), userController.deleteUser);

module.exports = router;