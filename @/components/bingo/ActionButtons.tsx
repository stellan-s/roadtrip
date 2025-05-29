import { Button } from "@/components/ui/button";
import { ChevronLeft, RefreshCcw } from "lucide-react";

export function ActionButtons({
  onStartOver,
  onReset,
  textColorClass,
  texts,
}: {
  onStartOver: () => void;
  onReset: () => void;
  textColorClass: string;
  texts: { newCard: string; resetCard: string };
}) {
  return (
    <div className="w-full gap-3 flex">
      <Button
        onClick={onStartOver}
        variant="link"
        size="sm"
        className={`${textColorClass} w-1/2 mt-3 text-sm`}
      >
        <ChevronLeft className="w-4 h-4" />
        {texts.newCard}
      </Button>
      <Button
        onClick={onReset}
        variant="link"
        size="sm"
        className={`${textColorClass} w-1/2 mt-3 text-sm`}
      >
        <RefreshCcw className="w-4 h-4 mr-2" />
        {texts.resetCard}
      </Button>
    </div>
  );
}