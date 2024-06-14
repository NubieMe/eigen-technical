import express from "express";
import { BookController } from "../controller/book-controller";

export const bookRoutes = express.Router();

/**
 * @openapi
 * /api/book:
 *   get:
 *     tags:
 *       - Book
 *     description: Get array of books or empty array
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                         example: HR-1
 *                       title:
 *                         type: string
 *                         example: Harry Potter
 *                       author:
 *                         type: string
 *                         example: J.K. Rowling
 *                       stock:
 *                         type: number
 *                         example: 1
 */
bookRoutes.get("/book", BookController.getAllBooks);

/**
 * @openapi
 * /api/book:
 *   post:
 *     tags:
 *       - Book
 *     description: Add new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - title
 *               - author
 *               - stock
 *             properties:
 *               code:
 *                 type: string
 *                 default: HR-1
 *               title:
 *                 type: string
 *                 default: Harry Potter
 *               author:
 *                 type: string
 *                 default: J.K. Rowling
 *               stock:
 *                 type: number
 *                 default: 1
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: HR-1
 *                     title:
 *                       type: string
 *                       example: Harry Potter
 *                     author:
 *                       type: string
 *                       example: J.K. Rowling
 *                     stock:
 *                       type: number
 *                       example: 1
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   example: The Book's Code already exists
 */
bookRoutes.post("/book", BookController.addBook);
