// extracted from: https://github.com/mateocollar/haxball-d-ts

/**
 * Definiciones de tipos para HaxBall Headless Host API
 * Permite autocompletado y validación de tipos en TypeScript o editores modernos.
 */

/**
 * Identificadores de los equipos en HaxBall.
 * 0: Espectadores, 1: Equipo Rojo, 2: Equipo Azul
 */
type TeamID = 0 | 1 | 2;

/**
 * Objeto de configuración para inicializar la sala.
 * Todos los valores son opcionales.
 */
interface RoomConfigObject {
  /** Nombre de la sala. */
  roomName?: string;
  /** Nombre del jugador host. */
  playerName?: string;
  /** Contraseña para la sala. */
  password?: string;
  /** Número máximo de jugadores que acepta la sala. */
  maxPlayers?: number;
  /** Si es true, la sala aparecerá en la lista pública de salas. */
  public?: boolean;
  /** Sobrescribe la geolocalización de la sala. */
  geo?: { code: string; lat: number; lon: number };
  /** Token para saltar el recaptcha (expira en pocos minutos). */
  token?: string;
  /** Si es true, la lista de jugadores estará vacía y el host no será un jugador físico. (Recomendado) */
  noPlayer?: boolean;
}

/**
 * Información del jugador.
 */
interface PlayerObject {
  /** ID único del jugador. Nunca cambia. */
  id: number;
  /** Nombre del jugador. */
  name: string;
  /** Equipo actual del jugador. */
  team: TeamID;
  /** Indica si el jugador tiene permisos de administrador. */
  admin: boolean;
  /** Posición del jugador en el campo. null si no está en la cancha. */
  position: { x: number; y: number } | null;
  /** Estado actual de las teclas del jugador (flags). Ver InputFlags. */
  input: number;
  /** ID público del jugador para validación. Solo disponible en onPlayerJoin. */
  auth: string | null;
  /** Identificador único de conexión (jugadores en la misma red tendrán el mismo). Solo en onPlayerJoin. */
  conn: string;
}

/**
 * Información sobre el estado del partido actual.
 */
interface ScoresObject {
  /** Goles marcados por el equipo rojo. */
  red: number;
  /** Goles marcados por el equipo azul. */
  blue: number;
  /** Segundos transcurridos de juego. */
  time: number;
  /** Límite de goles del partido. */
  scoreLimit: number;
  /** Límite de tiempo del partido (en segundos). */
  timeLimit: number;
}

/**
 * Propiedades físicas de un disco en el juego (jugadores, balón, etc.).
 */
interface DiscPropertiesObject {
  /** Coordenada X de la posición del disco. */
  x: number;
  /** Coordenada Y de la posición del disco. */
  y: number;
  /** Velocidad del disco en el eje X. */
  xspeed: number;
  /** Velocidad del disco en el eje Y. */
  yspeed: number;
  /** Gravedad del disco en el eje X. */
  xgravity: number;
  /** Gravedad del disco en el eje Y. */
  ygravity: number;
  /** Radio del disco. */
  radius: number;
  /** Coeficiente de rebote del disco. */
  bCoeff: number;
  /** Masa inversa del disco (0 lo hace inamovible). */
  invMass: number;
  /** Factor de amortiguación (fricción). */
  damping: number;
  /** Color del disco expresado como entero (ej. 0xFF0000 para rojo). -1 es transparente. */
  color: number;
  /** Máscara de colisión (con qué grupos choca). */
  cMask: number;
  /** Grupo de colisión (a qué grupos pertenece). */
  cGroup: number;
}

/**
 * Constantes para leer y modificar las banderas de colisión (cMask y cGroup).
 */
interface CollisionFlagsObject {
  ball: number;
  red: number;
  blue: number;
  redKO: number;
  blueKO: number;
  wall: number;
  all: number;
  kick: number;
  score: number;
  c0: number;
  c1: number;
  c2: number;
  c3: number;
}

/**
 * Constantes para interpretar el estado de entrada del jugador (teclas presionadas).
 */
