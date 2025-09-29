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
import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import { clsx, type ClassValue } from "clsx";
import { Check, ChevronsUpDown, Loader, Palette, Settings } from "lucide-react";
import {
  startTransition,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useReward } from "react-rewards";
import { twMerge } from "tailwind-merge";
import "../styles/spin.css";
import { FaUpDown } from "react-icons/fa6";
import { Theme, themes } from "@/lib/themes";
import {
  checkBingo,
  cleanupLegacyStorage,
  loadGameState,
  saveGameState,
} from "@/lib/utils";
import { DEFAULT_GAME_STATE } from "@/lib/constants";

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
  const theme = url.searchParams.get("theme") || "tropicalsunrise";

  return json(
    {
      seed,
      language,
      theme,
    },
    {
      status: 200,
    },
  );
};

type State = { theme: Theme | undefined; markeditems: (string | 0)[] };
type Action = {
  type: string;
  payload: {
    value: string | string[] | number | null | (string | 0)[];
    position: number | null;
  };
};

function createInitialState(): State {
  return {
    theme: DEFAULT_GAME_STATE.theme as Theme,
    markeditems: new Array(25).fill(0),
  };
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

export const meta: MetaFunction = () => {
  return [
    { title: "Roadtrip bingo" },
    { name: "description", content: "This is Roadtrip Bingo" },
    {
      name: "theme-color",
      content: () => {
        const theme = themes.tropicalsunrise; // default theme
        return theme.gradient ? theme.gradient.split(",")[0].trim() : "#ffffff";
      },
    },
  ];
};

export default function Bingo() {
  const [hasClientData, setHasClientData] = useState(false);
  const { seed, language, theme } = useLoaderData<typeof loader>();
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);
  const bingoGrid = generateBingoGrid(seed ?? "", language, 25);
  const [searchParams, setSearchParams] = useSearchParams();

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
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialization
    if (!isInitialized) {
      cleanupLegacyStorage();

      const gameState = loadGameState();
      saveGameState(gameState);

      dispatch({
        type: "LOAD_STATE",
        payload: { value: gameState.markeditems, position: null },
      });
      dispatch({
        type: "SET_THEME",
        payload: { value: theme, position: null },
      });

      setHasClientData(true);
      setIsInitialized(true);
      return;
    }

    // Persistence (only after initialization)
    if (typeof window === "undefined") return;
    if (!state?.markeditems || !state?.theme) return;

    try {
      const currentState = loadGameState();
      const markedChanged =
        JSON.stringify(currentState.markeditems) !==
        JSON.stringify(state.markeditems);
      const themeChanged = currentState.theme !== state.theme;

      if (markedChanged || themeChanged) {
        const updatedState = {
          ...currentState,
          markeditems: state.markeditems,
          theme: state.theme,
        };
        saveGameState(updatedState);
      }
    } catch (error) {
      console.error("Failed to persist game state:", error);
    }
  }, [isInitialized, state?.markeditems, state?.theme, theme]);

  // Bingo check (separate concern)
  useEffect(() => {
    if (!state?.markeditems) return;

    if (checkBingo(state.markeditems.map((item) => (item === 0 ? 0 : 1)))) {
      setIsBingo(true);
    }
  }, [state?.markeditems]);

  // useEffect(() => {
  //   if (typeof window === "undefined") {
  //     return;
  //   }

  //   let theme, markeditems;

  //   // legacy cleanup
  //   window.localStorage.removeItem("marked-items");
  //   window.localStorage.removeItem("theme");

  //   const stateString = window.localStorage.getItem("game_state");

  //   if (!stateString || stateString === "") {
  //     window.localStorage.setItem(
  //       "game_state",
  //       JSON.stringify({
  //         theme: "mintbreeze",
  //         markeditems: new Array(25).fill(0),
  //       }),
  //     );
  //     theme = "mintbreeze";
  //     markeditems = new Array(25).fill(0);
  //   } else {
  //     try {
  //       const parsedState = JSON.parse(stateString);

  //       if (parsedState && typeof parsedState === "object") {
  //         if (parsedState.theme && Array.isArray(parsedState.markeditems)) {
  //           theme = parsedState.theme;
  //           markeditems = parsedState.markeditems;
  //         } else {
  //           throw new Error("Invalid structure");
  //         }
  //       } else {
  //         throw new Error("Invalid JSON");
  //       }
  //     } catch (error) {
  //       console.error("Failed to parse state string:", error);
  //       theme = "tropicalsunrise";
  //       markeditems = new Array(25).fill(0);
  //     }
  //   }

  //   dispatch({
  //     type: "LOAD_STATE",
  //     payload: { value: markeditems, position: null },
  //   });
  //   dispatch({ type: "SET_THEME", payload: { value: theme, position: null } });

  //   // ✅ Ensures loading overlay disappears
  //   setHasClientData(true);
  // }, []);

  // // // sync to local storage
  // useEffect(() => {
  //   if (typeof window === "undefined") {
  //     return;
  //   }

  //   if (state.markeditems.every((item) => item === 0)) {
  //     return;
  //   }

  //   const stateString = window.localStorage.getItem("game_state");

  //   if (!stateString || stateString === "") {
  //     window.localStorage.setItem(
  //       "game_state",
  //       JSON.stringify({
  //         theme: "mintbreeze",
  //         markeditems: new Array(25).fill(0),
  //       }),
  //     );
  //     return;
  //   }

  //   const { theme } = JSON.parse(stateString);

  //   const currentState = { theme: theme, markeditems: state.markeditems };
  //   window.localStorage.setItem("game_state", JSON.stringify(currentState));
  // }, [state.markeditems]);

  // // Check for bingo
  // useEffect(() => {
  //   // Check rows
  //   for (let i = 0; i < 25; i += 5) {
  //     const row = state.markeditems.slice(i, i + 5);
  //     if (row.every((item) => item !== 0)) {
  //       setIsBingo(true);
  //     }
  //   }
  //   // Check columns
  //   for (let i = 0; i < 5; i++) {
  //     const col = [];
  //     for (let j = 0; j < 5; j++) {
  //       col.push(state.markeditems[j * 5 + i]);
  //     }
  //     if (col.every((item) => item !== 0)) {
  //       setIsBingo(true);
  //     }
  //   }
  //   // Check diagonals
  //   const diagonal1 = [0, 6, 12, 18, 24];
  //   const diagonal2 = [4, 8, 12, 16, 20];
  //   if (diagonal1.every((i) => state.markeditems[i] !== 0)) {
  //     setIsBingo(true);
  //   }
  //   if (diagonal2.every((i) => state.markeditems[i] !== 0)) {
  //     setIsBingo(true);
  //   }
  // }, [state?.markeditems]);

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

  if (!state) return null;

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
        className={cn(
          "bg-cover bg-center bg-no-repeat",
          hasClientData ? themes[state.theme as Theme].gradient : "",
          "w-full flex items-center justify-center h-screen relative z-10 transition-all duration-700 cubic-bezier(0.165, 0.84, 0.44, 1)",
        )}
      >
        {isBingo ? (
          <BingoOverlay
            show={isBingo}
            onClick={handleStartOver}
            text={UiText[language].bingoStartOver}
            textColorClass={themes[state.theme as Theme].textcolor}
          />
        ) : null}
        <div className="h-svh overflow-y-auto py-5 flex items-center justify-center">
          <div className="m-auto grid gap-1 items-center justify-center w-full">
            <BingoHeader textColorClass={themes[state.theme as Theme].textcolor} />
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
            <div className="absolute top-1 right-1">
              <Button
                variant="ghost"
                className="hover:scale-105 hover:contrast-125"
              >
                <Palette
                  className={cn(
                    "hover:scale-110 transition-transform duration-200 z-50",
                    themes[state.theme as Theme].textcolor,
                    "w-5 h-5",
                  )}
                />
              </Button>
            </div>
          </DrawerTrigger>
          <DrawerContent
            className={`backdrop-blur-xl ${themes[state.theme as Theme].gradient}/20`}
          >
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle className="text-2xl text-center font-bold opacity-70 tracking-wide">
                  <ChevronsUpDown className="inline mr-2" size={24} />
                </DrawerTitle>
              </DrawerHeader>
              <ScrollArea className="h-[320px] w-full">
                <div className="p-4 pb-0 grid gap-2 h-full">
                  {Object.keys(themes)
                    .sort()
                    .map((key) => (
                      <Button
                        key={key}
                        onClick={() => {
                          setSearchParams((prev) => {
                            prev.set("theme", key);
                            return prev;
                          });
                          dispatch({
                            type: "SET_THEME",
                            payload: { value: key, position: null },
                          });
                        }}
                        variant="outline"
                        size="sm"
                        className={cn(
                          "w-full justify-start",
                          themes[key as Theme].gradient,
                          themes[key as Theme].buttontext,
                          themes[key as Theme].buttonborder,
                          themes[key as Theme].buttonshadow,
                          themes[key as Theme].textcolor,
                          "rounded-sm border-none w-full text-left text-xs uppercase tracking-widest font-semibold",
                        )}
                      >
                        <Check
                          className={cn(
                            state.theme === key
                              ? `${themes[key as Theme].accent} inline`
                              : "hidden",
                            "mr-2",
                          )}
                          size={16}
                        />
                        {themes[key as Theme].name}
                      </Button>
                    ))}
                </div>
              </ScrollArea>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button
                    variant="default"
                    className={cn(
                      themes[state.theme as Theme].buttonbgcolor,
                      themes[state.theme as Theme].buttontext,
                      "py-5 rounded-sm space-x-1 font-thin text-sm",
                    )}
                  >
                    <Check size={20} className="inline mr-2" />
                    {UiText[language].themeSelect}
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
