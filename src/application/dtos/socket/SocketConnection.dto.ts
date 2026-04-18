import { z } from "zod";

export const SocketConnectionSchema = z.object({
  nickname: z
    .string({
      message: "Nickname is required and must be a string.",
    })
    .min(1, "Nickname cannot be empty."),
});

export type SocketConnectionDto = z.infer<typeof SocketConnectionSchema>;
