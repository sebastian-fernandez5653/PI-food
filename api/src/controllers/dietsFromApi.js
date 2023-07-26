const { Diets } = require("../db");
const axios = require("axios");
const URL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=";
const {API_KEY} = process.env;

// Función para obtener las dietas de la API y guardarlas en la base de datos
const dietsFromApi = async () => {
    try {
        const {results} = (await axios.get(`${URL}${API_KEY}&addRecipeInformation=true&number=100`)).data;

        const dietsTypes = results.map(recipe => recipe.diets).flat(); // Obtener todos los tipos de dietas de las recetas
        const uniqueDiets = Array.from(new Set(dietsTypes)); // Eliminar duplicados

        // Crear las dietas en la base de datos
        const createDiets = uniqueDiets.map(name => Diets.create({ name }));
        Promise.all(createDiets);

        console.log("Dietas precargadas en la base de datos:", uniqueDiets);
    } catch (error) {
        console.error("Error al obtener las dietas desde la API:", error.message);
    }
};

module.exports = {dietsFromApi};