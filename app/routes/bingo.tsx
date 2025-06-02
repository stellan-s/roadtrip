import { ActionButtons } from "@/components/bingo/ActionButtons";
import { BingoGrid } from "@/components/bingo/BingoGrid";
import { BingoHeader } from "@/components/bingo/BingoHeader";
import { BingoOverlay } from "@/components/bingo/BingoOverlay";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { generateBingoGrid } from "@/lib/generateBingoGrid";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { clsx, type ClassValue } from "clsx";
import { Check, Loader, Settings } from "lucide-react";
import { startTransition, useEffect, useReducer, useState } from "react";
import { useReward } from "react-rewards";
import { twMerge } from "tailwind-merge";
import "../styles/spin.css";

type Language = "en" | "sv";

const DEFAULT_SEED = "a-space-robot-in-a-car";

export const UiText: Record<
  "en" | "sv" | "fr" | "de" | "es" | "it" | "fi" | "no" | "da",
  {
    newCard: string;
    resetCard: string;
    themeSelect: string;
    bingoStartOver: string;
  }
> = {
  en: {
    newCard: "New card",
    resetCard: "Reset card",
    themeSelect: "Choose theme",
    bingoStartOver: "Click to start over",
  },
  sv: {
    newCard: "Ny bricka",
    resetCard: "Nollställ bricka",
    themeSelect: "Välj tema",
    bingoStartOver: "Klicka för att börja om",
  },
  fr: {
    newCard: "Nouvelle carte",
    resetCard: "Réinitialiser la carte",
    themeSelect: "Choisir le thème",
    bingoStartOver: "Cliquez pour recommencer",
  },
  de: {
    newCard: "Neue Karte",
    resetCard: "Karte zurücksetzen",
    themeSelect: "Thema auswählen",
    bingoStartOver: "Klicken, um neu zu starten",
  },
  es: {
    newCard: "Nueva tarjeta",
    resetCard: "Restablecer tarjeta",
    themeSelect: "Elegir tema",
    bingoStartOver: "Haz clic para empezar de nuevo",
  },
  it: {
    newCard: "Nuova carta",
    resetCard: "Reimposta carta",
    themeSelect: "Scegli tema",
    bingoStartOver: "Clicca per ricominciare",
  },
  fi: {
    newCard: "Uusi kortti",
    resetCard: "Nollaa kortti",
    themeSelect: "Valitse teema",
    bingoStartOver: "Napsauta aloittaaksesi alusta",
  },
  no: {
    newCard: "Nytt kort",
    resetCard: "Tilbakestill kort",
    themeSelect: "Velg tema",
    bingoStartOver: "Klikk for å starte på nytt",
  },
  da: {
    newCard: "Nyt kort",
    resetCard: "Nulstil kort",
    themeSelect: "Vælg tema",
    bingoStartOver: "Klik for at starte forfra",
  },
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const seed = url.searchParams.get("seed") || DEFAULT_SEED;
  const language = (url.searchParams.get("language") || "sv") as Language;

  return json(
    {
      seed,
      language,
    },
    {
      status: 200,
    },
  );
};

export type ThemeConfig = {
  gradient: string;
  header: string;
  cardborder: string;
  cardbg: string;
  cardtextcolor: string;
  textcolor: string;
  buttonbgcolor: string;
  buttontext: string;
  buttonborder: string;
  buttonhover: string;
  buttonshadow: string;
  ismarkedbg: string;
  ismarkedborder: string;
  ismarkedtext: string;
};

export type ThemeName =
  | "mintbreeze"
  | "peachy"
  | "lavenderbliss"
  | "pinkpetal"
  | "violetdream"
  | "tropicalsunrise"
  | "peachblossom"
  | "royalblue"
  | "sunsetglow"
  | "sageforest"
  | "lemonadepop"
  | "icydepths"
  | "blushcloud"
  | "midnightorchid"
  | "oceanmist"
  | "forestwhisper"
  | "crimsonvelvet";

