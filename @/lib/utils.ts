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

const isValidGameState = (state: any): state is GameState => {
  return (
    state &&
    typeof state === "object" &&
    typeof state.theme === "string" &&
    Array.isArray(state.markeditems) &&
    state.markeditems.length === 25
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
    return DEFAULT_GAME_STATE as unknown as GameState;
  }

  try {
    const parsedState = JSON.parse(stateString);
    if (isValidGameState(parsedState)) {
      return parsedState;
    } else {
      console.warn("Invalid game state structure, using defaults");
      return DEFAULT_GAME_STATE as unknown as GameState;
    }
  } catch (error) {
    console.error("Failed to parse game state:", error);
    return DEFAULT_GAME_STATE as unknown as GameState;
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
