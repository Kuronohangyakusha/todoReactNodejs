import { z } from "zod";
export declare const createUserSchema: z.ZodObject<{
    login: z.ZodString;
    nom: z.ZodString;
    password: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<{
        ADMIN: "ADMIN";
        SIMPLE: "SIMPLE";
    }>>;
}, z.core.$strip>;
//# sourceMappingURL=UserValidator.d.ts.map