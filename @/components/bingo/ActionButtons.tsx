import { Button } from "@/components/ui/button";
import { analytics } from "@/lib/analytics";

export function ActionButtons({
  onStartOver,
  textColorClass,
  buttonbgcolor = "bg-white/10 hover:bg-white/20",
  buttontext = "text-white",
  buttonborder = "border-white",
  buttonshadow = "shadow-md hover:shadow-lg",
  texts,
}: {
  onStartOver: () => void;
  textColorClass: string;
  buttonbgcolor?: string;
  buttontext?: string;
  buttonborder?: string;
  buttonshadow?: string;
  texts: { newCard: string };
}) {
  return (
    <div className="w-full px-5 gap-3 mt-1 flex items-center justify-center flex-col sm:flex-row">
      <Button
        key="start-over"
        onClick={() => {
          analytics.click('start_over');
          onStartOver();
        }}
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
          hover:contrast-125
          active:scale-95`}
      >
        {texts.newCard}
      </Button>
    </div>
  );
}
