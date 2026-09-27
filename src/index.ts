// src/index.ts

import { sendQuitMessage, sendWelcomeMessage } from "@/features/messages.ts"
import GoalTracker from "@/features/goal.ts"

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

room.onPlayerBallKick = (player: PlayerObject) => {
  GoalTracker.updateKickers(player)
}

room.onTeamGoal = (team: TeamID) => {
  GoalTracker.showGoalNotification(room, team)
}

room.onPositionsReset = () => {
  GoalTracker.resetKickers()
}
