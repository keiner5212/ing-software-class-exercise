/**
 * 

CREATE TABLE
	Pelicula (
		id_pelicula SERIAL PRIMARY KEY,
		nombre_pelicula VARCHAR(250) NOT NULL,
		fecha_estreno_pelicula DATE NOT NULL,
		duracion_pelicula INT NOT NULL,
		id_categoria INT NOT NULL REFERENCES Categoria (id_categoria)
	);
 */

import { faker } from "@faker-js/faker";
import { dateToPostgreString } from "../utils/sql/DateUtils";

export class Pelicula {
	private id_pelicula?: number;
	private nombre_pelicula: string;
	private fecha_estreno_pelicula: string;
	private duracion_pelicula: number;
	private id_categoria: number;

	constructor(
		nombre_pelicula: string,
		fecha_estreno_pelicula: string,
		duracion_pelicula: number,
		id_categoria: number,
		id_pelicula?: number
	) {
		this.id_pelicula = id_pelicula;
		this.nombre_pelicula = nombre_pelicula;
		this.fecha_estreno_pelicula = fecha_estreno_pelicula;
		this.duracion_pelicula = duracion_pelicula;
		this.id_categoria = id_categoria;
	}

	//getters
	public getIdPelicula(): number | undefined {
		return this.id_pelicula;
	}

	public getNombrePelicula(): string {
		return this.nombre_pelicula;
	}

	public getFechaEstrenoPelicula(): string {
		return this.fecha_estreno_pelicula;
	}

	public getDuracionPelicula(): number {
		return this.duracion_pelicula;
	}

	public getIdCategoria(): number {
		return this.id_categoria;
	}

	//setters

	public setNombrePelicula(value: string) {
		this.nombre_pelicula = value;
	}

	public setFechaEstrenoPelicula(value: string) {
		this.fecha_estreno_pelicula = value;
	}

	public setDuracionPelicula(value: number) {
		this.duracion_pelicula = value;
	}

	public setIdCategoria(value: number) {
		this.id_categoria = value;
	}

	public static generateRandom() {
		return new Pelicula(
			faker.string.sample(10),
			dateToPostgreString(faker.date.recent()),
			faker.number.int({ min: 1, max: 100 }),
			faker.number.int({ min: 1, max: 5 })
		);
	}

	/* json example
	 {
		"nombre_pelicula": "x",
		"fecha_estreno_pelicula": "x",
		"duracion_pelicula": 0,
		"id_categoria": 0
	 }
	 */
}
