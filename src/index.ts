// src/index.ts

import { sendQuitMessage, sendWelcomeMessage } from "@/features/messages.ts"
import GoalTracker from "@/features/goal.ts"
import { CommandRouter } from "@/features/command-router.ts"
import { kickCommand } from "@/commands/kick.ts"
import { mixCommand } from "@/commands/mix.ts"
import { createHelpCommand } from "@/commands/utility.ts"

const room: RoomObject = HBInit({
  roomName: "MatchKeeper room",
  maxPlayers: 12,
  noPlayer: true
})

const router = new CommandRouter("!")

router
  .register(kickCommand)
  .register(mixCommand)
  .register(createHelpCommand(router))

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

room.onPlayerChat = (player: PlayerObject, message: string): boolean => {
  return router.handleChat(room, player, message);
};
