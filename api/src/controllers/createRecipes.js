const { Recipe, Diets } = require("../db");

// const createRecipes = async (req, res) => {
//     const { name, image, summary, healthScore, instructions, diets } = req.body;
//     try {
//         //busca si todos los datos tienen sus propiedades 
//         if (!name || !image || !summary || !healthScore || !instructions || !diets) {
//             res.status(404).send("Faltan datos por ingresar")
//         }
//         //crea una receta en la BD con los datos enviados por body
//         const recipe = await Recipe.create({ name, image, summary, healthScore, instructions })

//         //muestra todas las dietas que tengan relacion con la receta
//         const dietsType = await Diets.findAll({
//             where: {
//                 name: diets,
//             }
//         });
//         //relaciona las tipos de dietas con la receta
//         await recipe.addDiets(dietsType);
//         res.json(recipe)
//     } catch (error) {
//         console.error("Error al crear la receta:", error);
//         res.status(500).json({ error: error.messagge })
//     }
// };

// module.exports = createRecipes;

const createRecipes = async (name, image, summary, healthScore, instructions) => {

    //busca si todos los datos tienen sus propiedades 
    if (!name || !image || !summary || !healthScore || !instructions) {
        return "Faltan datos por ingresar"
    }
    //crea una receta en la BD con los datos enviados por body
    const recipe = await Recipe.findOrCreate({ where: { name }, defaults: { image, summary, healthScore, instructions } })
    //se fija si ya se creo esta receta y si se creo que me retorne con el string
    if(recipe[1] === false) return "Esta receta ya existe";
    return recipe[0];
};

module.exports = createRecipes;
