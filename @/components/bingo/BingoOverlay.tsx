import type { ReactNode } from "react";

const BINGO_LETTERS = ["B", "I", "N", "G", "O"] as const;

const FLIP_DELAY_START = 600;
const FLIP_STAGGER = 300;
const SPIN_DURATION = 2000;
const LAST_BACK_SHOWN = FLIP_DELAY_START + 4 * FLIP_STAGGER + SPIN_DURATION / 2;

export function BingoOverlay({
  show,
  onClick,
  text,
  winningTiles,
}: {
  show: boolean;
  onClick: () => void;
  text: string;
  winningTiles: { icon: ReactNode; label: string }[];
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
      <div className="w-full h-screen flex flex-col items-center justify-center gap-6">
        {/* Flipping tiles row */}
        <div className="flex gap-2 sm:gap-3" style={{ perspective: "1000px" }}>
          {winningTiles.map((tile, i) => (
            <div
              key={i}
              className="w-14 h-14 sm:w-20 sm:h-20 relative"
              style={{
                transformStyle: "preserve-3d",
                animation: `flipTile ${SPIN_DURATION}ms linear ${FLIP_DELAY_START + i * FLIP_STAGGER}ms infinite`,
              }}
            >
              {/* Front face — the bingo item */}
              <div
                className="absolute inset-0 rounded-lg bg-white/90 shadow-lg flex flex-col items-center justify-center p-1 text-gray-700"
                style={{ backfaceVisibility: "hidden" }}
              >
                {tile.icon}
                <p className="text-[8px] sm:text-[10px] text-gray-600 text-center leading-tight mt-0.5 font-mono break-words hyphens-auto">
                  {tile.label}
                </p>
              </div>
              {/* Back face — BINGO letter */}
              <div
                className="absolute inset-0 rounded-lg shadow-lg flex items-center justify-center"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  background:
                    "linear-gradient(135deg, #12c2e9, #c471ed, #f64f59)",
                }}
              >
                <span className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow">
                  {BINGO_LETTERS[i]}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA with sparkles — appears after all tiles have flipped */}
        <div
          className="relative"
          style={{
            opacity: 0,
            animation: `celebrateIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${LAST_BACK_SHOWN + 400}ms forwards`,
          }}
        >
          <span className="absolute text-yellow-200 pointer-events-none" style={{ top: "-10px", left: "18%", animation: "sparkle 3s ease-in-out 0s infinite" }}>✦</span>
          <span className="absolute text-yellow-200 pointer-events-none" style={{ top: "-6px", right: "22%", animation: "sparkle 3s ease-in-out 0.6s infinite" }}>✦</span>
          <span className="absolute text-yellow-200 pointer-events-none" style={{ top: "50%", left: "-16px", animation: "sparkle 3s ease-in-out 1.0s infinite" }}>✦</span>
          <span className="absolute text-yellow-200 pointer-events-none" style={{ top: "50%", right: "-16px", animation: "sparkle 3s ease-in-out 0.3s infinite" }}>✦</span>
          <span className="absolute text-yellow-200 pointer-events-none" style={{ bottom: "-8px", left: "28%", animation: "sparkle 3s ease-in-out 1.3s infinite" }}>✦</span>
          <span className="absolute text-yellow-200 pointer-events-none" style={{ bottom: "-4px", right: "18%", animation: "sparkle 3s ease-in-out 0.8s infinite" }}>✦</span>
          <p className="text-white/80 text-base font-light text-center px-6 py-3 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 transition-colors">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
