export const DEFAULT_GAME_STATE = {
  theme: "mintbreeze",
  markeditems: new Array(25).fill(0),
} as const;

export const BINGO_PATTERNS = {
  rows: Array.from({ length: 5 }, (_, i) =>
    Array.from({ length: 5 }, (_, j) => i * 5 + j),
  ),
  cols: Array.from({ length: 5 }, (_, i) =>
    Array.from({ length: 5 }, (_, j) => j * 5 + i),
  ),
  diagonals: [
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
  ],
} as const;
