# TypeScript Tutorial 01

This project is designed to follow a Tutorial on TypeScript. It will have the most basic way to create a TypeScript project.

Tutorial YouTubeVideo: https://www.youtube.com/watch?v=K01hLNDdqg4
Lesson: https://www.boot.dev/lessons/b00fcdca-6f74-4507-b1af-61f1e8048a16

## Setup

1. create folder
2. `npm init -y`
3. `npm install --save-dev typescript`
4. `npx tsc --init`
   - modify the tsconfig.json file
5. create src folder with index.ts file
6. `npm install --save-dev ts-node`
7. run code:
   - in memory (no dist output): `npx ts-node src/index.ts`
   - compile and run:
   ```bash
     npx tsc       # compiles TS → JS into dist/
     node dist/index.js
   ```

### or update package.json

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts",
    "watch": "tsc -w"
  }
}
```

These options mean:

- npm run dev → run quickly with ts-node (no dist output)
  - 👉 This is the option that we will use most often
- npm run build → compile to dist/
- npm start → run the compiled JS
- npm run watch → auto-recompile on save
