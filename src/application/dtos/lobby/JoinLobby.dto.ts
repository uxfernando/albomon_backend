import { z } from "zod";

export const JoinLobbySchema = z.object({
  nickname: z
    .string({
      message: "Nickname is required and must be a string.",
    })
    .min(1, "Nickname cannot be empty."),
});

export type JoinLobbyDto = z.infer<typeof JoinLobbySchema>;
