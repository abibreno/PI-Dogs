const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const getDogs = require ("./getDogs");
const getDogById = require ("./getDogById");
const createDog = require ("./createDog");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', getDogs);
router.use('/', getDogById);
router.use('/', createDog);

module.exports = router;
