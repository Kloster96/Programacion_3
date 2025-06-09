const express = require('express');
const router = express.Router();
const authController = require('../../controllers/web/auth.web.controller.js');

router.get('/login', authController.showLoginForm);
router.post('/login', authController.login);

router.get('/register', authController.showRegisterForm);
router.post('/register', authController.register);

router.get('/verificar-token', authController.showTokenVerificationForm);
router.post('/verificar-token', authController.verifyToken);

router.get('/logout', authController.logout);

module.exports = router;