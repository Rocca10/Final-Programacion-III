import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const CrearReceta = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    tipoComida: '',
    tipoCocina: '',
    metodoCoccion: '',
    tiempoPreparacion: '',
    nivelDificultad: '',
    ingredientePrincipal: '',
    temporada: '',
    foto: '',
    ingredientes: []
  });

  const [ingredientesDisponibles, setIngredientesDisponibles] = useState([]);
  const [nuevoIngrediente, setNuevoIngrediente] = useState({ ingrediente: '', cantidad: '', unidad: '' });
  const UNIDADES_VALIDAS = ['unidades', 'gramos', 'kg', 'ml', 'lt', 'tazas', 'cucharadas', 'hojas'];


useEffect(() => {
  const fetchIngredientes = async () => {
    try {
      const res = await api.get('/ingredientes');
      const ordenados = res.data.sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
      );
      setIngredientesDisponibles(ordenados);
    } catch (err) {
      console.error(err);
    }
  };
  fetchIngredientes();
}, []);


const handleAddIngrediente = () => {
  const { ingrediente, cantidad, unidad } = nuevoIngrediente;

  if (ingrediente && cantidad && unidad) {
    const cantidadNumerica = parseFloat(cantidad);
    if (isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
      alert('Por favor, ingresá una cantidad válida.');
      return;
    }

    setForm((prev) => ({
      ...prev,
      ingredientes: [
        ...prev.ingredientes,
        {
          ingrediente, // <-- ESTE CAMPO ES EL CORRECTO
          cantidad: cantidadNumerica,
          unidad
        }
      ]
    }));

    setNuevoIngrediente({ ingrediente: '', cantidad: '', unidad: '' });
  }
};


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Form que se envía:', form); // 🔍
  try {
    await api.post('/recetas', form);
    alert('Receta creada con éxito');
    navigate('/recetas');
  } catch (error) {
    console.error('Error al crear receta:', error);
    alert('Error al crear receta');
  }
};


  return (
    <>
    <Navbar/>
    <div className="container pt-5 mt-5">
      <h2 className="mb-4">Crear Nueva Receta 🍽️</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input className="form-control" name="nombre" value={form.nombre} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Tipo de Comida</label>
          <select className="form-select" name="tipoComida" onChange={handleChange} required>
            <option value="">Seleccionar</option>
            <option>Entradas</option>
            <option>Platos principales</option>
            <option>Postres</option>
            <option>Aperitivos</option>
            <option>Sopas</option>
            <option>Ensaladas</option>
            <option>Bebidas</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Tipo de Cocina</label>
          <select className="form-select" name="tipoCocina" onChange={handleChange} required>
            <option value="">Seleccionar</option>
            <option>Cocina Italiana</option>
            <option>Cocina Mexicana</option>
            <option>Cocina China</option>
            <option>Cocina Japonesa</option>
            <option>Cocina India</option>
            <option>Cocina Mediterránea</option>
            <option>Cocina Francesa</option>
            <option>Cocina Española</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Método de Cocción</label>
          <select className="form-select" name="metodoCoccion" onChange={handleChange} required>
            <option value="">Seleccionar</option>
            <option>Al horno</option>
            <option>A la parrilla</option>
            <option>A la plancha</option>
            <option>Frito</option>
            <option>Hervido</option>
            <option>Al vapor</option>
            <option>Crudo</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Tiempo de Preparación</label>
          <select className="form-select" name="tiempoPreparacion" onChange={handleChange} required>
            <option value="">Seleccionar</option>
            <option>Menos de 15 minutos</option>
            <option>Entre 15 y 30 minutos</option>
            <option>Entre 30 minutos y 1 hora</option>
            <option>Más de 1 hora</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Dificultad</label>
          <select className="form-select" name="nivelDificultad" onChange={handleChange} required>
            <option value="">Seleccionar</option>
            <option>Fácil</option>
            <option>Intermedio</option>
            <option>Difícil</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Ingrediente Principal</label>
          <select className="form-select" name="ingredientePrincipal" onChange={handleChange} required>
            <option value="">Seleccionar</option>
            <option>Carne</option>
            <option>Pollo</option>
            <option>Pescado</option>
            <option>Verduras</option>
            <option>Frutas</option>
            <option>Granos</option>
            <option>Mariscos</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Temporada</label>
          <select className="form-select" name="temporada" onChange={handleChange}>
            <option value="">Seleccionar</option>
            <option>Verano</option>
            <option>Invierno</option>
            <option>Primavera</option>
            <option>Otoño</option>
            <option>Todo el año</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Foto (URL)</label>
          <input className="form-control" name="foto" value={form.foto} onChange={handleChange} required />
        </div>

        <hr />
        <h5>Agregar Ingredientes</h5>
        <div className="row g-2 align-items-end">
          <div className="col-md-5">
            <select className="form-select" value={nuevoIngrediente.ingrediente} onChange={(e) => setNuevoIngrediente({ ...nuevoIngrediente, ingrediente: e.target.value })}>
              <option value="">Seleccionar ingrediente</option>
              {ingredientesDisponibles.map((ing) => (
                <option key={ing._id} value={ing._id}>{ing.nombre}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Cantidad"
              value={nuevoIngrediente.cantidad}
              onChange={(e) => setNuevoIngrediente({ ...nuevoIngrediente, cantidad: e.target.value })}
              />
          </div>
          <div className="col-md-3">
            <select className="form-select" value={nuevoIngrediente.unidad} onChange={(e) => setNuevoIngrediente({ ...nuevoIngrediente, unidad: e.target.value })}>
              <option value="">Seleccionar Unidad</option>
              <option>unidades</option>
              <option>gramos</option>
              <option>kg</option>
              <option>ml</option>
              <option>lt</option>
              <option>tazas</option>
              <option>cucharadas</option>
               <option>hojas</option>
            </select>
          </div>
          <div className="col-md-1">
            <button type="button" className="btn btn-primary w-100" onClick={handleAddIngrediente}>+</button>
          </div>
        </div>

        {form.ingredientes.length > 0 && (
<ul className="list-group mt-3">
  {form.ingredientes.map((i, idx) => {
    const ing = ingredientesDisponibles.find((x) => x._id === i.ingrediente);
    return (
<li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
  <div className="d-flex align-items-center gap-3">
    {ing?.foto && (
      <img
        src={ing.foto}
        alt={ing.nombre}
        style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }}
      />
    )}
    <span>{ing?.nombre} - {i.cantidad} {i.unidad}</span>
  </div>
  <button
    type="button"
    className="btn btn-sm btn-outline-danger"
    onClick={() => {
      setForm((prev) => ({
        ...prev,
        ingredientes: prev.ingredientes.filter((_, i2) => i2 !== idx)
      }));
    }}
  >
    🗑️
  </button>
</li>

    );
  })}
</ul>

        )}

        <button type="submit" className="btn btn-success mt-4">Guardar Receta</button>
      </form>
    </div>
        </>
  );
};

export default CrearReceta;
