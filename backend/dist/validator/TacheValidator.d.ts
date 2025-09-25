import { z } from "zod";
export declare const CreateUserSchema: z.ZodObject<{
    nom: z.ZodString;
    description: z.ZodString;
    status: z.ZodBoolean;
    image: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
//# sourceMappingURL=TacheValidator.d.ts.map