interface InputFlagsObject {
  up: number;
  down: number;
  left: number;
  right: number;
  kick: number;
}

/**
 * La interfaz principal para interactuar con la sala.
 */
interface RoomObject {
  /** Constantes de entrada (teclas). */
  InputFlags: InputFlagsObject;
  /** Constantes de colisión. */
  CollisionFlags: CollisionFlagsObject;

  // Métodos

  /** Envía un mensaje de chat. Si no se especifica targetId, se envía a todos. */
  sendChat(message: string, targetId?: number): void;
  /** Otorga o quita derechos de administrador a un jugador. */
  setPlayerAdmin(playerID: number, admin: boolean): void;
  /** Mueve a un jugador a un equipo específico. */
  setPlayerTeam(playerID: number, team: TeamID): void;
  /** Expulsa a un jugador de la sala (kick o ban). */
  kickPlayer(playerID: number, reason: string, ban: boolean): void;
  /** Quita el baneo de un ID de jugador previamente baneado. */
  clearBan(playerId: number): void;
  /** Elimina todos los baneos activos. */
  clearBans(): void;
  /** Establece el límite de goles. (No hace nada si hay un partido en curso). */
  setScoreLimit(limit: number): void;
  /** Establece el límite de tiempo en minutos. (No hace nada si hay un partido en curso). */
  setTimeLimit(limitInMinutes: number): void;
  /** Carga un archivo de estadio .hbs (texto). (No hace nada si hay un partido en curso). */
  setCustomStadium(stadiumFileContents: string): void;
  /** Carga un estadio por defecto (Ej: "Big", "Classic"). */
  setDefaultStadium(stadiumName: string): void;
  /** Bloquea o desbloquea el cambio de equipos por parte de los jugadores. */
  setTeamsLock(locked: boolean): void;
  /** Cambia los colores de un equipo. */
  setTeamColors(team: TeamID, angle: number, textColor: number, colors: number[]): void;
  /** Inicia un partido. */
  startGame(): void;
  /** Detiene el partido actual. */
  stopGame(): void;
  /** Pausa o reanuda el partido actual. */
  pauseGame(pauseState: boolean): void;
  /** Obtiene el objeto jugador correspondiente a un ID. Null si no existe. */
  getPlayer(playerId: number): PlayerObject | null;
  /** Devuelve la lista actual de jugadores en la sala. */
  getPlayerList(): PlayerObject[];
  /** Devuelve la información del marcador si hay un partido en curso. */
  getScores(): ScoresObject | null;
  /** Devuelve la posición de la pelota en el campo. */
  getBallPosition(): { x: number; y: number } | null;
  /** Inicia la grabación de una repetición (replay). */
  startRecording(): void;
  /** Detiene la grabación y devuelve el archivo de repetición. Evita pérdidas de memoria. */
  stopRecording(): Uint8Array | null;
  /** Cambia o elimina (null) la contraseña de la sala. */
  setPassword(pass: string | null): void;
  /** Activa o desactiva el requisito de resolver recaptcha para unirse. */
  setRequireRecaptcha(required: boolean): void;
  /** Reordena a los jugadores en la lista de la sala. */
  reorderPlayers(playerIdList: number[], moveToTop: boolean): void;
  /** Envía un anuncio en pantalla con opciones extendidas de estilo. */
  sendAnnouncement(msg: string, targetId?: number, color?: number, style?: string, sound?: number): void;
  /** Configura los límites de envío de comandos 'kick' (anti-spam). */
  setKickRateLimit(min?: number, rate?: number, burst?: number): void;
  /** Cambia el avatar (2 caracteres) de un jugador. Usar null para restaurar el original. */
  setPlayerAvatar(playerId: number, avatar: string | null): void;
  /** Modifica propiedades de un disco específico (se usa Partial para modificar solo algunos). */
  setDiscProperties(discIndex: number, properties: Partial<DiscPropertiesObject>): void;
  /** Obtiene las propiedades de un disco por su índice. */
  getDiscProperties(discIndex: number): DiscPropertiesObject | null;
  /** Modifica propiedades del disco que controla el jugador especificado. */
  setPlayerDiscProperties(playerId: number, properties: Partial<DiscPropertiesObject>): void;
  /** Obtiene las propiedades del disco de un jugador. */
  getPlayerDiscProperties(playerId: number): DiscPropertiesObject | null;
  /** Obtiene el número total de discos en el juego actual. */
  getDiscCount(): number;

