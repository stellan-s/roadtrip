import { Check, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Header = ({
  seedWord,
  className,
}: {
  seedWord: string;
  className?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const seed = seedWord || "adventure";
    const url = `${window.location.origin}/bingo?seed=${encodeURIComponent(seed)}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <style>{`
        @keyframes copyPulse {
          0% { transform: scale(1); }
          40% { transform: scale(1.12); }
          100% { transform: scale(1); }
        }
      `}</style>
      <header
        className={`w-full py-3 px-3 flex justify-between items-start ${className}`}
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <rect x="2" y="2" width="20" height="20" rx="2.5" fill="none" stroke="white" strokeWidth="1.5" opacity="0.8" />
              <line x1="2" y1="8.67" x2="22" y2="8.67" stroke="white" strokeWidth="1" opacity="0.5" />
              <line x1="2" y1="15.33" x2="22" y2="15.33" stroke="white" strokeWidth="1" opacity="0.5" />
              <line x1="8.67" y1="2" x2="8.67" y2="22" stroke="white" strokeWidth="1" opacity="0.5" />
              <line x1="15.33" y1="2" x2="15.33" y2="22" stroke="white" strokeWidth="1" opacity="0.5" />
              <circle cx="5.33" cy="5.33" r="2" fill="white" />
              <circle cx="12" cy="12" r="2" fill="white" />
              <circle cx="18.67" cy="18.67" r="2" fill="white" />
            </svg>
          </div>
          <h1 className="hidden sm:block text-xl md:text-2xl font-bold bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-wider">
            Roadtrip Bingo
          </h1>
        </div>
        <div className="relative">
          {/* Tooltip */}
          <div
            className={cn(
              "absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg pointer-events-none transition-all duration-200",
              copied ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1",
            )}
          >
            Link copied!
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-white" />
          </div>

          {/* Share button */}
          <Button
            onClick={handleShare}
            variant="outline"
            style={copied ? { animation: "copyPulse 0.3s ease-out" } : {}}
            className={cn(
              "border-white/30 text-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2 transition-[background-color,border-color] duration-200 hover:shadow-xl",
              copied
                ? "bg-green-500/30 border-green-500/50"
                : "bg-white/20 hover:bg-white/30",
            )}
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
            {copied ? "Copied!" : "Share"}
          </Button>
        </div>
      </header>
    </>
  );
};
