// src/features/messages.ts

export function sendWelcomeMessage(room: RoomObject, player: PlayerObject): void {
  room.sendAnnouncement(
    `¡Bienvenido ${player.name} a sala! Usa !help para ver los comandos.`,
    player.id,
    0x00FF00,
    "bold",
    1
  )
}

export function sendQuitMessage(room: RoomObject, player: PlayerObject): void {
  room.sendAnnouncement(
    `${player.name} ha abandonado la sala.`,
    undefined,
    0xFFAAAA,
    "normal",
    0
  )
}