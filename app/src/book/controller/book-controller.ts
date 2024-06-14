import { NextFunction, Request, Response } from "express";
import { BookService } from "../service/book-service";
import { bookModel } from "../model/book";

export class BookController {
    static async addBook(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as bookModel;
            const response = await BookService.addBook(request);

            res.status(201).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAllBooks(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await BookService.getAllBooks();

            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }
}
