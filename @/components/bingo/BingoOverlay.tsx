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
      className="absolute w-full h-full bg-black bg-opacity-20 z-40 overflow-hidden bg-opacity-80"
      tabIndex={0}
      onKeyDown={onClick}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 bg-transparent h-0 w-0"
        id="rewardId"
      ></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2">
        <NeonText>BINGO!</NeonText>
        <p
          className={`text-white font-light text-center drop-shadow-sm ${textColorClass}`}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
