const express = require('express')
const router = express.Router()
const {getAll, getById, deleteById, updateById, add, buscarRecetasPorIngredientes, buscarPorTipoComida , calcularCostoReceta} = require("../controllers/recetaController");
const { validarJwt, validarAdmin } = require('../middlewares/validation');

router.get('/', getAll);
router.get('/all', getAll);
router.get('/:id',[validarJwt], getById);
router.delete('/:id',[validarJwt,validarAdmin], deleteById);
router.put('/:id',[validarJwt,validarAdmin], updateById);
router.post('/',[validarJwt,validarAdmin], add);
router.post('/buscarPorIngredientes', buscarRecetasPorIngredientes);
router.post('/buscarPorTipoComida', buscarPorTipoComida);
router.get('/calcularCostoReceta/:id', calcularCostoReceta);


module.exports = router;