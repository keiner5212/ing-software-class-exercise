const tableName = "categoria";

export const CategoriaRepository = {
	GET_ALL: `SELECT id_categoria, nombre_categoria FROM ${tableName} ORDER BY id_categoria ASC;`,
	GET_BY_ID: `SELECT id_categoria, nombre_categoria FROM ${tableName} WHERE id_categoria = $1;`,
	ADD: `INSERT INTO  ${tableName}(nombre_categoria) VALUES($1) RETURNING id_categoria;`,
	UPDATE: `UPDATE  ${tableName} SET nombre_categoria = $1 WHERE id_categoria = $2;`,
	DELETE: `DELETE FROM  ${tableName} WHERE id_categoria = $1;`
};
