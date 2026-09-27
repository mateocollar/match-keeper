# match-keeper

Bot ligero escrito en TypeScript para salas de HaxBall Headless API.

## Requisitos

- Node.js (v18 o superior) o Bun
- Navegador web para obtener la clave del mapa/token de sala

## Instalación y Uso

1. Clonar el repositorio e instalar dependencias:
   ```bash
   git clone https://github.com/mateocollar/match-keeper.git
   cd match-keeper
   npm install
   ```
2. Compilar / Ejecutar en desarrollo:
   ```bash
   npm run dev
   ```
3. Generar bundle para producción:
   ```bash
   npm run build
   ```
4.Copiar el archivo generado(`dist/index.js`) y pegarlo en la consola de la página [Haxball Headless Host](https://www.haxball.com/headless)