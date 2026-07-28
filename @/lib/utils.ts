import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BINGO_PATTERNS, DEFAULT_GAME_STATE } from "./constants";
import type { ThemeName } from "./themes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type GameState = {
  theme: ThemeName | string;
  markeditems: (string | 0)[];
};

export type LastGame = {
  seed: string;
  language: string;
  theme: ThemeName | string;
  updatedAt: string;
};

const isValidGameState = (state: unknown): state is GameState => {
  if (!state || typeof state !== "object") {
    return false;
  }

  const candidate = state as { theme?: unknown; markeditems?: unknown };
  return (
    typeof candidate.theme === "string" &&
    Array.isArray(candidate.markeditems) &&
    candidate.markeditems.length === 25
  );
};

const isValidLastGame = (state: unknown): state is LastGame => {
  if (!state || typeof state !== "object") {
    return false;
  }

  const candidate = state as {
    seed?: unknown;
    language?: unknown;
    theme?: unknown;
    updatedAt?: unknown;
  };

  return (
    typeof candidate.seed === "string" &&
    candidate.seed.trim().length > 0 &&
    typeof candidate.language === "string" &&
    candidate.language.trim().length > 0 &&
    typeof candidate.theme === "string" &&
    candidate.theme.trim().length > 0 &&
    typeof candidate.updatedAt === "string"
  );
};

export const checkBingo = (markedItems: number[]): boolean => {
  const checkPattern = (pattern: ReadonlyArray<number>) =>
    pattern.every((index) => markedItems[index] !== 0);

  return [
    ...BINGO_PATTERNS.rows,
    ...BINGO_PATTERNS.cols,
    ...BINGO_PATTERNS.diagonals,
  ].some(checkPattern);
};

export const findWinningPattern = (markedItems: number[]): readonly number[] | null => {
  const allPatterns = [
    ...BINGO_PATTERNS.rows,
    ...BINGO_PATTERNS.cols,
    ...BINGO_PATTERNS.diagonals,
  ];

  return (
    allPatterns.find((pattern) =>
      pattern.every((index) => markedItems[index] !== 0),
    ) ?? null
  );
};

export const cleanupLegacyStorage = () => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem("marked-items");
    window.localStorage.removeItem("theme");
  } catch (error) {
    console.error("Failed to cleanup legacy storage:", error);
  }
};

export const loadGameState = (): GameState => {
  if (typeof window === "undefined") return DEFAULT_GAME_STATE;

  const stateString = window.localStorage.getItem("game_state");

  if (!stateString) {
    return { theme: DEFAULT_GAME_STATE.theme, markeditems: Array(25).fill(0) };
  }

  try {
    const parsedState = JSON.parse(stateString);
    if (isValidGameState(parsedState)) {
      return parsedState;
    } else {
      console.warn("Invalid game state structure, using defaults");
      return { theme: DEFAULT_GAME_STATE.theme, markeditems: Array(25).fill(0) };
    }
  } catch (error) {
    console.error("Failed to parse game state:", error);
    return { theme: DEFAULT_GAME_STATE.theme, markeditems: Array(25).fill(0) };
  }
};

export const saveGameState = (gameState: GameState) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem("game_state", JSON.stringify(gameState));
  } catch (error) {
    console.error("Failed to save game state:", error);
  }
};

export const loadLastGame = (): LastGame | null => {
  if (typeof window === "undefined") return null;

  const lastGameString = window.localStorage.getItem("last_game");

  if (!lastGameString) {
    return null;
  }

  try {
    const parsedLastGame = JSON.parse(lastGameString);
    if (isValidLastGame(parsedLastGame)) {
      return parsedLastGame;
    }

    console.warn("Invalid last game structure, ignoring saved value");
    return null;
  } catch (error) {
    console.error("Failed to parse last game:", error);
    return null;
  }
};

export const saveLastGame = (lastGame: Omit<LastGame, "updatedAt">) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      "last_game",
      JSON.stringify({
        ...lastGame,
        updatedAt: new Date().toISOString(),
      }),
    );
  } catch (error) {
    console.error("Failed to save last game:", error);
  }
};
