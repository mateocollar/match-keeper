// src/features/matchmaking.ts

export interface MatchmakingOptions {
  maxPerTeam?: number;
}

export function autoMatch(room: RoomObject, options: MatchmakingOptions = {}) {
  const { maxPerTeam = 4 } = options;

  const allPlayers = room.getPlayerList();

  const eligiblePlayers = allPlayers.filter((p: PlayerObject) => p.id !== 0);

  const shuffled = [...eligiblePlayers];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const totalSlots = Math.min(shuffled.length, maxPerTeam * 2);
  const activePlayers = shuffled.slice(0, totalSlots);
  const benchPlayers = shuffled.slice(totalSlots);

  activePlayers.forEach((player, index) => {
    const targetTeam = index % 2 === 0 ? 1 : 2;
    room.setPlayerTeam(player.id, targetTeam);
  });

  benchPlayers.forEach((player) => {
    room.setPlayerTeam(player.id, 0);
  });
}