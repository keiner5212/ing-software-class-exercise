import { peliculaTableName } from "./PeliculasRepository";

export const categoryTableName = "categoria";

export const CategoriaRepository = {
	GET_ALL: `SELECT id_categoria, nombre_categoria FROM ${categoryTableName} ORDER BY id_categoria ASC;`,
	GET_BY_ID: `SELECT id_categoria, nombre_categoria FROM ${categoryTableName} WHERE id_categoria = $1;`,
	ADD: `INSERT INTO  ${categoryTableName}(nombre_categoria) VALUES($1) RETURNING id_categoria;`,
	UPDATE: `UPDATE  ${categoryTableName} SET nombre_categoria = $1 WHERE id_categoria = $2 RETURNING id_categoria;`,
	DELETE: `DELETE FROM  ${categoryTableName} WHERE id_categoria = $1 RETURNING id_categoria;`,

	GET_BY_NAME: `SELECT id_categoria, nombre_categoria FROM ${categoryTableName} WHERE nombre_categoria = $1;`,

	GET_MOVIES_BY_CATEGORY: `SELECT id_pelicula, nombre_pelicula, fecha_estreno_pelicula, duracion_pelicula, id_categoria FROM ${peliculaTableName} WHERE id_categoria = $1;`
};
