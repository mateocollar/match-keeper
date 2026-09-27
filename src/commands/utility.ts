import type { Command, CommandContext } from "@/types/command.ts";
import { CommandRouter } from "@/features/command-router.ts";

export function createHelpCommand(router: CommandRouter): Command {
  return {
    name: "help",
    description: "Muestra la lista de comandos disponibles",
    execute: ({ room, player }) => {
      const commands = router.getCommands()
        .filter(cmd => !cmd.adminOnly || player.admin)
        .map(cmd => `!${cmd.name}: ${cmd.description}`)
        .join("\n")

      room.sendAnnouncement(`Comandos disponibles:\n${commands}`, player.id, 0x00FF00)
    }
  }
}