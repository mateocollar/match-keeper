import type { Command, CommandContext } from "@/types/command.ts";

export const kickCommand: Command = {
  name: "kick",
  description: "Expulsa a un jugador por su ID en la sala.",
  adminOnly: true,
  execute: ({ room, player, args }: CommandContext) => {
    const targetId = Number(args[0])
    const reason = args.slice(1).join(" ") || "Expulsado por un administrador."

    if (isNaN(targetId)) {
      room.sendAnnouncement("Uso correcto: !kick <id_jugador> [razón]", player.id, 0xFFCC00);
      return;
    }

    room.kickPlayer(targetId, reason, false)
  }
}