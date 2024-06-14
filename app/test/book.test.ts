import supertest from "supertest";
import { app, server } from "../src/application/server";
import { BookTest } from "./test-util";

// PLEASE TEST THIS FILE INDIVIDUALLY

describe("POST and GET /api/book", () => {
    afterAll(async () => {
        await BookTest.delete();
        server.close();
    });

    it("should reject new book if request is invalid", async () => {
        const response = await supertest(app).post("/api/book").send({
            code: "",
            title: "",
            author: "",
            stock: -1,
        });

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it("should create new book", async () => {
        const response = await supertest(app).post("/api/book").send({
            code: "HP-1",
            title: "Harry Potter",
            author: "J.K. Rowling",
            stock: 2,
        });

        expect(response.status).toBe(201);
        expect(response.body.data.code).toBe("HP-1");
        expect(response.body.data.title).toBe("Harry Potter");
        expect(response.body.data.author).toBe("J.K. Rowling");
        expect(response.body.data.stock).toBe(2);
    });

    it("should get an array of book", async () => {
        const response = await supertest(app).get("/api/book");

        expect(response.status).toBe(200);
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.data[0].code).toBe("HP-1");
        expect(response.body.data[0].title).toBe("Harry Potter");
        expect(response.body.data[0].author).toBe("J.K. Rowling");
        expect(response.body.data[0].stock).toBe(2);
    });
});
