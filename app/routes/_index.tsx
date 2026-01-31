import { CustomStartForm } from "@/components/landing/CustomStartForm";
import { Header } from "@/components/shared/Header";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
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
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-2 md:p-6">
        <Header seedWord={seedWord} />
        <div className="w-full max-w-md mx-auto text-center py-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow">
            Play bingo together on any road trip
          </h2>
          <p className="text-white/70 text-sm mt-1">
            Pick a seed word → everyone gets the same board
          </p>
        </div>
        <CustomStartForm
          handleChangeSeedWord={handleChangeSeedWord}
          seedWord={seedWord}
          lang={lang}
        />
      </div>
    </ErrorBoundary>
  );
}
