import DbConfig from "../db/dbConfig";
import dotenv from "dotenv";
import pgPromise from "pg-promise";
import { CategoriaRepository } from "../repositories/CategoriaRepository";
import { daoDebugger } from "../utils/debugConfig";
import { Pagination } from "../constants/pagination";

dotenv.config();

const dbInstance = DbConfig.getInstance();
const db = dbInstance.getDb();

export class CategoriaDAO {
	protected static async getAll(page: number) {
		return await db
			.task(async (t: pgPromise.IDatabase<any>) => {
				return await t.manyOrNone(CategoriaRepository.GET_ALL, [
					(page - 1) * Pagination.defaultLimit,
					Pagination.defaultLimit,
				]);
			})
			.then((data) => {
				if (data && data.length > 0) {
					return data;
				}
				throw new Error("request_err: No data found");
			})
			.catch((err) => {
				daoDebugger(err);
				if (err.message.includes("request_err")) {
					throw err;
				}
			});
	}

	protected static async getById(id: number) {
		return await db
			.task(async (t: pgPromise.IDatabase<any>) => {
				return await t.oneOrNone(CategoriaRepository.GET_BY_ID, [id]);
			})
			.then((data) => {
				if (data) {
					return data;
				}
				throw new Error("request_err: No data found");
			})
			.catch((err) => {
				daoDebugger(err);
				if (err.message.includes("request_err")) {
					throw err;
				}
			});
	}

	protected static async add(nombre_categoria: string) {
		return await db
			.task(async (t: pgPromise.IDatabase<any>) => {
				//check if exists already a category with that name
				const res1 = await t.manyOrNone(
					CategoriaRepository.GET_BY_NAME,
					[nombre_categoria]
				);
				if (res1.length > 0) {
					throw new Error(
						"request_err: there is already a category with that name"
					);
				}
				//create if not
				return await t.oneOrNone(CategoriaRepository.ADD, [
					nombre_categoria,
				]);
			})
			.then((data) => {
				if (data) {
					return data;
				}
				throw new Error("request_err: error adding category");
			})
			.catch((err) => {
				daoDebugger(err);
				if (err.message.includes("request_err")) {
					throw err;
				}
			});
	}

	protected static async update(
		id_categoria: number,
		nombre_categoria: string
	) {
		return await db
			.task(async (t: pgPromise.IDatabase<any>) => {
				//check if exists
				const res1 = await t.oneOrNone(CategoriaRepository.GET_BY_ID, [
					id_categoria,
				]);
				if (!res1) {
					throw new Error(
						"request_err: there is no category with that id"
					);
				}
				//check if exists already a category with that name
				const res2 = await t.manyOrNone(
					CategoriaRepository.GET_BY_NAME,
					[nombre_categoria]
				);
				if (
					res2 &&
					res2.length > 0 &&
					res2.every((obj) => obj.id_categoria !== id_categoria)
				) {
					throw new Error(
						"request_err: there is already a category with that name"
					);
				}
				return await t.oneOrNone(CategoriaRepository.UPDATE, [
					nombre_categoria,
					id_categoria,
				]);
			})
			.then((data) => {
				if (data) {
					return data;
				}
				throw new Error("request_err: Error updating category");
			})
			.catch((err) => {
				daoDebugger(err);
				if (err.message.includes("request_err")) {
					throw err;
				}
			});
	}

	protected static async delete(id_categoria: number) {
		return await db
			.task(async (t: pgPromise.IDatabase<any>) => {
				//check if exists
				const res1 = await t.oneOrNone(CategoriaRepository.GET_BY_ID, [
					id_categoria,
				]);
				if (!res1) {
					throw new Error(
						"request_err: there is no category with that id"
					);
				}
				//get movies by category
				const res2 = await t.manyOrNone(
					CategoriaRepository.GET_MOVIES_BY_CATEGORY,
					[id_categoria]
				);
				if (res2 && res2.length > 0) {
					throw new Error(
						"request_err: there are movies in that category"
					);
				}
				return await t.oneOrNone(CategoriaRepository.DELETE, [
					id_categoria,
				]);
			})
			.then((data) => {
				if (data) {
					return data;
				}
				throw new Error("request_err: Error deleting category");
			})
			.catch((err) => {
				daoDebugger(err);
				if (err.message.includes("request_err")) {
					throw err;
				}
			});
	}
}
