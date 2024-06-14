import { prismaClient } from "../../application/database";
import { ResponseError } from "../../application/errors/response-error";
import { Validation } from "../../application/validation/validation";
import { BookValidation } from "../validation/book-validation";
import { bookModel } from "../model/book";

export class BookService {
    static async addBook(req: bookModel): Promise<bookModel> {
        const addBookReq = Validation.validate(BookValidation.addBook, req);

        const isBookExist: bookModel[] =
            await prismaClient.$queryRaw`select * from books where title=${addBookReq.title} or code=${addBookReq.code}`;

        if (isBookExist.some((val) => val.code === addBookReq.code))
            throw new ResponseError(400, "The Book's Code already exists");

        if (isBookExist.some((val) => val.title === addBookReq.title))
            throw new ResponseError(400, "The Book's Title already exists");

        return await prismaClient.book.create({
            data: addBookReq,
        });
    }

    static async getAllBooks(): Promise<bookModel[]> {
        return await prismaClient.book.findMany();
    }
}
