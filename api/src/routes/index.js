const { Router } = require('express');
const router = Router();

const recipesRouter = require('./recipesRouter');
const dietsRouter = require('./dietsRouter');

router.use("/recipes", recipesRouter);
router.use("/diets", dietsRouter);

module.exports = router;
