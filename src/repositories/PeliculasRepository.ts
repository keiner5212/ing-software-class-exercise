const tableName = "pelicula";

export const PeliculaRepository = {
    GET_ALL: `SELECT id_pelicula, nombre_pelicula, fecha_estreno_pelicula, duracion_pelicula, id_categoria FROM ${tableName} ORDER BY id_pelicula ASC;`,
    GET_BY_ID: `SELECT id_pelicula, nombre_pelicula, fecha_estreno_pelicula, duracion_pelicula, id_categoria FROM ${tableName} WHERE id_pelicula = $1;`,
    ADD: `INSERT INTO ${tableName}(nombre_pelicula, fecha_estreno_pelicula, duracion_pelicula, id_categoria) VALUES($1, $2, $3, $4) RETURNING id_pelicula;`,
    UPDATE: `UPDATE ${tableName} SET nombre_pelicula = $1, fecha_estreno_pelicula = $2, duracion_pelicula = $3, id_categoria = $4 WHERE id_pelicula = $5;`,
    DELETE: `DELETE FROM ${tableName} WHERE id_pelicula = $1;`
}