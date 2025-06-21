import { Button } from "@/components/ui/button";
import { ChevronLeft, RefreshCcw } from "lucide-react";

export function ActionButtons({
  onStartOver,
  onReset,
  textColorClass,
  backgroundColorClass,
  buttonbgcolor = "bg-white/10 hover:bg-white/20",
  buttontext = "text-white",
  buttonborder = "border-white",
  buttonshadow = "shadow-md hover:shadow-lg",
  texts,
}: {
  onStartOver: () => void;
  onReset: () => void;
  textColorClass: string;
  backgroundColorClass: string;
  buttonbgcolor?: string;
  buttontext?: string;
  buttonborder?: string;
  buttonshadow?: string;
  texts: { newCard: string; resetCard: string };
}) {
  return (
    <div className="w-full gap-3 mt-1 flex items-center justify-center flex-col sm:flex-row">
      <Button
        key="start-over"
        onClick={onStartOver}
        variant="outline"
        size="sm"
        className={`
          ${textColorClass} 
          ${buttonbgcolor}
          ${buttontext}
          ${buttonborder}
          ${buttonshadow}
          sm:max-w-48
          w-full
          text-sm
          flex
          justify-center
          gap-1
          shadow-md
          hover:shadow-2xl
          transition-all
          duration-300 py-4
          transform
          hover:scale-105
          active:scale-95`}
      >
        {texts.newCard}
      </Button>
    </div>
  );
}
