import { IntroCarousel } from "@/components/landing/IntroCarousel";
import { LanguageSwitcher } from "@/components/landing/LanguageSwitcher";
import { StartForm } from "@/components/landing/StartForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Roadtrip bingo" },
    { name: "description", content: "This is Roadtrip Bingo" },
  ];
};

export default function Index() {
  const [lang, setLang] = useState<"sv" | "en" | null>(null);
  const carousel = useRef<HTMLDivElement>(null);

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
  }, []);

  // synchronize on change
  useEffect(() => {
    if (typeof window === "undefined" || lang === null) {
      return;
    }
    window.localStorage.setItem("language", JSON.stringify(lang));
  }, [lang]);

  return (
    <div className="h-svh flex items-center justify-center container">
      <StartForm lang={lang} />
    </div>
  );
}
