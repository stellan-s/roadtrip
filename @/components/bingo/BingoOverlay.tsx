import { NeonText } from "../shared/NeonText";

export function BingoOverlay({
  show,
  onClick,
  text,
}: {
  show: boolean;
  onClick: () => void;
  text: string;
}) {
  if (!show) return null;
  return (
    <div
      role="button"
      onClick={onClick}
      className="absolute w-full h-svh bg-black/80 z-40 overflow-hidden"
      tabIndex={0}
      onKeyDown={onClick}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 h-0 w-0"
        id="rewardId"
      />
      <div className="w-full h-screen flex flex-col items-center justify-center gap-8">
        <div className="animate-celebrate-in">
          <NeonText color="purple" size="xl" intensity="high">
            BINGO!
          </NeonText>
        </div>
        <p className="animate-celebrate-in-delayed text-white/80 text-base font-light text-center px-6 py-3 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 transition-colors">
          {text}
        </p>
      </div>
    </div>
  );
}
