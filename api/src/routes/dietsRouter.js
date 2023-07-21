const { Router } = require('express');
const searchDiets = require("../controllers/searchDiets");
const dietsRouter = Router();

dietsRouter.get("/", searchDiets)

module.exports = dietsRouter;