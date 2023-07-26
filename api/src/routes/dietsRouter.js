const { Router } = require('express');
const dietsRouter = Router();
const {searchDietsHandler} = require("../handlers/dietsHandler");
const  {dietsFromApi} = require("../controllers/dietsFromApi");

dietsRouter.get("/", searchDietsHandler)


// Precargar la base de datos con las dietas de la API si no hay ninguna
// dietsFromApi()

module.exports = dietsRouter;