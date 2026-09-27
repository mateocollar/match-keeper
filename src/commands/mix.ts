import type { Command } from "@/types/command.ts";
import { autoMatch } from "@/features/matchmaking.ts";
import { CommandContext } from "@/types/command.ts";

export const mixCommand: Command = {
  name: "mix",
  description: "Mezcla y equilibra los equipos automáticamente",
  adminOnly: true,
  execute: ({ room }) => {
    autoMatch(room, { maxPerTeam: 3 });
    room.sendAnnouncement("¡Equipos mezclados y balanceados!", undefined, 0x00FF00);
  }
};