import { BingoCell } from "./BingoCell";
import { iconMap } from "@/constants/iconMap";
import { IconKey } from "@/constants/items";
import { sha1 } from "js-sha1";

export function BingoGrid({
  grid,
  language,
  markedItems,
  onToggleItem,
  themeClasses,
}: {
  grid: { text: Record<"sv" | "en", string>; key: IconKey }[];
  language: "sv" | "en";
  markedItems: string[];
  onToggleItem: (index: number, hash: string) => void;
  themeClasses: {
    cardtextcolor: string;
    cardborder: string;
    cardbg: string;
    textcolor: string;
  };
}) {
  return (
    <div className="relative grid grid-cols-5 gap-2">
      {grid.map((item, index) => {
        const label = item.text[language];
        const hash = sha1(label);
        return (
          <BingoCell
            key={label}
            icon={iconMap[item.key]}
            label={label}
            isMarked={markedItems.includes(hash)}
            onToggle={() => onToggleItem(index, hash)}
            themeClasses={themeClasses}
          />
        );
      })}
    </div>
  );
}