export const themes: Record<ThemeName, ThemeConfig> = {
  mintbreeze: {
    gradient: "linear-gradient(to bottom, #84fab0, #8fd3f4)",
    header: "text-violet-800",
    cardborder: "border-violet-400 border-2",
    cardbg: "bg-white bg-opacity-90",
    cardtextcolor: "text-violet-900",
    textcolor: "text-violet-900",
    buttonbgcolor: "bg-violet-700",
    buttontext: "text-white",
    buttonborder: "border border-violet-800",
    buttonhover: "hover:bg-opacity-60",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-emerald-400 bg-opacity-80",
    ismarkedborder: "border-emerald-500 border-2 border-opacity-100",
    ismarkedtext: "text-emerald-900",
  },
  peachy: {
    gradient: "linear-gradient(to bottom, #fad0c4, #ffd1ff)",
    header: "text-violet-800",
    cardborder: "border-violet-300 border-2",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-violet-900",
    textcolor: "text-violet-900",
    buttonbgcolor: "bg-violet-700",
    buttontext: "text-white",
    buttonborder: "border border-violet-800",
    buttonhover: "hover:bg-opacity-60",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-pink-300 bg-opacity-80",
    ismarkedborder: "border-pink-400 border-2 border-opacity-100",
    ismarkedtext: "text-pink-900",
  },
  lavenderbliss: {
    gradient: "linear-gradient(to bottom, #a18cd1, #fbc2eb)",
    header: "text-violet-900",
    cardborder: "border-violet-400 border-2",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-violet-900",
    textcolor: "text-violet-900",
    buttonbgcolor: "bg-violet-800",
    buttontext: "text-white",
    buttonborder: "border border-violet-900",
    buttonhover: "hover:bg-opacity-60",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-purple-300 bg-opacity-80",
    ismarkedborder: "border-purple-400 border-2 border-opacity-100",
    ismarkedtext: "text-purple-900",
  },
  pinkpetal: {
    gradient: "linear-gradient(to bottom, #ff9a9e, #fecfef)",
    header: "text-violet-900",
    cardborder: "border-violet-400 border-2",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-violet-900",
    textcolor: "text-violet-900",
    buttonbgcolor: "bg-violet-800",
    buttontext: "text-white",
    buttonborder: "border border-violet-900",
    buttonhover: "hover:bg-opacity-60",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-rose-300 bg-opacity-80",
    ismarkedborder: "border-rose-400 border-2 border-opacity-100",
    ismarkedtext: "text-rose-900",
  },
  violetdream: {
    gradient: "linear-gradient(to bottom, #667eea, #764ba2)",
    header: "text-white",
    cardborder: "border-white border-2 border-opacity-60",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-slate-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-white",
    buttontext: "text-violet-900",
    buttonborder: "border border-gray-200",
    buttonhover: "hover:bg-opacity-60",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-indigo-300 bg-opacity-80",
    ismarkedborder: "border-indigo-400 border-2 border-opacity-100",
    ismarkedtext: "text-indigo-900",
  },
  tropicalsunrise: {
    gradient: "linear-gradient(to bottom, #12c2e9, #c471ed, #f64f59)",
    header: "text-white",
    cardborder: "border-white border-2 border-opacity-60",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-slate-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-white",
    buttontext: "text-slate-900",
    buttonborder: "border border-gray-200",
    buttonhover: "hover:bg-opacity-60",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-cyan-300 bg-opacity-80",
    ismarkedborder: "border-cyan-400 border-2 border-opacity-100",
    ismarkedtext: "text-cyan-900",
  },
  peachblossom: {
    gradient: "linear-gradient(to bottom, #ff6e7f, #bfe9ff)",
    header: "text-indigo-900",
    cardborder: "border-indigo-300 border-2",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-indigo-900",
    textcolor: "text-indigo-900",
    buttonbgcolor: "bg-indigo-700",
    buttontext: "text-white",
    buttonborder: "border border-indigo-800",
    buttonhover: "hover:bg-opacity-60",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-blue-300 bg-opacity-80",
    ismarkedborder: "border-blue-400 border-2 border-opacity-100",
    ismarkedtext: "text-blue-900",
  },
  royalblue: {
    gradient: "linear-gradient(to bottom, #6a11cb, #2575fc)",
    header: "text-white",
    cardborder: "border-white border-2 border-opacity-60",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-slate-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-white",
    buttontext: "text-blue-900",
    buttonborder: "border border-gray-200",
    buttonhover: "hover:bg-opacity-60",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-sky-300 bg-opacity-80",
    ismarkedborder: "border-sky-400 border-2 border-opacity-100",
    ismarkedtext: "text-sky-900",
  },
  sunsetglow: {
    gradient: "linear-gradient(to bottom, #ff7e5f, #feb47b)",
    header: "text-white",
    cardborder: "border-white border-2 border-opacity-70",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-slate-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-white",
    buttontext: "text-orange-900",
    buttonborder: "border border-gray-200",
    buttonhover: "hover:bg-opacity-60",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-amber-300 bg-opacity-80",
    ismarkedborder: "border-amber-400 border-2 border-opacity-100",
    ismarkedtext: "text-amber-900",
  },
  sageforest: {
    gradient: "linear-gradient(to bottom, #c9d6ff, #e2e2e2)",
    header: "text-emerald-900",
    cardborder: "border-emerald-400 border-2",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-emerald-900",
    textcolor: "text-emerald-900",
    buttonbgcolor: "bg-emerald-700",
    buttontext: "text-white",
    buttonborder: "border border-emerald-800",
    buttonhover: "hover:bg-opacity-60",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-teal-300 bg-opacity-80",
    ismarkedborder: "border-teal-400 border-2 border-opacity-100",
    ismarkedtext: "text-teal-900",
  },
  // UPDATED THEMES
  lemonadepop: {
    gradient: "linear-gradient(to bottom, #fceabb, #f8b500)",
    header: "text-orange-900",
    cardborder: "border-orange-400 border-2",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-orange-900",
    textcolor: "text-orange-900",
    buttonbgcolor: "bg-orange-600",
    buttontext: "text-white",
    buttonborder: "border border-orange-700",
    buttonhover: "hover:bg-opacity-60",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-orange-300 bg-opacity-80",
    ismarkedborder: "border-orange-400 border-2 border-opacity-100",
    ismarkedtext: "text-orange-900",
  },
  icydepths: {
    gradient: "linear-gradient(to bottom, #e0f7fa, #b2ebf2)", // icy cyan/blue
    header: "text-cyan-800 opacity-90",
    cardborder: "border-cyan-200 border-2 border-opacity-80",
    cardbg: "bg-cyan-100 bg-opacity-60",
    cardtextcolor: "text-slate-800",
    textcolor: "text-slate-800",
    buttonbgcolor: "bg-cyan-700",
    buttontext: "text-white",
    buttonborder: "border border-cyan-800",
    buttonhover: "hover:bg-cyan-800",
    buttonshadow: "shadow-md hover:shadow-lg",
    ismarkedbg: "bg-cyan-300 bg-opacity-70",
    ismarkedborder: "border-cyan-400 border-2 border-opacity-100",
    ismarkedtext: "text-cyan-900",
  },

  blushcloud: {
    gradient: "linear-gradient(to bottom, #f5f7fa, #c3cfe2)",
    header: "text-indigo-800",
    cardborder: "border-indigo-300 border-2",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-indigo-900",
    textcolor: "text-indigo-800",
    buttonbgcolor: "bg-indigo-600",
    buttontext: "text-white",
    buttonborder: "border border-indigo-700",
    buttonhover: "hover:bg-opacity-60",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-indigo-200 bg-opacity-80",
    ismarkedborder: "border-indigo-300 border-2 border-opacity-100",
    ismarkedtext: "text-indigo-900",
  },
  midnightorchid: {
    gradient: "linear-gradient(to bottom, #654ea3, #eaafc8)",
    header: "text-white",
    cardborder: "border-white border-2 border-opacity-60",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-purple-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-white",
    buttontext: "text-purple-900",
    buttonborder: "border border-gray-200",
    buttonhover: "hover:bg-opacity-60",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-fuchsia-300 bg-opacity-80",
    ismarkedborder: "border-fuchsia-400 border-2 border-opacity-100",
    ismarkedtext: "text-fuchsia-900",
  },
  // NEW THEMES
  oceanmist: {
    gradient: "linear-gradient(to bottom, #74b9ff, #0984e3)",
    header: "text-white",
    cardborder: "border-white border-2 border-opacity-60",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-blue-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-white",
    buttontext: "text-blue-900",
    buttonborder: "border border-blue-200",
    buttonhover: "hover:bg-opacity-60",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-blue-300 bg-opacity-80",
    ismarkedborder: "border-blue-400 border-2 border-opacity-100",
    ismarkedtext: "text-blue-900",
  },
  forestwhisper: {
    gradient: "linear-gradient(to bottom, #00b894, #00cec9)",
    header: "text-white",
    cardborder: "border-white border-2 border-opacity-60",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-emerald-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-white",
    buttontext: "text-emerald-900",
    buttonborder: "border border-emerald-200",
    buttonhover: "hover:bg-opacity-60",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-emerald-300 bg-opacity-80",
    ismarkedborder: "border-emerald-400 border-2 border-opacity-100",
    ismarkedtext: "text-emerald-900",
  },
  crimsonvelvet: {
    gradient: "linear-gradient(to bottom, #e17055, #d63031)",
    header: "text-white",
    cardborder: "border-white border-2 border-opacity-60",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-red-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-white",
    buttontext: "text-red-900",
    buttonborder: "border border-red-200",
    buttonhover: "hover:bg-opacity-60",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-red-300 bg-opacity-80",
    ismarkedborder: "border-red-400 border-2 border-opacity-100",
    ismarkedtext: "text-red-900",
  },
};

