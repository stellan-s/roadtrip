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
  Loader,
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
import { useEffect, useLayoutEffect, useReducer } from "react";
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
import { twMerge } from "tailwind-merge";

type Language = "en" | "sv";

const UiText = {
  en: {
    newCard: "New card",
    resetCard: "Reset card",
    themeSelect: "Choose theme",
  },
  sv: {
    newCard: "Ny bricka",
    resetCard: "Nollställ bricka",
    themeSelect: "Välj tema",
  },
};

const items = [
  {
    text: { en: "Foreign car", sv: "Utländsk bil" },
    icon: <Car className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Roadside diner", sv: "Vägkrog" },
    icon: <Utensils className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Livestock", sv: "Boskap" },
    icon: <FaHatCowboySide className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Rest area", sv: "Rastplats" },
    icon: <LuCoffee className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Roadwork", sv: "Vägarbete" },
    icon: <TrafficCone className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Railroad crossing", sv: "Tågövergång" },
    icon: <TrainTrack className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Windmill", sv: "Väderkvarn" },
    icon: <PiWindmill className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Watercourse", sv: "Vattendrag" },
    icon: <Waves className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Campsite", sv: "Campingplats" },
    icon: <Tent className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Hill", sv: "Kulle" },
    icon: <Mountain className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Wildlife sign", sv: "Viltskylt" },
    icon: <Milestone className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Park", sv: "Park" },
    icon: <Shrub className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Bridge", sv: "Bro" },
    icon: <FaBridge className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Truck", sv: "Lastbil" },
    icon: <Truck className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Billboard", sv: "Reklam" },
    icon: <Megaphone className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Motorcycle", sv: "Motorcykel" },
    icon: <FaMotorcycle className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Police car", sv: "Polisbil" },
    icon: <PiPoliceCarFill className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Emergency response", sv: "Utryckning" },
    icon: <Siren className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Convertible", sv: "Cabriolet" },
    icon: <CarFront className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Motorhome", sv: "Husbil" },
    icon: <TbCamper className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Fast food", sv: "Snabbmat" },
    icon: <IoFastFoodOutline className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Viewpoint", sv: "Utsikt" },
    icon: <Telescope className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Amusement park", sv: "Nöjespark" },
    icon: <TbRollercoaster className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Tractor", sv: "Traktor" },
    icon: <Tractor className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Airport", sv: "Flygplats" },
    icon: <TowerControl className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Tunnel", sv: "Tunnel" },
    icon: <FaCarTunnel className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Gas station", sv: "Bensinstation" },
    icon: <MdLocalGasStation className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Ferry", sv: "Färja" },
    icon: <FaFerry className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Solar panels", sv: "Solpaneler" },
    icon: <Sun className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Vintage car", sv: "Veteranbil" },
    icon: <Car className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Radio advertisement", sv: "Radioreklam" },
    icon: <BoomBox className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Unique vehicle", sv: "Unikt fordon" },
    icon: <IoCarSportSharp className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Bicycle", sv: "Cykel" },
    icon: <Bike className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Barn", sv: "Ladugård" },
    icon: <PiBarnDuotone className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Landmark", sv: "Sevärdhet" },
    icon: <Castle className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Rain", sv: "Regn" },
    icon: <CloudRain className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Fluffy cloud", sv: "Fluffigt moln" },
    icon: <IoCloudOutline className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Caravan", sv: "Husvagn" },
    icon: <Caravan className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Changing municipality", sv: "Byter kommun" },
    icon: <FaMountainCity className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Airplane", sv: "Flygplan" },
    icon: <Plane className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Helicopter", sv: "Helikopter" },
    icon: <TbHelicopter className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Delivery truck", sv: "Budbil" },
    icon: <Truck className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Ambulance", sv: "Ambulans" },
    icon: <Ambulance className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "County border", sv: "Korsar länsgräns" },
    icon: <MapPinned className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Church", sv: "Kyrka" },
    icon: <Church className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Rental car", sv: "Hyrbil" },
    icon: <Car className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Wind turbine", sv: "Vindkraftverk" },
    icon: <GiWindTurbine className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Speed camera", sv: "Fartkamera" },
    icon: <Cctv className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
  {
    text: { en: "Sea", sv: "Havet" },
    icon: <Anchor className="opacity-100 h-7 w-7 md:h-9 md:w-9" />,
  },
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function generateBingoGrid(
  seed: string,
  numItems: number = 25,
): { text: Record<Language, string>; icon: React.ReactNode }[] {
  // Convert the seed string to a SHA-1 hash
  const hash = sha1(seed);

  // Convert the hash to a list of numbers
  const numbers: number[] = [];
  for (let i = 0; i < hash.length; i += 2) {
    numbers.push(parseInt(hash.slice(i, i + 2), 16));
  }

  // Ensure the numbers are within the range of the items list
  const itemIndices = numbers.map((num) => num % items.length);

  // Select a unique set of items based on the indices
  const selectedItems: {
    text: Record<Language, string>;
    icon: React.ReactNode;
  }[] = [];
  const usedIndices = new Set<number>();

  for (const idx of itemIndices) {
    if (!usedIndices.has(idx) && selectedItems.length < numItems) {
      selectedItems.push(items[idx]);
      usedIndices.add(idx);
    }
  }

  // If there are not enough unique items, fill in with remaining items
  let i = 0;
  while (selectedItems.length < numItems) {
    if (!usedIndices.has(i % items.length)) {
      selectedItems.push(items[i % items.length]);
      usedIndices.add(i % items.length);
    }
    i++;
  }

  return selectedItems;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const magicword = url.searchParams.get("magicword");
  const language = (url.searchParams.get("language") || "sv") as Language;
  const bingoSeed = magicword || "default";
  const bingoGrid = generateBingoGrid(bingoSeed);

  return json(
    {
      bingoGrid,
      language,
    },
    {
      status: 200,
    },
  );
};

// "",
// "linear-gradient(to bottom, #84fab0, #8fd3f4)",
// "linear-gradient(to bottom, #d4fc79, #96e6a1)",
// "linear-gradient(to bottom, #a6c0fe, #f68084)",
// "linear-gradient(to bottom, #cfd9df, #e2ebf0)",
// "linear-gradient(to bottom, #a1c4fd, #c2e9fb)",

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
  payload: { value: string | string[] | null; position: number | null };
};
function createInitialState(): State {
  return { theme: undefined, markeditems: new Array(25).fill(0) };
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
  const { bingoGrid, language } = useLoaderData<typeof loader>();
  const [state, dispatch] = useReducer(reducer, null, createInitialState);
  const navigate = useNavigate();
  useLayoutEffect(() => {
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
      console.info("No saved state found");
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
      if (state.markeditems.slice(i, i + 5).every((item) => item !== 0)) {
        console.log("BINGO ON ROW", i / 5 + 1);
      }
    }
    // Check columns
    for (let i = 0; i < 5; i++) {
      const arr = [];
      for (let j = 0; j < 5; j++) {
        arr.push(state.markeditems[j * 5 + i]);
      }
      if (arr.every((item) => item !== 0)) {
        console.log("BINGO ON COLUMN", i + 1);
      }
    }
    // Check diagonals
    const diagonal1 = [0, 6, 12, 18, 24];
    const diagonal2 = [4, 8, 12, 16, 20];
    if (diagonal1.every((i) => state.markeditems[i] !== 0)) {
      console.log("BINGO ON DIAGONAL 1");
    }
    if (diagonal2.every((i) => state.markeditems[i] !== 0)) {
      console.log("BINGO ON DIAGONAL 2");
    }
  }, [state?.markeditems]);

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
  };

  if (!state.theme) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader size={96} className="animate-spin" color="violet" />
      </div>
    );
  }

  return (
    <div
      className="bg-green-300 w-full h-screen transition-all duration-1000 ease-in-out"
      style={{
        background: themes[state.theme as Theme].gradient,
      }}
    >
      <div className="h-svh overflow-hidden container flex">
        <div className="m-auto">
          <h1
            className={cn(
              themes[state.theme as Theme].header,
              `text-center mb-3 md:mb-5 text-lg uppercase md:text-4xl font-bold tracking-wider`,
              "drop-shadow-lg",
            )}
          >
            Roadtrip Bingo 2000
          </h1>
          <div className="grid grid-cols-5 gap-2">
            {bingoGrid.map((item, index) => {
              return (
                <div
                  key={item.text[language]}
                  className="aspect-square text-center flex flex-col justify-center items-center box-border max-w-24"
                >
                  <div
                    key={item.text[language]}
                    className={cn(
                      themes[state.theme as Theme].cardtextcolor,
                      themes[state.theme as Theme].cardborder,
                      themes[state.theme as Theme].cardbg,
                      "box-border overflow-hidden text-wrap aspect-square rounded-md flex text-center items-center justify-center p-3",
                      state?.markeditems.includes(sha1(item.text[language])) &&
                        "bg-green-400 border-green-300 border-2 border-opacity-100 bg-opacity-80 box-border",
                    )}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      if (
                        state?.markeditems.includes(sha1(item.text[language]))
                      ) {
                        dispatch({
                          type: "UNMARK_ITEM",
                          payload: {
                            value: sha1(item.text[language]),
                            position: index,
                          },
                        });
                      } else {
                        dispatch({
                          type: "MARK_ITEM",
                          payload: {
                            value: sha1(item.text[language]),
                            position: index,
                          },
                        });
                      }
                    }}
                    onKeyDown={() => {}}
                  >
                    {items.find((i) => i.text[language] === item.text[language])
                      ?.icon || <div />}
                  </div>
                  <p
                    className={cn(
                      themes[state.theme as Theme].textcolor,
                      "text-[10px] md:text-sm max-w-24 ",
                      state?.markeditems.includes(sha1(item.text[language])) &&
                        state.theme &&
                        themes[state.theme as Theme].textcolor,
                    )}
                  >
                    {item.text[language]}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="w-full gap-3 flex">
            <Button
              onClick={handleStartOver}
              variant="link"
              size="sm"
              className={cn(
                themes[state.theme as Theme].textcolor,
                "w-1/2 mt-3 text-sm",
              )}
            >
              <ChevronLeft className="w-4 h-4" />
              {UiText[language].newCard}
            </Button>
            <Button
              onClick={handleReset}
              variant="link"
              size="sm"
              className={cn(
                themes[state.theme as Theme].textcolor,
                "w-1/2 mt-3 text-sm",
              )}
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              {UiText[language].resetCard}
            </Button>
          </div>
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
