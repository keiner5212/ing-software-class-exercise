
import DbConfig from "../db/dbConfig";
import dotenv from "dotenv";
import pgPromise from "pg-promise";
import { CategoriaRepository } from "../repositories/CategoriaRepository";

dotenv.config();

const dbInstance = DbConfig.getInstance();
const db = dbInstance.getDb();

export class CategoriaDAO {

	protected static async getAll() {
		return await db.task(async (t: pgPromise.IDatabase<any>) => {
			return await t.manyOrNone(CategoriaRepository.GET_ALL);
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
			return await t.oneOrNone(CategoriaRepository.GET_BY_ID, [id]);
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


	protected static async add(nombre_categoria: string) {

		return await db.task(async (t: pgPromise.IDatabase<any>) => {
			return await t.oneOrNone(CategoriaRepository.ADD, [nombre_categoria]);
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


	protected static async update(id_categoria: number, nombre_categoria: string) {

		return await db.task(async (t: pgPromise.IDatabase<any>) => {
			return await t.oneOrNone(CategoriaRepository.UPDATE, [nombre_categoria, id_categoria]);
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


	protected static async delete(id_categoria: number) {
		return await db.task(async (t: pgPromise.IDatabase<any>) => {
			return await t.oneOrNone(CategoriaRepository.DELETE, [id_categoria]);
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


}
