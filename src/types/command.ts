// src/types/command.ts

export interface CommandContext {
  room: RoomObject
  player: PlayerObject
  args: string[]
}

export interface Command {
  name: string
  description: string
  adminOnly?: boolean
  execute: (ctx: CommandContext) => void
}