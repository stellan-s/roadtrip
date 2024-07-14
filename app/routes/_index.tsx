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
      <div className="absolute top-1 right-1">
        <Button
          variant="ghost"
          onClick={() => {
            if (lang === "sv") {
              document.documentElement.lang = "en";
              setLang("en");
              carousel.current?.style.setProperty(
                "transform",
                `translateX(-50%)`,
              );
            }
            if (lang === "en") {
              document.documentElement.lang = "sv";
              setLang("sv");
              carousel.current?.style.setProperty(
                "transform",
                `translateX(0%)`,
              );
            }
          }}
        >
          Switch to {lang === "sv" ? "English" : "Swedish"}
        </Button>
      </div>
      <div className="">
        <div className="w-screen overflow-hidden">
          <div
            ref={carousel}
            className="w-[200%] flex transition-all transform-gpu duration-700 ease-out items-center justify-around"
            style={{
              transform:
                lang === "sv"
                  ? "translateX(0%)"
                  : lang === "en"
                    ? "translateX(-50%)"
                    : "translateX(0%)",
            }}
          >
            <div className="text-center px-2 sm:px-10">
              <h6 className="text-center uppercase mb-3 font-bold tracking-wider">
                Roadtrip Bingo 2000
              </h6>
              <h1 className="font-bold text-5xl tracking-tighter mb-3 px-1">
                Skriv in ett ord för att skapa din bricka
              </h1>
              <p className="text-md px-5">
                Ett ord, vilket som helst. Använd samma ord om du vill återvända
                till en identisk bingobricka
              </p>
            </div>
            <div className="text-center px-2 sm:p-10">
              <h6 className="text-center uppercase mb-3 font-bold tracking-wider">
                Roadtrip Bingo 2000
              </h6>
              <h1 className="font-bold text-5xl tracking-tighter mb-3 px-1">
                Enter a word to create your bingo card
              </h1>
              <p className="text-md px-5">
                Any word, it doesn&#39;t matter which. Use the same word if you
                want to return to an identical bingo card
              </p>
            </div>
          </div>
        </div>
        <div className="px-5 lg:px-80 3xl:px-96">
          <Form action="/bingo">
            <div className="flex flex-col space-y-2">
              <input type="hidden" value={lang} name="language" />
              <Input
                type="text"
                name="magicword"
                className="border-none text-lg py-6"
                style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
              />
              <Button
                variant="default"
                type="submit"
                className="py-7 space-x-1 font-bold text-base tracking-widest"
              >
                <span>Start</span>
                <ArrowRight size={20} />
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
