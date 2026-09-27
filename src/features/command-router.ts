import type { Command, CommandContext } from "@/types/command.ts";

export class CommandRouter {
  private commands = new Map<string, Command>();
  private prefix: string;

  constructor(prefix: string = "!") {
    this.prefix = prefix;
  }

  /**
   * Registra un nuevo comando en el enrutador.
   */
  register(command: Command): this {
    this.commands.set(command.name.toLowerCase(), command);
    return this;
  }

  handleChat(room: RoomObject, player: PlayerObject, message: string): boolean {
    if (!message.startsWith(this.prefix)) return true;

    const args = message.slice(this.prefix.length).trim().split(/\s+/);
    const commandName = args.shift()?.toLowerCase();

    if (!commandName) return false;

    const command = this.commands.get(commandName);

    if (!command) {
      room.sendAnnouncement(
        `El comando '${this.prefix}${commandName}' no existe. Usa ${this.prefix}help para ver la lista.`,
        player.id,
        0xFF5555
      );
      return false;
    }

    if (command.adminOnly && !player.admin) {
      room.sendAnnouncement(
        "No tienes permisos de administrador para usar este comando.",
        player.id,
        0xFF5555
      );
      return false;
    }

    try {
      const ctx: CommandContext = { room, player, args };
      command.execute(ctx);
    } catch (error) {
      console.error(`Error al ejecutar el comando ${commandName}:`, error);
      room.sendAnnouncement("Ocurrió un error al ejecutar el comando.", player.id, 0xFF5555);
    }

    return false;
  }

  getCommands(): Command[] {
    return Array.from(this.commands.values());
  }
}