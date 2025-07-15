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

const obtenerVideojuegoId = async (req, res) =>{
    try {
        const {id} = req.params;
        const consulta = 'SELECT * FROM videojuegos WHERE id = $1';
        const resultado = await pool.query(consulta, [id])
        
        if(resultado.rows.length === 0){
            return res.status(404).json({
                exito: false,
                mensaje: 'Videojuego no encontrado'
            })
        }
        res.json({
            exito: true,
            mensaje: 'Videojuego encontrado',
            data: resultado.rows[0]
        })

    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({// fallo en la solicitud
            exito: false,
            mensaje: 'Error al obtener el videojuego',
            error: error.message
        }) 
    }
}



module.exports = {
    obtenerVideojuegos,
    obtenerVideojuegoId
}