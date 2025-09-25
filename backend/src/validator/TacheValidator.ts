import { z } from "zod";

export const CreateUserSchema = z.object({
  nom: z.string().min(1, { message: "Le nom est obligatoire" }),
  description: z.string().min(1, { message: "La description est obligatoire" }),
  status: z.boolean({ message:"Le status est obligatoire" }),
  image: z.string().optional()
});
 
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
