import { NextFunction, Request, Response } from "express";
import { addMemberRequest, borrowRequest } from "../model/member";
import { MemberService } from "../service/member-service";

export class MemberController {
    static async addMember(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as addMemberRequest;
            const response = await MemberService.addMember(request);

            res.status(201).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAllMembers(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await MemberService.getAllMembers();
            res.status(200).send({
                data: response,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async borrowBook(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as borrowRequest;
            const response = await MemberService.borrowBook(request);

            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async returnBook(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as borrowRequest;
            const response = await MemberService.returnBook(request);

            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }
}
