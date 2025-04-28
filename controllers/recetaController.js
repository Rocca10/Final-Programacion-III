const { model } = require("mongoose");
const recetasModel = require("../models/recetaModel");

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

        if (receta) {
            res.json(receta);
        } else {
            res.status(404).json({ error: 'Receta no encontrada' });
        }
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

        if (updatedReceta) {
            res.status(200).json({ message: `Receta con ID ${id} actualizada correctamente`, updatedReceta });
        } else {
            res.status(404).json({ error: `Receta con ID ${id} no encontrada` });
        }
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al actualizar la receta' });
    }
}

const add = async (req, res) => {
    try {
        const nuevaReceta = req.body;
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
    const { ingredientes } = req.body; // IDs de ingredientes recibidos en el cuerpo de la solicitud
    try {
        const recetas = await recetasModel.buscarPorIngredientes(ingredientes);

        if (recetas.length > 0) {
            res.json(recetas);
        } else {
            res.status(404).json({ message: 'No se encontraron recetas con los ingredientes especificados' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al buscar las recetas' });
    }
};

const buscarPorTipoComida = async (req, res) => {
    try {
        let tipoComida = req.body.tipoComida;

        // Verifica si tipoComida está definido
        if (!tipoComida) {
            return res.status(400).json({ error: 'El parámetro tipoComida es requerido' });
        }

        // Si tipoComida es un string, conviértelo a array (maneja un solo valor o varios separados por comas)
        if (typeof tipoComida === 'string') {
            tipoComida = tipoComida.includes(',')
                ? tipoComida.split(',') // Si tiene coma, lo convierte en array
                : [tipoComida]; // Si no, lo convierte en un array con un solo valor
        }

        // Llama al modelo con el array de tipoComida
        const recetas = await recetasModel.buscarPorTipoComida(tipoComida);

        if (recetas.length > 0) {
            res.json(recetas);
        } else {
            res.status(404).json({ message: 'No se encontraron recetas para los tipos de comida especificados' });
        }
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

}
