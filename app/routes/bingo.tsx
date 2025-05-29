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
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { clsx, type ClassValue } from "clsx";
import { sha1 } from "js-sha1";
import {
  Ambulance,
  Anchor,
  Bike,
  BoomBox,
  Car,
  CarFront,
  Caravan,
  Castle,
  Cctv,
  Check,
  ChevronLeft,
  Church,
  CloudRain,
  MapPinned,
  Megaphone,
  Milestone,
  Mountain,
  Plane,
  RefreshCcw,
  Settings,
  Shrub,
  Siren,
  Sun,
  Telescope,
  Tent,
  TowerControl,
  Tractor,
  TrafficCone,
  TrainTrack,
  Truck,
  Utensils,
  Waves,
} from "lucide-react";
import { useEffect, useReducer, useState } from "react";
import { FaHatCowboySide } from "react-icons/fa";
import {
  FaBridge,
  FaCarTunnel,
  FaFerry,
  FaMotorcycle,
  FaMountainCity,
} from "react-icons/fa6";
import { GiWindTurbine } from "react-icons/gi";
import {
  IoCarSportSharp,
  IoCloudOutline,
  IoFastFoodOutline,
} from "react-icons/io5";
import { LuCoffee } from "react-icons/lu";
import { MdLocalGasStation } from "react-icons/md";
import { PiBarnDuotone, PiPoliceCarFill, PiWindmill } from "react-icons/pi";
import { TbCamper, TbHelicopter, TbRollercoaster } from "react-icons/tb";
import { useReward } from "react-rewards";
import { twMerge } from "tailwind-merge";
import "../styles/spin.css";
import { BingoHeader } from "@/components/bingo/BingoHeader";
import { BingoOverlay } from "@/components/bingo/BingoOverlay";
import { ActionButtons } from "@/components/bingo/ActionButtons";
import { BingoGrid } from "@/components/bingo/BingoGrid";
import { generateBingoGrid } from "@/lib/generateBingoGrid";

type Language = "en" | "sv";

const UiText = {
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
};


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const magicword = url.searchParams.get("magicword");
  const language = (url.searchParams.get("language") || "sv") as Language;

  return json(
    {
      magicword,
      language,
    },
    {
      status: 200,
    },
  );
};

const themes = {
  mintbreeze: {
    gradient: "linear-gradient(to bottom, #84fab0, #8fd3f4)",
    header: "text-violet-700 opacity-90",
    cardborder: "border-violet-300 border-2 border-opacity-80",
    cardbg: "bg-yellow-100 bg-opacity-70",
    cardtextcolor: "text-violet-900",
    textcolor: "text-violet-900",
  },
  peachy: {
    gradient: "linear-gradient(to bottom, #fad0c4, #ffd1ff)",
    header: "text-violet-700 opacity-90",
    cardborder: "border-violet-400 border-2 border-opacity-80",
    cardbg: "bg-violet-200 bg-opacity-70",
    cardtextcolor: "text-violet-900",
    textcolor: "text-violet-900",
  },
  lavenderbliss: {
    gradient: "linear-gradient(to bottom, #a18cd1, #fbc2eb)",
    header: "text-violet-700 opacity-90",
    cardborder: "border-violet-200 border-2 border-opacity-80",
    cardbg: "bg-violet-300 bg-opacity-70",
    cardtextcolor: "text-violet-900",
    textcolor: "text-violet-900",
  },
  pinkpetal: {
    gradient: "linear-gradient(to bottom, #ff9a9e, #fecfef)",
    header: "text-emerald-200 opacity-90",
    cardborder: "border-violet-200 border-2 border-opacity-80",
    cardbg: "bg-violet-300 bg-opacity-70",
    cardtextcolor: "text-violet-900",
    textcolor: "text-violet-900",
  },
  violetdream: {
    gradient: "linear-gradient(to bottom, #667eea, #764ba2)",
    header: "text-sky-200 opacity-80",
    cardborder: "border-sky-200 border-2 border-opacity-80",
    cardbg: "bg-sky-300 bg-opacity-70",
    cardtextcolor: "text-sky-900",
    textcolor: "text-sky-200",
  },
  tropicalsunrise: {
    gradient: "linear-gradient(to bottom, #12c2e9, #c471ed, #f64f59)",
    header: "text-indigo-700 opacity-80",
    cardborder: "border-sky-400 border-2 border-opacity-80",
    cardbg: "bg-sky-300 bg-opacity-70",
    cardtextcolor: "text-sky-900",
    textcolor: "text-sky-50",
  },
  peachblossom: {
    gradient: "linear-gradient(to bottom, #ff6e7f, #bfe9ff)",
    header: "text-indigo-700 opacity-80",
    cardborder: "border-indigo-400 border-2 border-opacity-80",
    cardbg: "bg-indigo-300 bg-opacity-70",
    cardtextcolor: "text-indigo-900",
    textcolor: "text-indigo-900",
  },
  royalblue: {
    gradient: "linear-gradient(to bottom, #6a11cb, #2575fc)",
    header: "text-sky-300",
    cardborder: "border-sky-200 border-2 border-opacity-80",
    cardbg: "bg-sky-200 bg-opacity-70",
    cardtextcolor: "text-sky-900",
    textcolor: "text-sky-200",
  },
  sunsetglow: {
    gradient: "linear-gradient(to bottom, #ff7e5f, #feb47b)",
    header: "text-orange-200",
    cardborder: "border-violet-900 border-2 border-opacity-30",
    cardbg: "bg-violet-300 bg-opacity-40",
    cardtextcolor: "text-violet-900",
    textcolor: "text-violet-900",
  },
};

