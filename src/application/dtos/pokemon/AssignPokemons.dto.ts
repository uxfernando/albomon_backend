import { z } from "zod";

export const AssignPokemonsSchema = z.object({
  nickname: z
    .string({
      message: "Nickname is required and must be a string.",
    })
    .min(1, "Nickname cannot be empty."),
});

export type AssignPokemonsDto = z.infer<typeof AssignPokemonsSchema>;
