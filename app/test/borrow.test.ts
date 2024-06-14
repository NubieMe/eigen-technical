import supertest from "supertest";
import { BookTest, MemberTest } from "./test-util";
import { app, server } from "../src/application/server";

// PLEASE TEST THIS FILE INDIVIDUALLY

describe("POST /api/member/borrow and PUT /api/member/return", () => {
    beforeAll(async () => {
        await MemberTest.add();
        await BookTest.add();
    });

    afterAll(async () => {
        await MemberTest.delete();
        await BookTest.delete();
        server.close();
    });

    it("should successfully borrow book", async () => {
        const response = await supertest(app).post("/api/member/borrow").send({
            memberCode: "M001",
            bookCode: "HP-1",
        });

        expect(response.status).toBe(200);
        expect(response.body.data.memberCode).toBe("M001");
        expect(response.body.data.bookCode).toBe("HP-1");
    });

    it("should successfully return book", async () => {
        const response = await supertest(app).put("/api/member/return").send({
            memberCode: "M001",
            bookCode: "HP-1",
        });

        expect(response.status).toBe(200);
        expect(response.body.data.memberCode).toBe("M001");
        expect(response.body.data.bookCode).toBe("HP-1");
    });
});
