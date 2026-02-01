import { MountainRange } from "@/components/shared/MountainRange";
import { CustomStartForm } from "@/components/landing/CustomStartForm";
import { Header } from "@/components/shared/Header";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Sparkles, Share2, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { analytics } from "@/lib/analytics";

const BASE_URL = "https://roadtrip-bingo.netlify.app";

export const links: LinksFunction = () => [
  { rel: "canonical", href: BASE_URL },
];

export const meta: MetaFunction = () => {
  const title = "Roadtrip Bingo";
  const description = "Free shareable roadtrip bingo. Enter a seed word to generate a unique board your whole car can play. 9 languages, 91 themes, no account needed.";

  return [
    { title },
    { name: "description", content: description },
    { property: "og:site_name", content: title },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: BASE_URL },
    { property: "og:type", content: "website" },
    { property: "og:image", content: `${BASE_URL}/og-image.png` },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: description },
    { property: "twitter:image", content: `${BASE_URL}/og-image.png` },
  ];
};

export default function Index() {
  const [seedWord, setSeedWord] = useState("");
  const [lang, setLang] = useState<"sv" | "en" | null>(null);

  // synchronize initially
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const itemString = window.localStorage.getItem("language");

    if (!itemString || itemString === "" || itemString === "null") {
      setLang("sv");
      return;
    }

    const language = JSON.parse(itemString);
    setLang(language);

    // Track page view
    analytics.pageView('landing_page', {
      initialLanguage: language
    });
  }, []);

  // synchronize on change
  useEffect(() => {
    if (typeof window === "undefined" || lang === null) {
      return;
    }
    window.localStorage.setItem("language", JSON.stringify(lang));
  }, [lang]);

  const handleChangeSeedWord = (seed: string) => {
    setSeedWord(seed.trim().toLowerCase());
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen w-full relative">
        <MountainRange />

        {/* Header — absolute so it doesn't offset the vertical centering */}
        <div className="absolute top-0 left-0 right-0 z-20 px-2 md:px-6 pt-1">
          <Header seedWord={seedWord} />
        </div>

        {/* Content — centers in full viewport */}
        <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center px-2 md:px-6">
          <div className="w-full max-w-md mx-auto text-center py-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight drop-shadow">
              Play the same roadtrip bingo — together
            </h2>
            <p className="text-white/70 text-sm mt-1">
              One link. Same board. No accounts.
            </p>
          </div>
          <CustomStartForm
            handleChangeSeedWord={handleChangeSeedWord}
            seedWord={seedWord}
            lang={lang}
          />
        </div>
      </div>

      {/* How it works */}
      <div className="relative z-10 w-full py-16 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-white text-center text-xl md:text-2xl font-bold mb-10 drop-shadow">
            How it works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-white font-semibold">Pick a seed</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Any word works. It generates a unique board everyone will see.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <Share2 className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-white font-semibold">Share the link</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                One link gives everyone the exact same board, instantly.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-white font-semibold">Play together</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Cross off items as you spot them. First to bingo wins.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full py-6 px-4 md:px-8 border-t border-white/10">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-sm">
          <span>© 2026 Roadtrip Bingo</span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/stellan-s/roadtrip"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://buymeacoffee.com/9zc5qq5wcxl"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors"
            >
              Buy me a coffee ☕
            </a>
          </div>
        </div>
      </footer>
    </ErrorBoundary>
  );
}
