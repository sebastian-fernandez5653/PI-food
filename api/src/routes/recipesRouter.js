const { Router } = require('express');
const recipesRouter = Router();

const {searchRecipeByIdHandler, searchRecipeByNameHandler, createRecipesHandler} = require("../handlers/recipesHandler")

recipesRouter.get("/:id", searchRecipeByIdHandler)
recipesRouter.get("/", searchRecipeByNameHandler)
recipesRouter.post("/", createRecipesHandler)

module.exports = recipesRouter;