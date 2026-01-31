import { Form } from "@remix-run/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  ArrowRight,
  Coffee,
  Globe,
  Palette,
  Zap,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { languageCode, languages } from "@/constants/languages";
import { wordSuggestions } from "@/constants/wordSuggestions";
import { themes } from "@/lib/themes";
import { DEFAULT_GAME_STATE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { analytics } from "@/lib/analytics";

export function QuickStartForm({
  lang,
  handleChangeSeedWord,
  seedWord = "",
}: {
  lang: languageCode | null;
  handleChangeSeedWord: (seed: string) => void;
  seedWord?: string;
}) {
  const [theme, setTheme] = useState<string>(DEFAULT_GAME_STATE.theme);
  const [language, setLanguage] = useState<languageCode>(lang || "sv");

  useEffect(() => {
    // randomly select a seed word on initial load
    if (!seedWord) {
      const randomWord =
        wordSuggestions[Math.floor(Math.random() * wordSuggestions.length)];
      handleChangeSeedWord(randomWord);
    }
  }, []);


  return (
    <div className="h-full flex flex-col items-center justify-start p-0 relative">
      <div className="w-full max-w-md relative z-10">
        {/* Main card with enhanced styling */}
        <div className="bg-white rounded-3xl backdrop-blur-xl p-8 shadow-2xl border border-white/30 relative">
          <div className="text-center mb-3 relative flex flex-col items-center gap-2">
            <Zap className="w-12 h-12 text-purple-600" />
            <h2 className="text-gray-600 text-lg md:text-2xl font-bold text-clip bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-wider">
              Instant play
            </h2>
            <p className="text-gray-500 text-sm text-center gap-1">
              Jump right in with a randomly generated board
            </p>
          </div>
          <Form
            className="space-y-6"
            action="/bingo"
            method="get"
            onSubmit={() => {
              analytics.click('generate_board', {
                formType: 'quick',
                language,
                theme,
                seedWordLength: seedWord.length
              });
            }}
          >
            <div className="space-y-3">
              <div className="relative group">
                <Input
                  type="hidden"
                  id="seed"
                  name="seed"
                  value={seedWord}
                  className="bg-gradient-to-r from-white to-blue-50/50 border-2 border-gray-200 text-gray-900 placeholder:text-gray-500 pr-12 py-3 rounded-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 group-hover:border-blue-300"
                  required
                />
              </div>
            </div>
            <div className="space-y-3">
              <label
                htmlFor="language"
                className="text-gray-700 text-sm font-semibold flex items-center gap-2"
              >
                <Globe className="w-4 h-4 text-green-500" />
                Language
              </label>
              <div className="relative">
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
            </div>
            <div className="space-y-3">
              <label
                htmlFor="theme"
                className="text-gray-700 text-sm font-semibold flex items-center gap-2"
              >
                <Palette className="w-4 h-4 text-green-500" />
                Theme
              </label>
              <div className="relative">
                <Select
                  name="theme"
                  value={theme}
                  onValueChange={(newTheme) => {
                    analytics.themeChange(newTheme, {
                      context: 'form_selection',
                      previousTheme: theme
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
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 py-4 rounded-full font-semibold text-lg transform hover:scale-105 active:scale-95"
              disabled={!seedWord.trim()}
            >
              <span className="flex items-center gap-3">
                <span>Get your board</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Form>
          {/* Support message */}
          <div className="mt-6 text-center flex flex-col items-center gap-2">
            {/* <p className="text-gray-500 text-xs inline items-baseline">
              <Square className="w-3 h-3 text-black fill-black rounded-full inline-block mr-1" />
              Built with love – and a respect for time, privacy and usefulness –
              in the spirit of <span className="uppercase">insimply</span>.
            </p> */}
            <p className="text-gray-500 w-2/3 text-xs flex items-center justify-center gap-1">
              <Coffee className="w-6 h-6 text-violet-500" />
              Enjoying the app? Consider supporting the developer!
              <Coffee className="w-6 h-6 text-violet-500" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
