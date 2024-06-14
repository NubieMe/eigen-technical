import { prismaClient } from "../src/application/database";

export class MemberTest {
    static async delete() {
        await prismaClient.member.deleteMany({
            where: {
                code: "M001",
            },
        });
    }

    static async add() {
        await prismaClient.member.create({
            data: {
                code: "M001",
                name: "saha",
            },
        });
    }
}

export class BookTest {
    static async delete() {
        await prismaClient.book.deleteMany({
            where: {
                code: "HP-1",
            },
        });
    }

    static async add() {
        await prismaClient.book.create({
            data: {
                code: "HP-1",
                title: "Harry Potter",
                author: "J.K Rowling",
                stock: 1,
            },
        });
    }
}
