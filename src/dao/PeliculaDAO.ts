
import DbConfig from "../db/dbConfig";
import dotenv from "dotenv";
import pgPromise from "pg-promise";
import { PeliculaRepository } from "../repositories/PeliculasRepository";

dotenv.config();

const dbInstance = DbConfig.getInstance();
const db = dbInstance.getDb();

export class PeliculaDAO {

    protected static async getAll() {
        return await db.task(async (t: pgPromise.IDatabase<any>) => {
            return await t.manyOrNone(PeliculaRepository.GET_ALL);
        }).then((data) => {
            if (data && data.length > 0) {
                return data;
            }
            throw new Error("No data found");
        }).catch((err) => {
            console.log(err);
            throw err;
        })
    }


    protected static async getById(id: number) {
        return await db.task(async (t: pgPromise.IDatabase<any>) => {
            return await t.oneOrNone(PeliculaRepository.GET_BY_ID, [id]);
        }).then((data) => {
            if (data) {
                return data;
            }
            throw new Error("No data found");
        }).catch((err) => {
            console.log(err);
            throw err;
        })
    }

    protected static async add(nombre_pelicula: string, fecha_estreno_pelicula: string, duracion_pelicula: number, id_categoria: number) {

        return await db.task(async (t: pgPromise.IDatabase<any>) => {
            return await t.oneOrNone(PeliculaRepository.ADD, [nombre_pelicula, fecha_estreno_pelicula, duracion_pelicula, id_categoria]);
        }).then((data) => {
            if (data) {
                return data;
            }
            throw new Error("Error adding data");
        }).catch((err) => {
            console.log(err);
            throw err;
        })

    }


    protected static async update(id_pelicula: number, nombre_pelicula: string, fecha_estreno_pelicula: string, duracion_pelicula: number, id_categoria: number) {

        return await db.task(async (t: pgPromise.IDatabase<any>) => {
            return await t.oneOrNone(PeliculaRepository.UPDATE, [nombre_pelicula, fecha_estreno_pelicula, duracion_pelicula, id_categoria, id_pelicula]);
        }).then((data) => {
            if (data) {
                return data;
            }
            throw new Error("Error updating data");
        }).catch((err) => {
            console.log(err);
            throw err;
        })
    }


    protected static async delete(id_pelicula: number) {
        return await db.task(async (t: pgPromise.IDatabase<any>) => {
            return await t.oneOrNone(PeliculaRepository.DELETE, [id_pelicula]);
        }).then((data) => {
            if (data) {
                return data;
            }
            throw new Error("Error updating data");
        }).catch((err) => {
            console.log(err);
            throw err;
        })
    }


}
