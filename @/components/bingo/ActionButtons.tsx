import { Button } from "@/components/ui/button";
import { ChevronLeft, RefreshCcw } from "lucide-react";

export function ActionButtons({
  onStartOver,
  onReset,
  textColorClass,
  backgroundColorClass,
  texts,
}: {
  onStartOver: () => void;
  onReset: () => void;
  textColorClass: string;
  backgroundColorClass: string;
  texts: { newCard: string; resetCard: string };
}) {
  return (
    <div className="w-full gap-3 flex items-center justify-center flex-col sm:flex-row">
      <Button
        key="start-over"
        onClick={onStartOver}
        variant="outline"
        size="sm"
        className={`${textColorClass} sm:max-w-48 ${backgroundColorClass} w-full text-sm flex justify-center gap-1 shadow-md hover:shadow-2xl transition-all duration-300 py-4 transform hover:scale-105 active:scale-95`}
      >
        {texts.newCard}
      </Button>
      <Button
        key="reset-card"
        onClick={onReset}
        variant="outline"
        size="sm"
        className={`${textColorClass} sm:max-w-48 ${backgroundColorClass} w-full text-sm flex justify-center gap-1 shadow-md hover:shadow-2xl transition-all duration-300 py-4 transform hover:scale-105 active:scale-95`}
      >
        {texts.resetCard}
      </Button>
    </div>
  );
}
