import { describe, expect, test } from "@jest/globals";
import request from "supertest";

const url = "http://localhost:3003/api/v1";

describe('Movie controller tests', () => {
    test('should return an object with the routes', async () => {
        const response = await request(url).get('/movie/');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.endpoints).toBeDefined();
        expect(Object.keys(response.body.endpoints).length).toEqual(5);
    })
})