  // Eventos (Listeners que el desarrollador puede sobrescribir)

  /** Se llama cuando un jugador entra a la sala. */
  onPlayerJoin?: (player: PlayerObject) => void;
  /** Se llama cuando un jugador abandona la sala. */
  onPlayerLeave?: (player: PlayerObject) => void;
  /** Se llama cuando un equipo gana el partido. */
  onTeamVictory?: (scores: ScoresObject) => void;
  /** Se llama cuando un jugador envía un mensaje. Retorna false para mutear el mensaje. */
  onPlayerChat?: (player: PlayerObject, message: string) => boolean | void;
  /** Se llama cuando un jugador patea la pelota. */
  onPlayerBallKick?: (player: PlayerObject) => void;
  /** Se llama cuando un equipo marca un gol. */
  onTeamGoal?: (team: TeamID) => void;
  /** Se llama cuando inicia el partido. */
  onGameStart?: (byPlayer: PlayerObject | null) => void;
  /** Se llama cuando se detiene el partido. */
  onGameStop?: (byPlayer: PlayerObject | null) => void;
  /** Se llama cuando los permisos de admin de un jugador cambian. */
  onPlayerAdminChange?: (changedPlayer: PlayerObject, byPlayer: PlayerObject | null) => void;
  /** Se llama cuando un jugador cambia de equipo. */
  onPlayerTeamChange?: (changedPlayer: PlayerObject, byPlayer: PlayerObject | null) => void;
  /** Se llama cuando un jugador es expulsado (siempre se dispara después de onPlayerLeave). */
  onPlayerKicked?: (kickedPlayer: PlayerObject, reason: string, ban: boolean, byPlayer: PlayerObject | null) => void;
  /** Se ejecuta en cada frame lógico (60 veces por segundo). Útil para monitoreo en tiempo real. */
  onGameTick?: () => void;
  /** Se llama cuando el partido es pausado. */
  onGamePause?: (byPlayer: PlayerObject | null) => void;
  /** Se llama cuando el partido es reanudado (antes del delay). */
  onGameUnpause?: (byPlayer: PlayerObject | null) => void;
  /** Se llama cuando las posiciones se reinician tras un gol. */
  onPositionsReset?: () => void;
  /** Se llama cuando el jugador muestra signos de actividad (como presionar una tecla). */
  onPlayerActivity?: (player: PlayerObject) => void;
  /** Se llama cuando un jugador cambia el estado de sus teclas. */
  onPlayerInput?: (player: PlayerObject, prevInput: number) => void;
  /** Se llama cuando cambia el estadio de la sala. */
  onStadiumChange?: (newStadiumName: string, byPlayer: PlayerObject | null) => void;
  /** Se llama cuando se genera con éxito el enlace de la sala. */
  onRoomLink?: (url: string) => void;
  /** Se llama cuando se modifican los límites de kickeo. */
  onKickRateLimitSet?: (min: number, rate: number, burst: number, byPlayer: PlayerObject | null) => void;
  /** Se llama cuando se bloquean/desbloquean los equipos. */
  onTeamsLockChange?: (locked: boolean, byPlayer: PlayerObject | null) => void;
}

/**
 * Función global para inicializar la sala.
 * @param roomConfig Configuración inicial de la sala.
 * @returns El objeto de control de la sala.
 */
declare function HBInit(roomConfig: RoomConfigObject): RoomObject;

/**
 * Función global opcional que HaxBall llama cuando el script Headless se ha cargado por completo.
 */
declare function onHBLoaded(): void;