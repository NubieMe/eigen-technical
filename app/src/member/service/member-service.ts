import { prismaClient } from "../../application/database";
import { ResponseError } from "../../application/errors/response-error";
import { Validation } from "../../application/validation/validation";
import {
    addMemberRequest,
    borrowRequest,
    borrowResponse,
    memberResponse,
    toBorrowResponse,
    toMemberResponse,
    toReturnResponse,
} from "../model/member";
import { MemberValidation } from "../validation/member-validation";
import { countDate } from "../utils/count-date";
import { penaltyCount } from "../utils/penalty-count";
import { member } from "@prisma/client";

export class MemberService {
    static async addMember(req: addMemberRequest): Promise<memberResponse> {
        const addMemberReq = Validation.validate(MemberValidation.addMember, req);

        const isMemberExist: member[] =
            await prismaClient.$queryRaw`select * from members where name=${addMemberReq.name} or code=${addMemberReq.code}`;

        if (isMemberExist.some((val) => val.code === addMemberReq.code))
            throw new ResponseError(400, "Member Code already exists");

        if (isMemberExist.some((val) => val.name === addMemberReq.name))
            throw new ResponseError(400, "Member Name already exists");

        const member = await prismaClient.member.create({
            data: addMemberReq,
        });

        return toMemberResponse(member);
    }

    static async getAllMembers(): Promise<memberResponse[]> {
        const members = await prismaClient.member.findMany({
            select: {
                code: true,
                name: true,
                penaltyExp: true,
                borrow: true,
            },
        });

        return members.map((val) => toMemberResponse(val, val.borrow.length));
    }

    static async borrowBook(req: borrowRequest): Promise<borrowResponse> {
        const borrowReq = Validation.validate(MemberValidation.borrowBook, req);

        const checkStockBook = await prismaClient.book.findFirst({
            where: {
                code: borrowReq.bookCode,
            },
        });

        if (!checkStockBook) throw new ResponseError(404, "book not found");

        if (checkStockBook.stock === 0)
            throw new ResponseError(400, `the book ${borrowReq.bookCode} is already borrowed by another member`);

        const member = await prismaClient.member.findFirst({
            where: {
                code: borrowReq.memberCode,
            },
        });

        if (!member) throw new ResponseError(404, "member not found");

        const borrowed = await prismaClient.borrow.count({
            where: {
                memberCode: borrowReq.memberCode,
            },
        });

        if (borrowed === 2) throw new ResponseError(400, "member cannot borrow more than 2 books");

        if (!!member.penaltyExp) {
            const daysCount = countDate(new Date(), new Date(member.penaltyExp.toDateString()));

            if (daysCount <= 3) throw new ResponseError(400, "member in penalty period cannot borrow books");
        }

        const borrow = await prismaClient.borrow.create({
            data: {
                memberCode: borrowReq.memberCode,
                bookCode: borrowReq.bookCode,
            },
        });

        const currentStock = checkStockBook.stock - 1;
        ``;
        const book = await prismaClient.book.update({
            where: {
                code: borrow.bookCode,
            },
            data: {
                stock: currentStock,
            },
        });

        return toBorrowResponse(member, book);
    }

    static async returnBook(req: borrowRequest): Promise<borrowResponse> {
        const returnReq = Validation.validate(MemberValidation.borrowBook, req);

        const member = await prismaClient.member.findFirst({
            where: {
                code: returnReq.memberCode,
            },
        });

        if (!member) throw new ResponseError(400, "member not found");

        const book = await prismaClient.book.findFirst({
            where: {
                code: returnReq.bookCode,
            },
        });

        if (!book) throw new ResponseError(400, "book not found");

        const borrowed = await prismaClient.borrow.findMany({
            where: {
                memberCode: returnReq.memberCode,
            },
        });

        if (borrowed.length === 0) throw new ResponseError(400, "member haven't borrowed any books");

        if (!borrowed.some((val) => val.bookCode))
            throw new ResponseError(400, "member can only return the borrowed book");

        const currentBook = borrowed.filter((val) => val.bookCode === returnReq.bookCode)[0];
        const days = countDate(new Date(), currentBook.borrowedAt);

        await prismaClient.borrow.delete({
            where: {
                id: currentBook.id,
            },
        });

        days > 7 &&
            (await prismaClient.member.update({
                where: {
                    code: returnReq.memberCode,
                },
                data: {
                    penaltyExp: penaltyCount(),
                },
            }));

        return toReturnResponse(member, book);
    }
}
