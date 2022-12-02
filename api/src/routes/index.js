const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const getDogs = require("./getDogs");
const getDogById = require("./getDogById");
const createDog = require("./createDog");
const tempRoute = require("./tempRoute");
const deleteDog = require("./deleteDog");


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", getDogs);
router.use("/", getDogById);
router.use("/", createDog);
router.use("/", tempRoute);
router.use("/", deleteDog);

module.exports = router;
