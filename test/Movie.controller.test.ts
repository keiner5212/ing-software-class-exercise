import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import { Pagination } from "../src/constants/pagination";

const url = "http://localhost:3003/api/v1";

describe("Movie controller tests", () => {
	test("should return an object with the routes", async () => {
		const response = await request(url).get("/movie/");
		expect(response.status).toBe(200);
		expect(response.body).toBeInstanceOf(Object);
		expect(response.body.endpoints).toBeDefined();
		expect(Object.keys(response.body.endpoints).length).toEqual(5);
	});
});

describe("get all the movies return an array and pagination", () => {
	test("should return an array of movies", async () => {
		const movies = await request(url).get("/movie/get-all");
		expect(movies.status).toBe(200);
		expect(movies.body).toBeInstanceOf(Array);
		expect(movies.body.length).toEqual(Pagination.defaultLimit);
	});
});

describe("get a movie by id", () => {
	test("should return a movie", async () => {
		const movie = await request(url).get("/movie/1");
		expect(movie.status).toBe(200);
		expect(movie.body).toBeInstanceOf(Object);
		expect(movie.body.id_pelicula).toBe(1);
	});
});

describe("pagination most return diferent pages", () => {
	test("should return different pages", async () => {
		const page1 = await request(url).get("/movie/get-all?page=1");
		const page2 = await request(url).get("/movie/get-all?page=2");
		expect(page1.body).not.toEqual(page2.body);
		expect(page1.body.length).toEqual(page2.body.length);
		expect(page1.body[page1.body.length - 1].id_pelicula).not.toEqual(
			page2.body[0].id_pelicula
		);
	});
});
