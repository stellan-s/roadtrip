import { BingoCell } from "./BingoCell";
import { iconMap } from "@/constants/iconMap";
import { IconKey, Language } from "@/constants/items";
import { sha1 } from "js-sha1";

export function BingoGrid({
  grid,
  markedItems,
  onToggleItem,
  themeClasses,
}: {
  grid: { text: string; key: IconKey }[];
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
    <div className="w-full p-4 flex items-center justify-center">
      <div className="grid grid-cols-5 gap-4 items-start middle mx-auto">
        {grid.map((item, index) => {
          const label = item.text;
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
    </div>
  );
}
