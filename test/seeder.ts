import { Pelicula } from "../src/entities/Peliculas";
import DbConfig from "../src/db/dbConfig";
import { PeliculaRepository } from "../src/repositories/PeliculasRepository";

const dbInstance = DbConfig.getInstance();
const db = dbInstance.getDb();

export async function insertNramdoms(n: number) {
	try {
		for (let i = 0; i < n; i++) {
			const movie = Pelicula.generateRandom();
			await db.one(PeliculaRepository.ADD, [
				movie.getNombrePelicula(),
				movie.getFechaEstrenoPelicula(),
				movie.getDuracionPelicula(),
				movie.getIdCategoria(),
			]);
		}
	} catch (error) {
		console.log(error);
	}

    console.log("Seeding done");
}


insertNramdoms(5_000_000)