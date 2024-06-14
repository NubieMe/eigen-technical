import { ZodError } from "zod";
import { Validation } from "../src/application/validation/validation";
import { toBorrowResponse, toMemberResponse, toReturnResponse } from "../src/member/model/member";
import { MemberValidation } from "../src/member/validation/member-validation";
import { member } from "@prisma/client";
import { countDate } from "../src/member/utils/count-date";
import { penaltyCount } from "../src/member/utils/penalty-count";
import { bookModel } from "../src/book/model/book";

describe("testing unit function", () => {
    it("should turn member to memberResponse", () => {
        const member: member = {
            code: "M001",
            name: "aing maung",
            penaltyExp: null,
        };

        const response = toMemberResponse(member);

        expect(response).toMatchObject({
            code: "M001",
            name: "aing maung",
            penaltyExp: null,
            borrowedBooks: 0,
        });
    });

    it("should return as borrowResponse", () => {
        const member: member = {
            code: "M001",
            name: "aing maung",
            penaltyExp: null,
        };

        const book: bookModel = {
            code: "HR-1",
            title: "Harry Potter",
            author: "J.K Rowling",
            stock: 1,
        };

        const response1 = toBorrowResponse(member, book);
        const response2 = toReturnResponse(member, book);

        expect(response1).toMatchObject({
            memberCode: "M001",
            name: "aing maung",
            bookCode: "HR-1",
            title: "Harry Potter",
            borrowedAt: new Date(),
        });
        expect(response2).toMatchObject({
            memberCode: "M001",
            name: "aing maung",
            bookCode: "HR-1",
            title: "Harry Potter",
        });
    });

    it("should passing same value", () => {
        const member = {
            code: "M001",
            name: "aing maung",
        };

        const validated = Validation.validate(MemberValidation.addMember, member);

        expect(validated).toMatchObject(member);
    });

    it("should throw error if value is invalid", () => {
        try {
            const member = {
                code: "",
                name: "",
            };

            Validation.validate(MemberValidation.addMember, member);
        } catch (error) {
            expect(error).toBeInstanceOf(ZodError);
        }
    });

    it("should return number between to date", () => {
        const days = countDate(new Date("17-Jun-2024"), new Date("10-Jun-2024"));

        expect(days).toBe(7);
    });

    it("should return 3 days ahead", () => {
        const days = countDate(penaltyCount(), new Date());

        expect(days).toBe(3);
    });
});
