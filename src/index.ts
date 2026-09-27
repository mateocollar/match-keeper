// src/index.ts

import { sendQuitMessage, sendWelcomeMessage } from "@/features/messages.ts"

const room: RoomObject = HBInit({
  roomName: "MatchKeeper room",
  maxPlayers: 12,
  noPlayer: true
})

room.onPlayerJoin = (player: PlayerObject) => {
  sendWelcomeMessage(room, player)
}

room.onPlayerLeave = (player: PlayerObject) => {
  sendQuitMessage(room, player)
}