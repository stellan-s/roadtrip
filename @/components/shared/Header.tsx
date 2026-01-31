import { Car, Check, Coffee, Share2 } from "lucide-react";
import { Button } from "../ui/button";
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

  const handleBuyMeCoffee = () => {
    window.open("https://buymeacoffee.com/9zc5qq5wcxl", "_blank");
  };

  return (
    <header
      className={`w-full py-3 px-3 flex justify-between items-start ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-lg aspect-square">
          <Car className="h-6 w-6 text-gray-800" />
        </div>
        <h1 className="hidden sm:block text-xl md:text-2xl font-bold bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-wider">
          Roadtrip Bingo
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <Button
          onClick={handleShare}
          variant="outline"
          className="bg-white/20 border-white/30 text-white hover:bg-white/30 rounded-full px-4 py-2 shadow-lg flex items-center transition-colors duration-200 hover:shadow-xl"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </>
          )}
        </Button>
        <Button
          onClick={handleBuyMeCoffee}
          className="bg-white text-gray-800 hover:bg-gray-100 font-medium shadow-lg rounded-full px-4 py-2"
        >
          <Coffee className="w-4 h-4 mr-2 text-amber-600" />
          <span className="hidden sm:inline">Buy me a coffee</span>
          <span className="sm:hidden">☕</span>
        </Button>
      </div>
    </header>
  );
};
