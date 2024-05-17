
import DbConfig from "../db/dbConfig";
import dotenv from "dotenv";
import pgPromise from "pg-promise";
import { PeliculaRepository } from "../repositories/PeliculasRepository";
import { dbDebugger } from "../utils/debugConfig";

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
            throw new Error("request_err: No data found");
        }).catch((err) => {
            dbDebugger(err);
            if (err.message.includes("request_err")) {
                throw err;
            }
        })
    }


    protected static async getById(id: number) {
        return await db.task(async (t: pgPromise.IDatabase<any>) => {
            return await t.oneOrNone(PeliculaRepository.GET_BY_ID, [id]);
        }).then((data) => {
            if (data) {
                return data;
            }
            throw new Error("request_err: No data found");
        }).catch((err) => {
            dbDebugger(err);
            if (err.message.includes("request_err")) {
                throw err;
            }
        })
    }

    protected static async add(nombre_pelicula: string, fecha_estreno_pelicula: string, duracion_pelicula: number, id_categoria: number) {

        return await db.task(async (t: pgPromise.IDatabase<any>) => {
            //check if exists already a movie with that name
            const res1 = await t.manyOrNone(PeliculaRepository.GET_BY_NAME, [nombre_pelicula]);
            if (res1.length > 0) {
                throw new Error("request_err: there is already a movie with that name");
            }
            return await t.oneOrNone(PeliculaRepository.ADD, [nombre_pelicula, fecha_estreno_pelicula, duracion_pelicula, id_categoria]);
        }).then((data) => {
            if (data) {
                return data;
            }
            throw new Error("request_err: Error adding data");
        }).catch((err) => {
            dbDebugger(err);
            if (err.message.includes("request_err")) {
                throw err;
            }
        })

    }


    protected static async update(id_pelicula: number, nombre_pelicula: string, fecha_estreno_pelicula: string, duracion_pelicula: number, id_categoria: number) {

        return await db.task(async (t: pgPromise.IDatabase<any>) => {
            //check if exists
            const res1 = await t.oneOrNone(PeliculaRepository.GET_BY_ID, [id_pelicula]);
            if (!res1) {
                throw new Error("request_err: there is no movie with that id");
            }
            //check if exists already a category with that name
            const res2 = await t.manyOrNone(PeliculaRepository.GET_BY_NAME, [nombre_pelicula]);
            if (res2 && res2.length > 0 && res2.every((obj) => obj.id_pelicula !== id_pelicula)) {
                throw new Error("request_err: there is already a category with that name");
            }
            return await t.oneOrNone(PeliculaRepository.UPDATE, [nombre_pelicula, fecha_estreno_pelicula, duracion_pelicula, id_categoria, id_pelicula]);
        }).then((data) => {
            if (data) {
                return data;
            }
            throw new Error("request_err: Error updating data");
        }).catch((err) => {
            dbDebugger(err);
            if (err.message.includes("request_err")) {
                throw err;
            }
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
