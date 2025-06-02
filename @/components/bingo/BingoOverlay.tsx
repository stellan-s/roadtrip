import { NeonText } from "../shared/NeonText";

export function BingoOverlay({
  show,
  onClick,
  text,
  textColorClass,
}: {
  show: boolean;
  onClick: () => void;
  text: string;
  textColorClass: string;
}) {
  if (!show) return null;
  return (
    <div
      role="button"
      onClick={onClick}
      className="absolute w-full h-full bg-black z-40 overflow-hidden bg-opacity-80"
      tabIndex={0}
      onKeyDown={onClick}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 bg-transparent h-0 w-0"
        id="rewardId"
      ></div>
      <div className="animate-pulse duration-400 cubic-bezier(0.165, 0.84, 0.44, 1) -translate-x-1/2 -translate-y-1/2 w-full h-screen flex flex-col items-center justify-center">
        <NeonText color="purple" size="xl" intensity="high">
          BINGO!
        </NeonText>
        <p
          className={`text-white font-light text-center drop-shadow-sm ${textColorClass}`}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