type Theme = keyof typeof themes;

type State = { theme: Theme | undefined; markeditems: (string | 0)[] };
type Action = {
  type: string;
  payload: { value: string | string[] | number | null; position: number | null };
};

function createInitialState(): State {
  return { theme: "tropicalsunrise", markeditems: new Array(25).fill(0) };
}

function reducer(state: State, action: Action): State {
  console.log("🚀 ~ reducer ~ state:", state)
  console.log("🚀 ~ reducer ~ action:", action)
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
  const { magicword, language } = useLoaderData<typeof loader>();
  const bingoGrid = generateBingoGrid(magicword ?? "", 25);
  const [state, dispatch] = useReducer(reducer, null, createInitialState);
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
      console.log("No saved state found");
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
      console.log("No saved state found");
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
        console.log("BINGO ON ROW", i / 5 + 1);
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
        console.log("BINGO ON COLUMN", i + 1);
        setIsBingo(true);
      }
    }
    // Check diagonals
    const diagonal1 = [0, 6, 12, 18, 24];
    const diagonal2 = [4, 8, 12, 16, 20];
    if (diagonal1.every((i) => state.markeditems[i] !== 0)) {
      console.log("BINGO ON DIAGONAL 1");

      setIsBingo(true);
    }
    if (diagonal2.every((i) => state.markeditems[i] !== 0)) {
      console.log("BINGO ON DIAGONAL 2");

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
    navigate("/");
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

  

  return (
    <div
      className="bg-green-300 w-full h-screen transition-all duration-1000 ease-in-out relative"
      style={{
        background: themes[state.theme as Theme].gradient,
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
      <div className="h-svh overflow-hidden container flex">
        <div className="m-auto">
          <BingoHeader textColorClass={themes[state.theme as Theme].textcolor} />
          <BingoGrid
            grid={bingoGrid}
            language={language}
            markedItems={state.markeditems.map(item => item === 0 ? "" : item)}
            onToggleItem={handleToggleItem}
            themeClasses={{
              cardtextcolor: themes[state.theme as Theme].cardtextcolor,
              cardborder: themes[state.theme as Theme].cardborder,
              cardbg: themes[state.theme as Theme].cardbg,
              textcolor: themes[state.theme as Theme].textcolor,
            }}
          />
          <ActionButtons
            onStartOver={() => {
              navigate("/");
            }}
            onReset={handleReset}
            textColorClass={themes[state.theme as Theme].textcolor}
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
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>{UiText[language].themeSelect}</DrawerTitle>
            </DrawerHeader>
            <ScrollArea className="h-full">
              <div className="p-4 pb-0 grid gap-2">
                {Object.keys(themes).map((key) => (
                  <Button
                    key={key}
                    onClick={() => {
                      console.log(key);
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
