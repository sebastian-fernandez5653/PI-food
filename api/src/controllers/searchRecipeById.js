const { Recipe, Diets } = require("../db")

const seachRecipeById = async (id) => {
    const recipe = await Recipe.findOne( { 
            where: {id},
            // se hace una consulta a la BD para encontrar una receta que coincida con el id enviado
            include: [Diets],
            // Se hace una relacioncon el modelo Diets para que Recipe incluya la informacion de Diets
        });
        if (!recipe) {
            return "Dieta no encontrada";
        } //Si no se encuentra ninguna recipe que coincida con el ID 
        return recipe
    };
module.exports = seachRecipeById;

