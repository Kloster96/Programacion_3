const express = require('express');
const router = express.Router();

const homeRouter = require('./home.routes');
const duenoRouter = require('./duenos.routes');
const mascotaRouter = require('./mascotas.routes');

router.use('/',homeRouter);
router.use('/duenos',duenoRouter);
router.use('/mascotas',mascotaRouter);

router.use((req,res,next) => {
    res.status(404).render('error',{message: 'Página no encontrada.'})
});

module.exports = router;