const {createRecipes, searchRecipeById, searchRecipeByName} = require("../controllers/recipesController");

const searchRecipeByIdHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api" 
    try {
        const recipesId = await searchRecipeById(id, source);
        res.status(200).json(recipesId);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.messagge });
    }
};

const searchRecipeByNameHandler = async (req, res) => {
    const { name } = req.query
    try {
        const searchRecipeName = await searchRecipeByName(name);
        if (!searchRecipeName) res.status(404).json({ message: "Nombre de receta no encontrada" });
        res.status(200).json(searchRecipeName)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.messagge });
    }
};

const createRecipesHandler = async (req, res) => {
    const { name, image, summary, healthScore, instructions, diets } = req.body;
    if (!name || !image || !summary || !healthScore || !instructions ||  !diets) res.status(400).send("Faltan datos por enviar")
    try {
        const createRecipe = await createRecipes(name, image, summary, healthScore, instructions, diets);
        res.status(200).json(createRecipe)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error })
    }
};

module.exports = { searchRecipeByIdHandler, searchRecipeByNameHandler, createRecipesHandler };