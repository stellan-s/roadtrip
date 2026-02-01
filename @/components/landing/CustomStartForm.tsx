import { Form, useNavigate } from "@remix-run/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  ArrowRight,
  ChevronDown,
  Globe,
  MapPin,
  Palette,
  Sparkles,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { languageCode, languages } from "@/constants/languages";
import { wordSuggestions } from "@/constants/wordSuggestions";
import { themes } from "@/lib/themes";
import { DEFAULT_GAME_STATE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { analytics } from "@/lib/analytics";

export function CustomStartForm({
  handleChangeSeedWord,
  seedWord = "",
  lang,
}: {
  handleChangeSeedWord: (seed: string) => void;
  seedWord?: string;
  lang?: languageCode | null;
}) {
  const navigate = useNavigate();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [theme, setTheme] = useState<string>(DEFAULT_GAME_STATE.theme);
  const [language, setLanguage] = useState<languageCode>(lang || "sv");

  const getRandomWord = () => {
    const randomWord =
      wordSuggestions[Math.floor(Math.random() * wordSuggestions.length)];
    handleChangeSeedWord(randomWord);
  };

  const handleQuickStart = () => {
    const seed =
      wordSuggestions[Math.floor(Math.random() * wordSuggestions.length)];
    const params = new URLSearchParams({ seed, language, theme });
    const url = `/bingo?${params}`;

    navigator.clipboard
      .writeText(`${window.location.origin}${url}`)
      .catch(() => {});

    analytics.click("generate_board", {
      formType: "quick",
      language,
      theme,
    });

    navigate(url);
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-4">
      {/* Primary CTA */}
      <Button
        type="button"
        onClick={handleQuickStart}
        className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 py-4 rounded-full font-semibold text-lg transform hover:scale-105 active:scale-95"
      >
        <span className="flex items-center gap-3">
          <span>Start a shared bingo</span>
          <ArrowRight className="w-5 h-5" />
        </span>
      </Button>

      {/* Advanced options toggle */}
      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-white/60 hover:text-white/90 text-sm transition-colors duration-200 flex items-center gap-1"
      >
        Advanced options
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-200",
            showAdvanced && "rotate-180",
          )}
        />
      </button>

      {/* Advanced options panel */}
      {showAdvanced && (
        <div className="w-full bg-white rounded-3xl backdrop-blur-xl p-6 shadow-2xl border border-white/30">
          <Form
            className="space-y-4"
            action="/bingo"
            method="get"
            onSubmit={() => {
              analytics.click("generate_board", {
                formType: "custom",
                language,
                theme,
                seedWordLength: seedWord.length,
              });
            }}
          >
            <div className="space-y-2">
              <label
                htmlFor="seed"
                className="text-gray-700 text-sm font-semibold flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-blue-500" />
                Seed Word
              </label>
              <div className="relative group">
                <Input
                  id="seed"
                  name="seed"
                  value={seedWord}
                  onChange={(e) => handleChangeSeedWord(e.target.value)}
                  placeholder="Enter any word..."
                  className="bg-gradient-to-r from-white to-blue-50/50 border-2 border-gray-200 text-gray-900 placeholder:text-gray-500 pr-12 py-3 rounded-full focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 group-hover:border-blue-300"
                  required
                />
                <Button
                  type="button"
                  onClick={getRandomWord}
                  className="absolute rounded-full right-1 top-1 h-8 w-8 p-0 bg-purple-200/80 hover:bg-purple-400/80 text-blue-800"
                  title="Get random word"
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="sr-only">Get random word</span>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="language"
                className="text-gray-700 text-sm font-semibold flex items-center gap-2"
              >
                <Globe className="w-4 h-4 text-green-500" />
                Language
              </label>
              <Select
                name="language"
                value={language}
                onValueChange={(val) => setLanguage(val as languageCode)}
              >
                <SelectTrigger className="bg-gradient-to-r from-white to-green-50/50 border-2 border-gray-200 text-gray-900 py-3 rounded-full focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-200 hover:border-green-300">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 rounded-none shadow-xl">
                  {languages.map((lang) => (
                    <SelectItem
                      key={lang.code}
                      value={lang.code}
                      className="text-gray-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-none m-1"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{lang.flag}</span>
                        <span className="font-medium">{lang.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="theme"
                className="text-gray-700 text-sm font-semibold flex items-center gap-2"
              >
                <Palette className="w-4 h-4 text-green-500" />
                Theme
              </label>
              <Select
                name="theme"
                value={theme}
                onValueChange={(newTheme) => {
                  analytics.themeChange(newTheme, {
                    context: "form_selection",
                    previousTheme: theme,
                  });
                  setTheme(newTheme);
                }}
              >
                <SelectTrigger className="bg-gradient-to-r from-white to-green-50/50 border-2 border-gray-200 text-gray-900 py-3 rounded-full focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-200 hover:border-green-300">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 rounded-none shadow-xl">
                  {Object.keys(themes).map((key) => {
                    const theme = themes[key as keyof typeof themes];
                    return (
                      <SelectItem
                        key={key}
                        value={key}
                        className="text-gray-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-none m-1"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "rounded-full h-5 w-5",
                              theme.gradient,
                            )}
                          ></div>
                          <span className="font-medium">{theme.name}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 py-3 rounded-full font-semibold"
              disabled={!seedWord.trim()}
            >
              <span className="flex items-center gap-2">
                <span>Get your board</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}
