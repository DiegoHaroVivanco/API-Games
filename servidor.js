const express = require('express');
const cors = require('cors');
require('dotenv').config()
const {testConexion} = require('./config/baseDatos')
const {obtenerVideojuegos, obtenerVideojuegoId, crearVideojuego, actualizarVideojuegoId} = require('./controllers/videojuegos-controller')

const app = express();
const puerto = process.env.PORT || 3000;

app.use(cors()); // Para que el servidor reciba peticiones desde otros dominios
app.use(express.json());

// app.get('/', (req, res)=>{
//     res.json({
//         mensaje: 'API de juegos funcionando.',
//         estado: 'Servidor activo'
//     })
// })

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>API GAMES</title>
            <style>
                html {
                    height: 100%;
                }
                body {
                    margin: 0;
                    background-color: bisque;
                    color: black;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    font-family: 'Courier New', Courier, monospace;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div>
                <h1>API de videojuegos funcionado</h1>
                <p>Servidor activo</p>
            </div>
        </body>
        </html>`)
})

app.get('/api/videojuegos', obtenerVideojuegos);
app.get('/api/videojuegos/:id', obtenerVideojuegoId);
app.post('/api/videojuegos', crearVideojuego);
app.put('/api/videojuegos/:id', actualizarVideojuegoId);


const iniciarServer = async ()=>{
    try {
        await testConexion();

        app.listen(puerto, () => {
            console.log(`Servidor escuchando en http://localhost:${puerto}`)
        })
    } catch (error) {
        console.error(error)
    }
}

iniciarServer();
