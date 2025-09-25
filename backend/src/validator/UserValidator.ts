import { z } from "zod";

 

export const createUserSchema = z.object({
  login: z.string().min(3, "Le login doit contenir au moins 3 caractères"),
  nom: z.string().min(2, "Le nom est obligatoire"), // ✅ ajouté
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
   role: z.enum(["ADMIN", "SIMPLE"]).default("SIMPLE") 
});
