import { CustomStartForm } from "@/components/landing/CustomStartForm";
import { Header } from "@/components/shared/Header";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { MetaFunction } from "@remix-run/node";
import { Wrench, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { QuickStartForm } from "@/components/landing/QuickStartForm";
import { analytics } from "@/lib/analytics";

export const meta: MetaFunction = () => {
  return [
    { title: "Roadtrip bingo" },
    { name: "description", content: "This is Roadtrip Bingo" },
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
      <div className="min-h-screen w-full flex flex-col items-start justify-center p-2 md:p-6">
        <Header seedWord={seedWord} />
        <Tabs
          defaultValue="instant"
          className="h-full w-full flex flex-col gap-5 items-center justify-start grow"
        >
          <TabsList>
            <TabsTrigger className="shadow-2xl" value="instant">
              <Zap size={14} className="inline mr-1" />
              Instant
            </TabsTrigger>
            <TabsTrigger className="shadow-2xl" value="custom">
              <Wrench size={14} className="inline mr-1" />
              Custom
            </TabsTrigger>
          </TabsList>
          <TabsContent value="instant" className="animate-slide-in">
            <QuickStartForm
              handleChangeSeedWord={handleChangeSeedWord}
              seedWord={seedWord}
              lang={lang}
            />
          </TabsContent>
          <TabsContent value="custom" className="animate-slide-in">
            <CustomStartForm
              handleChangeSeedWord={handleChangeSeedWord}
              seedWord={seedWord}
            />
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundary>
  );
}
