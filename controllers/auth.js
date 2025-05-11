const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Usuario,getByName} = require('../models/usuarioModel'); // Importar correctamente

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Buscar el usuario en la base de datos
        const usuario  = await getByName(username);

        // Validar si el usuario existe
        if (!usuario) {
            return res.status(401).json({
                msg: "Credenciales inválidas !usuario"
            });
        }
        // Validar la contraseña
        const validPassword = await bcrypt.compare(password, usuario.password);
        if (!validPassword) {
            return res.status(401).json({
                msg: "Credenciales inválidas !password"
            });
        }
        // Generar el JWT con el id del usuario
        /* const token = await generarJWT(usuario._id); */ //Este andaba bien
        const token = await generarJWT(usuario);


        res.json({
            usuario: usuario.username,  // Aquí devuelves el nombre del usuario
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            msg: 'Error interno del servidor'
        });
    }
}

const generarJWT = (usuario) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id: usuario._id,
            username: usuario.username,
            role: usuario.role, // 👈 esto es lo importante
        };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '2h',
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });
};


module.exports = {
    login
}