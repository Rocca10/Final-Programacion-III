const express = require('express');
const mongoose = require('mongoose');
const ingredientesRoutes = require('./routes/ingredientes');
const usuariosRoutes = require('./routes/usuarios'); 
const recetasRoutes = require('./routes/recetas');
const comentariosRoutes = require('./routes/comentarios');
const cors = require('cors'); // Asegúrate de instalarlo: npm install cors




class Server {

    constructor() {
        this.port = process.env.PORT ;
        this.app = express();
        this.cargarMiddlewares();
        this.cargarRutas();
        this.conectarABD();
    }

   listen() {
        this.app.listen(this.port,() => {
            console.log(`Server is listening on port ${this.port}`);
        });
    }

cargarMiddlewares() {
    this.app.use(cors({
        origin: 'http://localhost:5173', // Cambia este valor por la URL de tu frontend
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
        allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
    }));
    this.app.use(express.json());
}


    cargarRutas() {
        this.app.use("/api/ingredientes", require('./routes/ingredientes'));
        this.app.use("/api/usuarios", require('./routes/usuarios'));
        this.app.use("/api", require('./routes/auth'));
        this.app.use("/api/recetas", require('./routes/recetas'));
        this.app.use("/api/comentarios", require('./routes/comentarios'));
    }

    conectarABD() {
       mongoose.connect(process.env.MONG_URI)
       .then(() => {
         console.log('Connecting to the database...', process.env.PORT)
       })
       .catch((err) => {
        console.log(`error connecting to the database ${err}`);
       });
    }
}

module.exports = Server;    