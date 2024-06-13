import { member } from "@prisma/client";
import { bookModel } from "../../book/model/book";

export type memberResponse = {
    code: string;
    name: string;
    penaltyExp: Date | null;
    borrowedBooks: number;
};

export type addMemberRequest = {
    code: string;
    name: string;
};

export type borrowRequest = {
    memberCode: string;
    bookCode: string;
};

export type borrowResponse = {
    memberCode: string;
    name: string;
    bookCode: string;
    title: string;
    borrowedAt?: Date;
};

// export type

export function toMemberResponse(member: member, totalBooks?: number): memberResponse {
    return {
        code: member.code,
        name: member.name,
        penaltyExp: member.penaltyExp,
        borrowedBooks: totalBooks || 0,
    };
}

export function toBorrowResponse(member: member, book: bookModel): borrowResponse {
    return {
        memberCode: member.code,
        name: member.name,
        bookCode: book.code,
        title: book.title,
        borrowedAt: new Date(),
    };
}

export function toReturnResponse(member: member, book: bookModel): borrowResponse {
    return {
        memberCode: member.code,
        name: member.name,
        bookCode: book.code,
        title: book.title,
    };
}
