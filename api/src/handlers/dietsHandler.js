// const searchDiets = require("../controllers/searchDiets");
const { Diets } = require("../db")

const searchDietsHandler = async(req, res) => {
    try{
        const typesDiet = await Diets.findAll();
        console.log(typesDiet);
        res.status(200).json(typesDiet);
    } catch (error){
        
        res.status(500).json({error: error.messagge});
    }
}

module.exports = {searchDietsHandler};