import { cn } from "@/lib/utils";

export function BingoCell({
  icon,
  label,
  isMarked,
  onToggle,
  themeClasses,
}: {
  icon: React.ReactNode;
  label: string;
  isMarked: boolean;
  onToggle: () => void;
  themeClasses: {
    cardtextcolor: string;
    cardborder: string;
    cardbg: string;
    textcolor: string;
  };
}) {
  return (
    <div className="max-w-20 pt-1 pb-2 flex flex-col items-center text-center">
      <div
        className={cn(
          themeClasses.cardtextcolor,
          themeClasses.cardborder,
          themeClasses.cardbg,
          "shadow-xl hover:shadow-2xl transition-all duration-300 py-4 transform hover:scale-105 active:scale-95",
          "aspect-square w-full rounded-md flex items-center justify-center box-border overflow-hidden",
          isMarked &&
            "bg-green-400 border-green-300 border-2 border-opacity-100 bg-opacity-80",
        )}
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={onToggle}
      >
        {icon}
      </div>
      <p
        className={cn(
          "flex justify-center items-center",
          themeClasses.textcolor,
          "text-[10px] md:text-xs text-center w-full mt-1 leading-tight tracking-tight font-mono",
        )}
      >
        {label}
      </p>
    </div>
  );
}
