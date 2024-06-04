export const peliculaTableName = "pelicula";

export const PeliculaRepository = {
    GET_ALL: `SELECT id_pelicula, nombre_pelicula, fecha_estreno_pelicula, duracion_pelicula, id_categoria FROM ${peliculaTableName} ORDER BY id_pelicula ASC OFFSET $1 LIMIT $2;`,
    GET_BY_ID: `SELECT id_pelicula, nombre_pelicula, fecha_estreno_pelicula, duracion_pelicula, id_categoria FROM ${peliculaTableName} WHERE id_pelicula = $1;`,
    ADD: `INSERT INTO ${peliculaTableName}(nombre_pelicula, fecha_estreno_pelicula, duracion_pelicula, id_categoria) VALUES($1, $2, $3, $4) RETURNING id_pelicula;`,
    UPDATE: `UPDATE ${peliculaTableName} SET nombre_pelicula = $1, fecha_estreno_pelicula = $2, duracion_pelicula = $3, id_categoria = $4 WHERE id_pelicula = $5 RETURNING id_pelicula;`,
    DELETE: `DELETE FROM ${peliculaTableName} WHERE id_pelicula = $1 RETURNING id_pelicula;`,

    GET_BY_NAME: `SELECT id_pelicula, nombre_pelicula, fecha_estreno_pelicula, duracion_pelicula, id_categoria FROM ${peliculaTableName} WHERE nombre_pelicula = $1;`,
    DELETE_ALL: `DELETE FROM ${peliculaTableName}`
}