type Theme = keyof typeof themes;

type State = { theme: Theme | undefined; markeditems: (string | 0)[] };
type Action = {
  type: string;
  payload: {
    value: string | string[] | number | null;
    position: number | null;
  };
};

function createInitialState(): State {
  return { theme: "tropicalsunrise", markeditems: new Array(25).fill(0) };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOAD_STATE":
      return {
        theme: state.theme,
        markeditems: action.payload.value as State["markeditems"],
      };
    case "MARK_ITEM":
      return {
        theme: state.theme,
        markeditems: [
          ...state.markeditems.map((item: string | 0, index: number) =>
            index === action.payload.position ? action.payload.value : item,
          ),
        ] as State["markeditems"],
      };
    case "UNMARK_ITEM":
      return {
        theme: state.theme,
        markeditems: [
          ...state.markeditems.map((item: string | 0, index: number) =>
            index === action.payload.position ? 0 : item,
          ),
        ],
      };
    case "CLEAR_ITEMS":
      return {
        theme: state.theme,
        markeditems: [
          ...state.markeditems.map(() => 0),
        ] as State["markeditems"],
      };
    case "SET_THEME":
      return {
        theme: action.payload.value as Theme,
        markeditems: state.markeditems,
      };
    default:
      return state;
  }
}

export default function Bingo() {
  const [hasClientData, setHasClientData] = useState(false);
  const { seed, language } = useLoaderData<typeof loader>();
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);
  const bingoGrid = generateBingoGrid(seed ?? "", language, 25);

  const { reward } = useReward("rewardId", "confetti", {
    elementCount: 350,
    spread: 120,
    decay: 0.9,
    angle: 90,
    lifetime: 170,
    startVelocity: 40,
  });

  const [isBingo, setIsBingo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let theme, markeditems;

    // legacy cleanup
    window.localStorage.removeItem("marked-items");
    window.localStorage.removeItem("theme");

    const stateString = window.localStorage.getItem("game_state");

    if (!stateString || stateString === "") {
      ("No saved state found");
      window.localStorage.setItem(
        "game_state",
        JSON.stringify({
          theme: "mintbreeze",
          markeditems: new Array(25).fill(0),
        }),
      );
      return;
    }

    try {
      const parsedState = JSON.parse(stateString);

      if (parsedState && typeof parsedState === "object") {
        if (parsedState.theme && Array.isArray(parsedState.markeditems)) {
          theme = parsedState.theme;
          markeditems = parsedState.markeditems;
        } else {
          throw new Error("Invalid structure");
        }
      } else {
        throw new Error("Invalid JSON");
      }
    } catch (error) {
      console.error("Failed to parse state string:", error);
      theme = "tropicalsunrise";
      markeditems = [];
    }

    dispatch({
      type: "LOAD_STATE",
      payload: { value: markeditems, position: null },
    });
    dispatch({ type: "SET_THEME", payload: { value: theme, position: null } });
    setHasClientData(true);
  }, []);

  // // sync to local storage
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (state.markeditems.every((item) => item === 0)) {
      return;
    }

    const stateString = window.localStorage.getItem("game_state");

    if (!stateString || stateString === "") {
      window.localStorage.setItem(
        "game_state",
        JSON.stringify({
          theme: "mintbreeze",
          markeditems: new Array(25).fill(0),
        }),
      );
      return;
    }

    const { theme } = JSON.parse(stateString);

    const currentState = { theme: theme, markeditems: state.markeditems };
    window.localStorage.setItem("game_state", JSON.stringify(currentState));
  }, [state.markeditems]);

  // Check for bingo
  useEffect(() => {
    // Check rows
    for (let i = 0; i < 25; i += 5) {
      const row = state.markeditems.slice(i, i + 5);
      if (row.every((item) => item !== 0)) {
        setIsBingo(true);
      }
    }
    // Check columns
    for (let i = 0; i < 5; i++) {
      const col = [];
      for (let j = 0; j < 5; j++) {
        col.push(state.markeditems[j * 5 + i]);
      }
      if (col.every((item) => item !== 0)) {
        setIsBingo(true);
      }
    }
    // Check diagonals
    const diagonal1 = [0, 6, 12, 18, 24];
    const diagonal2 = [4, 8, 12, 16, 20];
    if (diagonal1.every((i) => state.markeditems[i] !== 0)) {
      setIsBingo(true);
    }
    if (diagonal2.every((i) => state.markeditems[i] !== 0)) {
      setIsBingo(true);
    }
  }, [state?.markeditems]);

  useEffect(() => {
    if (isBingo) {
      reward();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBingo]);

  const handleToggleItem = (index: number, hash: string) => {
    const isAlreadyMarked = state.markeditems.includes(hash);
    dispatch({
      type: isAlreadyMarked ? "UNMARK_ITEM" : "MARK_ITEM",
      payload: { value: isAlreadyMarked ? null : hash, position: index },
    });
  };

  const handleStartOver = () => {
    handleReset();
    setTimeout(() => {
      startTransition(() => {
        navigate(`/`);
      });
    }, 100);
    setIsBingo(false);
  };

  const handleReset = () => {
    dispatch({ type: "CLEAR_ITEMS", payload: { value: null, position: null } });
    // explicitly delete items from local storage
    // if we do it in the useEffect above it will be reset on game load
    const gamestate = window.localStorage.getItem("game_state");
    if (gamestate) {
      const { theme } = JSON.parse(gamestate);
      window.localStorage.setItem(
        "game_state",
        JSON.stringify({ theme, markeditems: new Array(25).fill(0) }),
      );
    }
    setIsBingo(false);
  };

  if (!state || !state.theme) return null;

  return (
    <div className="w-full h-screen relative">
      {!hasClientData ? (
        <div className="z-50 bg-white/20 backdrop-blur-lg w-full h-full fixed pt-1 pb-2 flex flex-col justify-center items-center text-center">
          <div
            className={
              "aspect-square bg-green-400 border-green-300 border-2 border-opacity-100 bg-opacity-80 p-6 rounded-md shadow-lg flex items-center justify-center"
            }
            role="button"
            tabIndex={0}
          >
            <div className="flex flex-col items-center justify-center gap-2 text-green-900">
              <Loader className="animate-spin" size={64} />
              Loading theme
            </div>
          </div>
        </div>
      ) : null}
      <div
        className="bg-green-300 w-full h-screen relative z-10 transition-all duration-700 cubic-bezier(0.165, 0.84, 0.44, 1)"
        style={{
          background: hasClientData
            ? themes[state.theme as Theme].gradient
            : `${themes["tropicalsunrise" as Theme].gradient}`,
          filter: hasClientData ? "" : "blur(5px) grayscale(60%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {isBingo ? (
          <BingoOverlay
            show={isBingo}
            onClick={handleStartOver}
            text={UiText[language].bingoStartOver}
            textColorClass={themes[state.theme as Theme].textcolor}
          />
        ) : null}
        <div className="h-svh overflow-hidden container flex items-center justify-center">
          <div className="m-auto grid gap-3 items-center justify-center w-full">
            <BingoHeader
              textColorClass={themes[state.theme as Theme].textcolor}
            />
            <BingoGrid
              grid={bingoGrid}
              markedItems={state.markeditems.map((item) =>
                item === 0 ? "" : item,
              )}
              onToggleItem={handleToggleItem}
              themeClasses={{
                cardtextcolor: themes[state.theme as Theme].cardtextcolor,
                cardborder: themes[state.theme as Theme].cardborder,
                cardbg: themes[state.theme as Theme].cardbg,
                textcolor: themes[state.theme as Theme].textcolor,
                buttonbgcolor: themes[state.theme as Theme].buttonbgcolor,
                buttontext: themes[state.theme as Theme].buttontext,
                buttonborder: themes[state.theme as Theme].buttonborder,
                buttonhover: themes[state.theme as Theme].buttonhover,
                buttonshadow: themes[state.theme as Theme].buttonshadow,
                ismarkedbg: themes[state.theme as Theme].ismarkedbg,
                ismarkedborder: themes[state.theme as Theme].ismarkedborder,
                ismarkedtext: themes[state.theme as Theme].ismarkedtext,
              }}
            />
            <ActionButtons
              onStartOver={handleStartOver}
              onReset={handleReset}
              textColorClass={themes[state.theme as Theme].textcolor}
              backgroundColorClass={themes[state.theme as Theme].cardbg}
              buttonbgcolor={themes[state.theme as Theme].buttonbgcolor}
              buttontext={themes[state.theme as Theme].buttontext}
              buttonborder={themes[state.theme as Theme].buttonborder}
              buttonhover={themes[state.theme as Theme].buttonhover}
              buttonshadow={themes[state.theme as Theme].buttonshadow}
              texts={UiText[language]}
            />
          </div>
        </div>
        {/* <div className="p-3">
        <div className="font-mono rounded-md bg-gray-900 text-green-400 font-medium w-full flex flex-col text-xs p-3 gap-1">
          <code>{JSON.stringify(gradient, null, 2)}</code>
          <code>{JSON.stringify(bgColorClass, null, 2)}</code>
          <code>{JSON.stringify(textColorClasses, null, 2)}</code>
        </div>
      </div> */}
        <Drawer>
          <DrawerTrigger asChild>
            <div className="absolute top-1 right-0">
              <Button variant="ghost">
                <Settings
                  className={cn(
                    themes[state.theme as Theme].textcolor,
                    "w-5 h-5",
                  )}
                />
              </Button>
            </div>
          </DrawerTrigger>
          <DrawerContent className="bg-opacity-50 backdrop-blur-md bg-white">
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle className="text-2xl text-center font-bold opacity-70 tracking-wide">
                  {UiText[language].themeSelect}
                </DrawerTitle>
              </DrawerHeader>
              <ScrollArea className="h-full">
                <div className="p-4 pb-0 grid gap-2">
                  {Object.keys(themes).map((key) => (
                    <Button
                      key={key}
                      onClick={() => {
                        dispatch({
                          type: "SET_THEME",
                          payload: { value: key as Theme, position: null },
                        });
                        window.localStorage.setItem(
                          "game_state",
                          JSON.stringify({
                            theme: key,
                            markeditems: state.markeditems,
                          }),
                        );
                      }}
                      variant="outline"
                      size="sm"
                      style={{ background: themes[key as Theme].gradient }}
                      className={cn(
                        themes[key as Theme].textcolor,
                        "rounded-sm border-none w-full text-left text-xs uppercase tracking-widest font-semibold",
                      )}
                    >
                      {key}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button
                    variant="default"
                    className="py-5 rounded-sm space-x-1 font-bold text-base tracking-widest"
                  >
                    <Check size={20} />
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center font-sans">
      <h1 className="uppercase text-7xl font-bold">Ouch!</h1>
      <p>There was an error :(</p>
      <Link to="/">Try again?</Link>
    </div>
  );
}
