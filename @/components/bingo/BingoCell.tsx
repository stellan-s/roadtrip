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
    buttonbgcolor: string;
    buttontext: string;
    buttonborder: string;
    buttonshadow: string;
    ismarkedbg: string;
    ismarkedborder: string;
    ismarkedtext: string;
  };
}) {
  return (
    <div className="max-w-20 pt-0 pb-0 flex flex-col items-center text-center">
      <div
        className={cn(
          themeClasses.cardtextcolor,
          themeClasses.cardborder,
          themeClasses.cardbg,
          themeClasses.textcolor,
          themeClasses.buttonbgcolor,
          themeClasses.buttontext,
          themeClasses.buttonborder,
          themeClasses.buttonshadow,
          "shadow-xl hover:shadow-2xl transition-all duration-300 py-4 transform hover:scale-105 active:scale-95",
          "aspect-square w-full rounded-md flex items-center justify-center box-border overflow-hidden",
          isMarked && themeClasses.ismarkedborder,
          isMarked && themeClasses.ismarkedbg,
          isMarked && themeClasses.ismarkedtext,
        )}
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={onToggle}
      >
        {icon}
      </div>
      <BingoLabel
        label={label}
        textColorClass={cn(
          themeClasses.textcolor,
          "text-xs text-center mt-1 leading-tight tracking-tight font-mono",
        )}
      />
    </div>
  );

  interface BingoLabelProps {
    label: string;
    textColorClass: string;
  }

  function BingoLabel({ label, textColorClass }: BingoLabelProps) {
    return (
      <p
        className={cn(
          "flex justify-center items-center text-xs text-center mt-1 leading-tight tracking-tight font-mono",
          "break-words max-w-full whitespace-normal hyphens-auto",
          textColorClass,
        )}
        lang="auto"
      >
        {label}
      </p>
    );
  }
}
