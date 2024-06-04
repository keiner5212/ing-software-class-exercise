import { describe, test, expect } from '@jest/globals';

import { PeliculaDAO } from '../src/dao/PeliculaDAO';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class MovieTest extends PeliculaDAO {
    public static getAll() {
        return super.getAll(1);
    }

    public static getById(id: number) {
        return super.getById(id);
    }

    public static add(movie: any) {
        const { nombre_pelicula, fecha_estreno_pelicula, duracion_pelicula, id_categoria } = movie;
        return super.add(nombre_pelicula, fecha_estreno_pelicula, duracion_pelicula, id_categoria);
    }

    public static update(movie: any) {
        const { id_pelicula, nombre_pelicula, fecha_estreno_pelicula, duracion_pelicula, id_categoria } = movie;
        return super.update(id_pelicula, nombre_pelicula, fecha_estreno_pelicula, duracion_pelicula, id_categoria);
    }
}


describe('get all the movies return an array', () => {
    test('should return an array of movies', async () => {
        const movies = await MovieTest.getAll();
        expect(movies).toBeInstanceOf(Array);
    })
})

describe('get a movie by  id', () => {
    test('should return a movie', async () => {
        const movie = await MovieTest.getById(1);
        expect(movie).toBeInstanceOf(Object);
        expect(movie.id_pelicula).toBe(1);
        
    })
})