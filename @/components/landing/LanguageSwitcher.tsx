import { Button } from "../ui/button";

export function LanguageSwitcher({ lang, setLang, carouselRef }: {
  lang: "sv" | "en" | null;
  setLang: (lang: "sv" | "en") => void;
  carouselRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div className="absolute top-1 right-1">
      <Button
        onClick={() => {
          const newLang = lang === "sv" ? "en" : "sv";
          document.documentElement.lang = newLang;
          setLang(newLang);
          carouselRef.current?.style.setProperty(
            "transform",
            newLang === "sv" ? "translateX(0%)" : "translateX(-50%)"
          );
        }}
      >
        Switch to {lang === "sv" ? "English" : "Swedish"}
      </Button>
    </div>
  );
}