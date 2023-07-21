const { Op } = require("sequelize");
const { Recipe, Diets } = require("../db");

const searchRecipeByName = async (name) => {
        const recipe = await Recipe.findAll({
            where: {
                name: {
        // Busca con el operador "iLike" el name ignorando si tiene mayusculas o minusculas
                    [Op.iLike]: `%${name}%`
                },
                
            },
            include: [Diets]
        })
        //busca todas las recetas que coincidan con el nombre enviado por query
        if(!recipe.length) return `No se encontro ninguna dieta con el nombre: ${name}`
        return recipe;
};

module.exports = searchRecipeByName;