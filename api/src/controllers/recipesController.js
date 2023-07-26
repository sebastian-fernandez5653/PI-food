const axios = require("axios")
const { Op } = require("sequelize");
const { Recipe, Diets } = require("../db")
const { URL_RECIPES, API_KEY, API_KEY2 } = process.env

const cleanArray = (arr) => arr.map((e) => ({
    id: e.id,
    name: e.title,
    image: e.image,
    summary: e.summary,
    healthScore: e.healthScore,
    instructions: e.instructions,
    created: false,
}));

//Busca una receta por id
const searchRecipeById = async (id, source) => {
    //Busca una recipe con el mismo ID en la BDD
//     const flag = source === "api";
//     if(flag === "api"){
//         const results = await axios.get(`${URL_RECIPES}/${id}/information?apiKey=${API_KEY2}&number=100&addRecipeInformation=true`)
//         const recipe = cleanArray(results);
//         return recipe;
//     } return await Recipe.findByPk(id)
// };

    const recipe = source === "api"
        ? (await axios.get(`${URL_RECIPES}/${id}/information?apiKey=${API_KEY2}&number=100&addRecipeInformation=true`)).data
        : await Recipe.findByPk(id)
        
    return recipe;
};

const searchRecipeByName = async (name) => {
    //Busca en la BDD alguna receta con el mismo nombre enviado por query 
    const recipe = await Recipe.findAll({
        where: {
            name: {
                // Busca con el operador "iLike" el name ignorando si tiene mayusculas o minusculas
                [Op.iLike]: `%${name}%`
            },
        },
        include: [Diets]
    });
    //Hace una peticion a la api buscando alguna recipe que coincida
    const {results} = (await axios.get(`${URL_RECIPES}/complexSearch?query=${name}&addRecipeInformation=true&number=100&apiKey=${API_KEY2}`)).data;
    const recipes = cleanArray(results);

    //Busca con el metodo filter una recipe que coincida con el nombre enviado,
    //sin mirar si tiene mayusculas o minuscular
    const searchRecipe = recipes.filter((recipe) => recipe.name.toLowerCase().includes(name.toLowerCase()));
    // Se fija si recibio algo en recipe o en searchRecipe, y si encontro 
    // Una receta en alguno de los dos la devuelve

    return searchRecipe || recipe ? [...searchRecipe, ...recipe] : `No se encontro ninguna dieta con el nombre: ${name}`;

    // instructions: ele.analyzedInstructions.reduce(
    //     (accumulator, instruction) => {
    //       const steps = instruction.steps.map((step) => step.step);
    //       return accumulator.concat(steps.join(" "));
    //     },
    //     ""
    //   ),
};

const createRecipes = async (name, image, summary, healthScore, instructions, diets) => {
    // Busca si todos los datos tienen sus propiedades 
    if (!name || !image || !summary || !healthScore || !instructions) {
        return "Faltan datos por ingresar";
    }
        // Crea una receta en la BD con los datos enviados por body
        // const recipe = await Recipe.findOrCreate({
        //     where: { name },
        //     defaults: { image, summary, healthScore, instructions}
        // });
        const recipe = await Recipe.create({
            name, image, summary, healthScore, instructions
        })
        recipe.addDiets(diets);

        // Se fija si ya se creó esta receta y si se creó, devuelve el string
        // if (recipe[1] === false) return "Esta receta ya existe";
        // return recipe[0];
        return recipe;

};
module.exports = { searchRecipeById, searchRecipeByName, createRecipes };
