import { sha1 } from "js-sha1";
import { items, IconKey } from "@/constants/items";

export function generateBingoGrid(
  seed: string,
  numItems: number = 25
): { key: IconKey; text: Record<"sv" | "en", string> }[] {
  const hash = sha1(seed);
  const numbers: number[] = [];

  for (let i = 0; i < hash.length; i += 2) {
    numbers.push(parseInt(hash.slice(i, i + 2), 16));
  }

  const itemIndices = numbers.map((num) => num % items.length);
  const selectedItems: { key: IconKey; text: Record<"sv" | "en", string> }[] = [];
  const usedIndices = new Set<number>();

  for (const idx of itemIndices) {
    if (!usedIndices.has(idx) && selectedItems.length < numItems) {
      selectedItems.push(items[idx]);
      usedIndices.add(idx);
    }
  }

  let i = 0;
  while (selectedItems.length < numItems) {
    if (!usedIndices.has(i % items.length)) {
      selectedItems.push(items[i % items.length]);
      usedIndices.add(i % items.length);
    }
    i++;
  }

  return selectedItems;
}