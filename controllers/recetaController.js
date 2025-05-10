const { model } = require("mongoose");
const recetasModel = require("../models/recetaModel");
const { buscarImagenUnsplash } = require("../services/unsplashService"); 

const getAll = async (req, res) => {
    try {
        const recetas = await recetasModel.getAll();
        res.json(recetas);
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener las recetas' });
    }
}

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const receta = await recetasModel.getById(id);
        receta ? res.json(receta) : res.status(404).json({ error: 'Receta no encontrada' });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener la receta' });
    }
}

const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        await recetasModel.deleteById(id);
        res.status(200).json({ message: `Receta con ID ${id} eliminada correctamente` });
    } catch (error) {
        res.status(404).json({ error: `Receta con ID ${id} no encontrada` });
    }
};

const updateById = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedReceta = await recetasModel.updateById(id, req.body);
        updatedReceta
            ? res.status(200).json({ message: `Receta con ID ${id} actualizada correctamente`, updatedReceta })
            : res.status(404).json({ error: `Receta con ID ${id} no encontrada` });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al actualizar la receta' });
    }
};

const add = async (req, res) => {
    try {
        const nuevaReceta = req.body;

        if (!nuevaReceta.foto || nuevaReceta.foto.trim() === '') {
            const imagenAI = await buscarImagenUnsplash(nuevaReceta.nombre);
            nuevaReceta.foto = imagenAI || `https://ui-avatars.com/api/?name=${encodeURIComponent(nuevaReceta.nombre)}&background=random`;
        }

        const recetaAgregada = await recetasModel.add(nuevaReceta);
        res.status(201).json({
            message: 'Receta agregada exitosamente',
            receta: recetaAgregada
        });
    } catch (error) {
        res.status(500).json({
            message: 'Hubo un error al agregar la receta',
            error: error.message
        });
    }
};

const buscarRecetasPorIngredientes = async (req, res) => {
    const { ingredientes } = req.body;
    try {
        const recetas = await recetasModel.buscarPorIngredientes(ingredientes);
        recetas.length > 0
            ? res.json(recetas)
            : res.status(404).json({ message: 'No se encontraron recetas con los ingredientes especificados' });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al buscar las recetas' });
    }
};

const buscarPorTipoComida = async (req, res) => {
    try {
        let tipoComida = req.body.tipoComida;
        if (!tipoComida) return res.status(400).json({ error: 'El parámetro tipoComida es requerido' });

        if (typeof tipoComida === 'string') {
            tipoComida = tipoComida.includes(',') ? tipoComida.split(',') : [tipoComida];
        }

        const recetas = await recetasModel.buscarPorTipoComida(tipoComida);
        recetas.length > 0
            ? res.json(recetas)
            : res.status(404).json({ message: 'No se encontraron recetas para los tipos de comida especificados' });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al buscar las recetas', detalle: error.message });
    }
};

const calcularCostoReceta = async (req, res) => {
    try {
        const { id } = req.params;
        const { detallesIngredientes, costoTotal } = await recetasModel.calcularCostoReceta(id);
        res.json({ detallesIngredientes, costoTotal });
    } catch (error) {
        res.status(500).json({ error: 'Error al calcular el costo de la receta', message: error.message });
    }
};

module.exports = {
    getAll,
    getById,
    deleteById,
    updateById,
    add,
    buscarRecetasPorIngredientes,
    buscarPorTipoComida,
    calcularCostoReceta
};
