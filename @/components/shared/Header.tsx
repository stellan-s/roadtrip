import {
  Car,
  Coffee,
  Copy,
  Download,
  Facebook,
  Mail,
  MessageCircle,
  Printer,
  QrCode,
  Send,
  Share2,
  Smartphone,
  Twitter,
} from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { QRCodeDisplay } from "./QRCodeSVG";

export const Header = ({
  seedWord,
  className,
}: {
  seedWord: string;
  className?: string;
}) => {
  const [language, setLanguage] = useState("sv");
  const [colorTheme, setColorTheme] = useState("blue");
  const [boardSize, setBoardSize] = useState("5x5");
  const [difficulty, setDifficulty] = useState("medium");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("quick");
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const shareUrl = `https://roadtrip-bingo.netlify.app/bingo?seed=${encodeURIComponent(seedWord || "adventure")}&lang=${language}&theme=${colorTheme}`;

  const handleBuyMeCoffee = () => {
    window.open("https://buymeacoffee.com/9zc5qq5wcxl", "_blank");
  };

  const shareToSocial = (platform: string) => {
    const text = `Check out this awesome Roadtrip Bingo board I'm playing! 🚗🎯`;
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + shareUrl)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`,
    };
    window.open(urls[platform as keyof typeof urls], "_blank");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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
          ROADTRIP BINGO 3000
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <Button
          onClick={() => setShowShareDialog(true)}
          variant="outline"
          className="bg-white/20 border-white/30 text-white hover:bg-white/30 rounded-full  px-4 py-2 shadow-lg flex items-center transition-colors duration-200 hover:shadow-xl"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
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
      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Share Your Bingo Board
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Share URL */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Share Link</label>
              <div className="flex gap-2">
                <Input value={shareUrl} readOnly className="bg-gray-100" />
                <Button onClick={() => copyToClipboard(shareUrl)} size="sm">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* QR Code */}
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => setShowQRCode(!showQRCode)}
                className="mb-4"
              >
                <QrCode className="w-4 h-4 mr-2" />
                {showQRCode ? "Hide" : "Show"} QR Code
              </Button>
              {showQRCode && (
                <div className="bg-gray-100 p-4 rounded-xl">
                  <div className="w-32 h-32 bg-white mx-auto rounded-lg flex items-center justify-center">
                    <QRCodeDisplay url={shareUrl} size={128} />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Scan to open board
                  </p>
                </div>
              )}
            </div>

            {/* Social Sharing */}
            <div className="space-y-3">
              <label className="text-sm font-medium">
                Share on Social Media
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => shareToSocial("twitter")}
                  className="justify-start"
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  onClick={() => shareToSocial("facebook")}
                  className="justify-start"
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  onClick={() => shareToSocial("whatsapp")}
                  className="justify-start"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  onClick={() => shareToSocial("telegram")}
                  className="justify-start"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Telegram
                </Button>
              </div>
            </div>

            {/* Export Options */}
            {/* <div className="space-y-3">
              <label className="text-sm font-medium">Export Options</label>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" className="justify-start">
                  <Printer className="w-4 h-4 mr-2" />
                  Print Board
                </Button>
                <Button variant="outline" className="justify-start">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Save to Phone
                </Button>
                <Button variant="outline" className="justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Link
                </Button>
              </div>
            </div> */}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};
