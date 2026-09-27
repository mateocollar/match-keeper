class GoalTracker {
  private lastKicker: PlayerObject | undefined
  private secondLastKicker: PlayerObject | undefined

  // Llamada cuando se golpea al balón
  updateKickers(newKicker: PlayerObject) {
    if (this.lastKicker !== undefined) {
      if (this.lastKicker.id === newKicker.id) return
      this.secondLastKicker = this.lastKicker
      this.lastKicker = newKicker
    } else {
      this.lastKicker = newKicker
    }
  }

  resetKickers() {
    this.lastKicker = undefined
    this.secondLastKicker = undefined
  }

  showGoalNotification(room: RoomObject, teamId: TeamID) {
    const teamName = teamId === 1 ? "ROJO" : teamId == 2 ? "AZUL" : "ESPECTADORES"
    const color = teamId === 1 ? 0xFF5555 : 0x5555FF

    if (this.lastKicker === undefined) {
      room.sendAnnouncement(`¡GOOOOOOL del equipo ${teamName}!`, undefined, color, "bold", 1);
      this.resetKickers();
      return
    }

    // autogol qqqqqqq
    if (this.lastKicker.team !== teamId) {
      room.sendAnnouncement(`¡AUTOGOL de ${this.lastKicker.name} (${teamName})!`, undefined, 0xFFA500, "bold", 1);
      this.resetKickers();
      return
    }

    if (this.secondLastKicker !== undefined && this.secondLastKicker.team === teamId && this.secondLastKicker !== this.lastKicker) {
      room.sendAnnouncement(
        `¡GOOOOOOL del equipo ${teamName}! Anota: ${this.lastKicker.name} | Asistencia: ${this.secondLastKicker.name}`,
        undefined,
        color,
        "bold",
        2
      )
    } else {
      room.sendAnnouncement(
        `¡GOOOOOOL del equipo ${teamName}! Anota: ${this.lastKicker.name}`,
        undefined,
        color,
        "bold",
        1
      )
    }

    this.resetKickers()
  }
}

export default new GoalTracker()