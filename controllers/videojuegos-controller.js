const {pool} = require('../config/baseDatos')


const obtenerVideojuegos = async(req, res) => {
    try {
        const consulta = 'SELECT * FROM videojuegos ORDER BY id ASC ';
        const resultado = await pool.query(consulta);
        res.json({
            exito:true,
            mensaje: 'Videojuegos obtenidos correctamente',
            data: resultado.rows,
            total: resultado.rows.length
        })

    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({// fallo en la solicitud
            exito: false,
            mensaje: 'Error al obtener los videojuegos',
            error: error.message
        }) 
    }
}

module.exports = {
    obtenerVideojuegos
}