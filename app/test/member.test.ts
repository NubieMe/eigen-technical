import supertest from "supertest";
import { app, server } from "../src/application/server";
import { MemberTest } from "./test-util";

// PLEASE TEST THIS FILE INDIVIDUALLY

describe("POST and GET /api/member", () => {
    afterAll(async () => {
        await MemberTest.delete();
        server.close();
    });

    it("should reject new member if request is invalid", async () => {
        const response = await supertest(app).post("/api/member").send({
            code: "",
            name: "",
        });

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it("should create new member", async () => {
        const response = await supertest(app).post("/api/member").send({
            code: "M001",
            name: "aing maung",
        });

        expect(response.status).toBe(201);
        expect(response.body.data.code).toBe("M001");
        expect(response.body.data.name).toBe("aing maung");
    });

    it("should get an array of member", async () => {
        const response = await supertest(app).get("/api/member");

        expect(response.status).toBe(200);
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.data[0].code).toBe("M001");
        expect(response.body.data[0].name).toBe("aing maung");
    });
});
