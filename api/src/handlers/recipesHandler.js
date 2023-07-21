const createRecipes = require("../controllers/createRecipes");
const seachRecipeById = require("../controllers/searchRecipeById");
const searchRecipeByName = require("../controllers/searchRecipeByName");


const searchRecipeByIdHandler = async(req, res) => {
    const {id} = req.params;
    try {
        const recipesId = await seachRecipeById(id);
        if(!recipesId) res.status(404).json({error: error.message})
        res.status(200).json(recipesId);
    } catch (error) {
        res.status(500).json({ error: error.messagge });
    }
};

const searchRecipeByNameHandler = async(req, res) => {
    const { name } = req.query
    try {
        const searchRecipeName = await searchRecipeByName(name);
        if(!seachRecipeById) res.status(404).json({ message: "Nombre de receta no encontrada" });
        res.status(200).json(searchRecipeName)
    } catch (error) {
        res.status(500).json({ error: error.messagge });
    } 
};

const createRecipesHandler = async(req, res) => {
    const { name, image, summary, healthScore, instructions, diets } = req.body;
    try {
        const createRecipe = await createRecipes(name, image, summary, healthScore, instructions, diets);
        if(!createRecipe) res.status(404).json({error: messagge})
        console.log(createRecipe);
        res.status(200).json(createRecipe)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error})
    }
};

module.exports = {searchRecipeByIdHandler, searchRecipeByNameHandler, createRecipesHandler};