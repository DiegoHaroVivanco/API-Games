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

const crearVideojuego = async (req, res) =>{
    try {
        const {nombre, genero, plataforma, precio, fecha_lanzamiento,
                desarrollador, descripcion} = req.body;
        
        if(!nombre || !genero || !plataforma || !precio){
            return res.status(400).json({
                exito: false,
                mensaje: 'Los campos nombre, género, plataforma y precio son obligatorios'
            })
        }
        const consulta = `INSERT INTO videojuegos (nombre, genero, plataforma, precio, 
                        fecha_lanzamiento, desarrollador, descripcion) VALUES ($1, $2, $3, $4, $5, $6, $7)
                        RETURNING *`;

        const valores = [nombre, genero, plataforma, precio, fecha_lanzamiento, desarrollador, descripcion];
        const resultado = await pool.query(consulta, valores)
        res.status(201).json({
            exito: true,
            mensaje: 'Videojuego creado exitosamente',
            data: resultado.rows[0]
        })     


    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({// fallo en la solicitud
            exito: false,
            mensaje: 'Error al crear el videojuego',
            error: error.message
        }) 
    }
}

const actualizarVideojuegoId = async (req, res) => {
    try {
        
        const {id} = req.params;
        const {nombre, genero, plataforma, precio, fecha_lanzamiento,
        desarrollador, descripcion} = req.body;
        if(!nombre || !genero || !plataforma || !precio){
            return res.status(400).json({
                exito: false,
                mensaje: 'Los campos nombre, género, plataforma y precio son obligatorios'
            })
        }

        const consulta = `UPDATE videojuegos
                        SET nombre = $1, genero = $2, plataforma = $3, precio = $4, 
                        fecha_lanzamiento = $5, desarrollador = $6, descripcion = $7
                        WHERE id = $8
                        RETURNING *
        `;
        const valores = [nombre, genero, plataforma, precio, fecha_lanzamiento, desarrollador, descripcion, id];
        const resultado = await pool.query(consulta, valores)
        if(resultado.rows.length === 0){
            return res.status(404).json({
                exito: false,
                mensaje: 'Videojuego no encontrado'
            })
        }
        res.status(201).json({
            exito: true,
            mensaje: 'Videojuego actualizado exitosamente',
            data: resultado.rows[0]
        })    

    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({// fallo en la solicitud
            exito: false,
            mensaje: 'Error al actualizar el videojuego',
            error: error.message
        }) 
    }
}


module.exports = {
    obtenerVideojuegos,
    obtenerVideojuegoId,
    crearVideojuego,
    actualizarVideojuegoId
}