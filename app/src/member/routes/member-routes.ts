import express from "express";
import { MemberController } from "../controller/member-controller";

export const memberRoutes = express.Router();

/**
 * @openapi
 * /api/member:
 *   get:
 *     tags:
 *       - Member
 *     description: Get array of member or empty array
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
 *                         example: M001
 *                       name:
 *                         type: string
 *                         example: aing maung
 *                       penaltyExp:
 *                         type: Date
 *                         example: null
 *                       borrowedBooks:
 *                         type: number
 *                         example: 0
 */
memberRoutes.get("/member", MemberController.getAllMembers);

/**
 * @openapi
 * /api/member:
 *   post:
 *     tags:
 *       - Member
 *     description: Add new member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - name
 *             properties:
 *               code:
 *                 type: string
 *                 default: M001
 *               name:
 *                 type: string
 *                 default: aing maung
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
 *                      code:
 *                          type: string
 *                          example: M001
 *                      name:
 *                          type: string
 *                          example: aing maung
 *                      penaltyExp:
 *                          type: Date
 *                          example: null
 *                      borrowedBooks:
 *                          type: number
 *                          example: 0
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   example: Member Code already exists
 */
memberRoutes.post("/member", MemberController.addMember);

/**
 * @openapi
 * /api/member/borrow:
 *   post:
 *     tags:
 *       - Member
 *     description: member borrowing book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - memberCode
 *               - bookCode
 *             properties:
 *               memberCode:
 *                 type: string
 *                 default: M001
 *               bookCode:
 *                 type: string
 *                 default: HR-1
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                      memberCode:
 *                          type: string
 *                          example: M001
 *                      name:
 *                          type: string
 *                          example: aing maung
 *                      bookCode:
 *                          type: string
 *                          example: HR-1
 *                      title:
 *                          type: string
 *                          example: Harry Potter
 *                      borrowedAt:
 *                          type: Date
 *                          example: 13-Jun-2024
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   example: the book HR-1 is already borrowed by another member
 */
memberRoutes.post("/member/borrow", MemberController.borrowBook);

/**
 * @openapi
 * /api/member/return:
 *   put:
 *     tags:
 *       - Member
 *     description: member return borrowed book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - memberCode
 *               - bookCode
 *             properties:
 *               memberCode:
 *                 type: string
 *                 default: M001
 *               bookCode:
 *                 type: string
 *                 default: HR-1
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                      memberCode:
 *                          type: string
 *                          example: M001
 *                      name:
 *                          type: string
 *                          example: aing maung
 *                      bookCode:
 *                          type: string
 *                          example: HR-1
 *                      title:
 *                          type: string
 *                          example: Harry Potter
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   example: member can only return the borrowed book
 */
memberRoutes.put("/member/return", MemberController.returnBook);
