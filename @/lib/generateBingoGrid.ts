import { sha1 } from "js-sha1";
import { items, IconKey, Language } from "~/items/items";
export function generateBingoGrid(
  seed: string,
  language: Language = "en",
  numItems: number = 25,
): { text: string; key: IconKey }[] {
  if (items.length < numItems)
    throw new Error("Not enough items to fill the grid.");

  const hash = sha1(seed);
  const numbers: number[] = [];
  for (let i = 0; i < hash.length; i += 2) {
    numbers.push(parseInt(hash.slice(i, i + 2), 16));
  }

  const itemIndices = numbers.map((num) => num % items.length);
  const usedIndices = new Set<number>();
  const selectedItems: { text: string; key: IconKey }[] = [];

  for (const idx of itemIndices) {
    if (!usedIndices.has(idx) && selectedItems.length < numItems) {
      selectedItems.push({
        text: items[idx].text[language],
        key: items[idx].key as IconKey,
      });
      usedIndices.add(idx);
    }
  }
  // Fill up if not enough unique
  let i = 0;
  while (selectedItems.length < numItems) {
    const idx = i % items.length;
    if (!usedIndices.has(idx)) {
      selectedItems.push({
        text: items[idx].text[language],
        key: items[idx].key as IconKey,
      });
      usedIndices.add(idx);
    }
    i++;
  }
  return selectedItems;
}
