import { Pelicula } from "../src/entities/Peliculas";
import DbConfig from "../src/db/dbConfig";
import { PeliculaRepository } from "../src/repositories/PeliculasRepository";

const dbInstance = DbConfig.getInstance();
const db = dbInstance.getDb();

export async function insertNrandomsBatch(n: number, batchSize: number) {
	try {
		const movies: any[] = [];
		for (let i = 0; i < n; i++) {
			const movie = Pelicula.generateRandom();
			movies.push([
				movie.getNombrePelicula(),
				movie.getFechaEstrenoPelicula(),
				movie.getDuracionPelicula(),
				movie.getIdCategoria(),
			]);

			if (movies.length === batchSize) {
				await db.tx((t) => {
					const queries = movies.map((movie) => {
						return t.one(PeliculaRepository.ADD, movie);
					});
					return t.batch(queries);
				});
				movies.length = 0; // Limpiar el array de películas
			}
		}

		// Insertar cualquier película restante
		if (movies.length > 0) {
			await db.tx((t) => {
				const queries = movies.map((movie) => {
					return t.one(PeliculaRepository.ADD, movie);
				});
				return t.batch(queries);
			});
		}
	} catch (error) {
		console.log(error);
	}

	console.log("Seeding done");
}

insertNrandomsBatch(5000000, 50000);
