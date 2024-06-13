import { z, ZodType } from "zod";

export class MemberValidation {
    static readonly addMember: ZodType = z.object({
        code: z.string().min(1).max(10),
        name: z.string().min(1).max(100),
    });

    static readonly borrowBook: ZodType = z.object({
        memberCode: z.string().min(1).max(10),
        bookCode: z.string().min(1).max(10),
    });
}
