import { z } from "zod";

export const PlayerReadySchema = z.object({
  nickname: z
    .string({
      message: "Nickname is required and must be a string.",
    })
    .min(1, "Nickname cannot be empty."),
});

export type PlayerReadyDto = z.infer<typeof PlayerReadySchema>;
