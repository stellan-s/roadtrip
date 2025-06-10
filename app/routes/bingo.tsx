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
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { clsx, type ClassValue } from "clsx";
import { Check, ChevronsUpDown, Loader, Settings } from "lucide-react";
import { startTransition, useEffect, useReducer, useState } from "react";
import { useReward } from "react-rewards";
import { twMerge } from "tailwind-merge";
import "../styles/spin.css";
import { FaUpDown } from "react-icons/fa6";

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
  name: string;
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
  accent?: string; // Optional accent color for some themes
};

export type ThemeName =
  | "mintbreeze"
  | "peachy"
  | "lavenderbliss"
  | "pinkpetal"
  | "violetdream"
  | "tropicalsunrise"
  | "tropicalsunrise2"
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
  | "crimsonvelvet"
  | "hotchocolate"
  | "coffeeandcream"
  | "daffodillmeadow"
  | "lakesidecamping"
  | "sunnyday"
  | "autumnleaves"
  | "winterwonderland"
  | "springbloom"
  | "summervibes"
  | "starlitnight"
  | "moonlitpath"
  | "rainbowdreams"
  | "goldenhour"
  | "crystalclear"
  | "snowyslopes"
  | "sunsetbeach"
  | "rockymountains"
  | "desertdunes"
  | "tropicalparadise"
  | "sunsetdrive"
  | "forestpath"
  | "oceanbreeze"
  | "desertbloom"
  | "twilightglow"
  | "timewarp"
  | "neonlights"
  | "galacticadventure"
  | "cosmicjourney"
  | "futuristiccity"
  | "cosmicrainbow"
  | "sunsetrainbow"
  | "tropicalrainbow"
  | "deuteranopia"
  | "tritanopia"
  | "achromatopsia"
  | "monochrome"
  | "blackwhite"
  | "cherryhaze"
  | "glacierblue"
  | "spicypaprika"
  | "ilovebroccoli"
  | "samtheman"
  | "colafloat"
  | "statenislandferry"
  | "newyorkcab"
  | "stockholmarchipelago"
  | "ulurusunset"
  | "greenmauihills";

export const themes: Record<ThemeName, ThemeConfig> = {
  deuteranopia: {
    name: "Deuteranopia Friendly (Color Safe)",
    gradient: "bg-gradient-to-br from-yellow-200 via-blue-200 to-blue-300",
    header: "text-blue-900",
    cardborder: "border-blue-500 border-2",
    cardbg: "bg-white bg-opacity-90",
    cardtextcolor: "text-blue-900",
    textcolor: "text-blue-900",
    buttonbgcolor: "bg-blue-700",
    buttontext: "text-white",
    buttonborder: "border border-blue-800",
    buttonhover: "hover:bg-opacity-60",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-yellow-400 bg-opacity-80",
    ismarkedborder: "border-yellow-600 border-2 border-opacity-100",
    ismarkedtext: "text-yellow-900",
  },
  tritanopia: {
    name: "Tritanopia Friendly (Color Safe)",
    gradient: "bg-gradient-to-br from-pink-200 via-green-200 to-green-300",
    header: "text-green-900",
    cardborder: "border-green-500 border-2",
    cardbg: "bg-white bg-opacity-90",
    cardtextcolor: "text-green-900",
    textcolor: "text-green-900",
    buttonbgcolor: "bg-green-700",
    buttontext: "text-white",
    buttonborder: "border border-green-800",
    buttonhover: "hover:bg-opacity-60",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-pink-300 bg-opacity-80",
    ismarkedborder: "border-pink-500 border-2 border-opacity-100",
    ismarkedtext: "text-pink-900",
  },
  achromatopsia: {
    name: "Achromatopsia (Color Safe)",
    gradient: "bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400",
    header: "text-black",
    cardborder: "border-gray-600 border-2",
    cardbg: "bg-white bg-opacity-90",
    cardtextcolor: "text-black",
    textcolor: "text-black",
    buttonbgcolor: "bg-gray-700",
    buttontext: "text-white",
    buttonborder: "border border-gray-800",
    buttonhover: "hover:bg-opacity-60",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-black",
    ismarkedborder: "border-white border-2",
    ismarkedtext: "text-white",
  },
  mintbreeze: {
    name: "Mint Breeze",
    gradient: "bg-gradient-to-br from-green-200 via-sky-200 to-sky-300",
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
    name: "Peachy",
    gradient: "bg-gradient-to-br from-pink-200 via-pink-100 to-fuchsia-100",
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
    name: "Lavender Bliss",
    gradient: "bg-gradient-to-br from-purple-300 via-pink-200 to-pink-100",
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
    name: "Pink Petal",
    gradient: "bg-gradient-to-br from-rose-200 via-pink-200 to-pink-100",
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
    name: "Violet Dream",
    gradient: "bg-gradient-to-br from-indigo-400 via-violet-500 to-purple-700",
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
    name: "Tropical Sunrise",
    gradient: "bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600",
    header: "text-white",
    cardborder: "border-white border-2 border-opacity-60",
    cardbg: "bg-blue-400 bg-opacity-95",
    cardtextcolor: "text-slate-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-blue-100",
    buttontext: "text-slate-900",
    buttonborder: "border border-gray-200",
    buttonhover: "hover:bg-opacity-60",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-cyan-300 bg-opacity-80",
    ismarkedborder: "border-cyan-200 border-2 border-opacity-100",
    ismarkedtext: "text-cyan-900",
  },
  tropicalsunrise2: {
    name: "Tropical Sunrise 2",
    gradient: "bg-gradient-to-br from-cyan-400 via-purple-300 to-rose-400",
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
    name: "Peach Blossom",
    gradient: "bg-gradient-to-br from-red-300 via-blue-100 to-blue-300",
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
    name: "Royal Blue",
    gradient: "bg-gradient-to-br from-purple-700 via-indigo-500 to-blue-500",
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
    name: "Sunset Glow",
    gradient: "bg-gradient-to-br from-orange-400 via-pink-300 to-yellow-300",
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
    name: "Sage Forest",
    gradient: "bg-gradient-to-br from-indigo-100 via-slate-100 to-gray-200",
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
  lemonadepop: {
    name: "Lemonade Pop",
    gradient: "bg-gradient-to-br from-yellow-100 via-yellow-300 to-amber-400",
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
    name: "Icy Depths",
    gradient: "bg-gradient-to-br from-cyan-100 via-cyan-200 to-sky-200",
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
    name: "Blush Cloud",
    gradient: "bg-gradient-to-br from-slate-100 via-indigo-100 to-indigo-200",
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
    name: "Midnight Orchid",
    gradient: "bg-gradient-to-br from-purple-800 via-pink-300 to-pink-100",
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
  oceanmist: {
    name: "Ocean Mist",
    gradient: "bg-gradient-to-br from-blue-300 via-blue-400 to-blue-700",
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
    name: "Forest Whisper",
    gradient: "bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400",
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
    name: "Crimson Velvet",
    gradient: "bg-gradient-to-br from-orange-400 via-red-400 to-red-600",
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
  // Followed by these new themes
  hotchocolate: {
    name: "Hot Chocolate",
    gradient: "bg-gradient-to-br from-amber-900 via-amber-700 to-orange-800",
    header: "text-amber-100",
    cardborder: "border-orange-600 border-2",
    cardbg: "bg-amber-50 bg-opacity-95",
    cardtextcolor: "text-amber-900",
    textcolor: "text-amber-100",
    buttonbgcolor: "bg-amber-700",
    buttontext: "text-white",
    buttonborder: "border border-amber-800",
    buttonhover: "hover:bg-amber-800",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-orange-300 bg-opacity-90",
    ismarkedborder: "border-orange-400 border-2 border-opacity-100",
    ismarkedtext: "text-amber-900",
    accent: "bg-amber-700",
  },
  coffeeandcream: {
    name: "Coffee & Cream",
    gradient: "bg-gradient-to-br from-stone-50 via-amber-100 to-stone-300",
    header: "text-stone-800",
    cardborder: "border-stone-400 border-2",
    cardbg: "bg-white bg-opacity-98",
    cardtextcolor: "text-stone-800",
    textcolor: "text-stone-800",
    buttonbgcolor: "bg-amber-600",
    buttontext: "text-white",
    buttonborder: "border border-amber-700",
    buttonhover: "hover:bg-amber-700",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-amber-200 bg-opacity-90",
    ismarkedborder: "border-amber-400 border-2 border-opacity-100",
    ismarkedtext: "text-stone-800",
    accent: "bg-amber-600",
  },
  daffodillmeadow: {
    name: "Daffodil Meadow",
    gradient: "bg-gradient-to-br from-yellow-300 via-lime-300 to-green-400",
    header: "text-green-900",
    cardborder: "border-lime-400 border-2",
    cardbg: "bg-white bg-opacity-98",
    cardtextcolor: "text-green-900",
    textcolor: "text-green-900",
    buttonbgcolor: "bg-lime-600",
    buttontext: "text-white",
    buttonborder: "border border-lime-700",
    buttonhover: "hover:bg-lime-700",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-yellow-300 bg-opacity-90",
    ismarkedborder: "border-yellow-400 border-2 border-opacity-100",
    ismarkedtext: "text-green-900",
    accent: "bg-lime-600",
  },
  lakesidecamping: {
    name: "Lakeside Camping",
    gradient: "bg-gradient-to-br from-blue-400 via-teal-400 to-cyan-500",
    header: "text-blue-900",
    cardborder: "border-teal-400 border-2",
    cardbg: "bg-white bg-opacity-98",
    cardtextcolor: "text-blue-900",
    textcolor: "text-blue-900",
    buttonbgcolor: "bg-blue-600",
    buttontext: "text-white",
    buttonborder: "border border-blue-700",
    buttonhover: "hover:bg-blue-700",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-teal-300 bg-opacity-90",
    ismarkedborder: "border-teal-400 border-2 border-opacity-100",
    ismarkedtext: "text-blue-900",
    accent: "bg-blue-600",
  },
  snowyslopes: {
    name: "Snowy Slopes",
    gradient: "bg-gradient-to-br from-slate-200 via-blue-100 to-indigo-200",
    header: "text-slate-800",
    cardborder: "border-slate-400 border-2",
    cardbg: "bg-white bg-opacity-98",
    cardtextcolor: "text-slate-800",
    textcolor: "text-slate-800",
    buttonbgcolor: "bg-slate-600",
    buttontext: "text-white",
    buttonborder: "border border-slate-700",
    buttonhover: "hover:bg-slate-700",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-slate-300 bg-opacity-90",
    ismarkedborder: "border-slate-400 border-2 border-opacity-100",
    ismarkedtext: "text-slate-900",
    accent: "bg-slate-600",
  },
  rockymountains: {
    name: "Rocky Mountains",
    gradient: "bg-gradient-to-br from-stone-500 via-slate-600 to-gray-700",
    header: "text-white",
    cardborder: "border-slate-400 border-2",
    cardbg: "bg-white bg-opacity-98",
    cardtextcolor: "text-slate-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-white",
    buttontext: "text-slate-800",
    buttonborder: "border border-slate-300",
    buttonhover: "hover:bg-slate-100",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-slate-400 bg-opacity-90",
    ismarkedborder: "border-slate-500 border-2 border-opacity-100",
    ismarkedtext: "text-slate-900",
    accent: "bg-stone-600",
  },
  sunsetdrive: {
    name: "Sunset Drive",
    gradient: "bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600",
    header: "text-white",
    cardborder: "border-pink-400 border-2",
    cardbg: "bg-white bg-opacity-98",
    cardtextcolor: "text-purple-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-pink-600",
    buttontext: "text-white",
    buttonborder: "border border-pink-700",
    buttonhover: "hover:bg-pink-700",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-orange-300 bg-opacity-90",
    ismarkedborder: "border-orange-400 border-2 border-opacity-100",
    ismarkedtext: "text-purple-900",
    accent: "bg-pink-600",
  },
  forestpath: {
    name: "Forest Path",
    gradient: "bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600",
    header: "text-white",
    cardborder: "border-emerald-400 border-2",
    cardbg: "bg-white bg-opacity-98",
    cardtextcolor: "text-green-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-emerald-600",
    buttontext: "text-white",
    buttonborder: "border border-emerald-700",
    buttonhover: "hover:bg-emerald-700",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-emerald-300 bg-opacity-90",
    ismarkedborder: "border-emerald-400 border-2 border-opacity-100",
    ismarkedtext: "text-green-900",
    accent: "bg-emerald-600",
  },
  oceanbreeze: {
    name: "Ocean Breeze",
    gradient: "bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-500",
    header: "text-white",
    cardborder: "border-blue-400 border-2",
    cardbg: "bg-white bg-opacity-98",
    cardtextcolor: "text-blue-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-blue-500",
    buttontext: "text-white",
    buttonborder: "border border-blue-600",
    buttonhover: "hover:bg-blue-600",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-sky-300 bg-opacity-90",
    ismarkedborder: "border-sky-400 border-2 border-opacity-100",
    ismarkedtext: "text-blue-900",
    accent: "bg-blue-500",
  },
  desertbloom: {
    name: "Desert Bloom",
    gradient: "bg-gradient-to-br from-rose-300 via-orange-300 to-red-400",
    header: "text-red-900",
    cardborder: "border-orange-400 border-2",
    cardbg: "bg-white bg-opacity-98",
    cardtextcolor: "text-red-900",
    textcolor: "text-red-900",
    buttonbgcolor: "bg-orange-500",
    buttontext: "text-white",
    buttonborder: "border border-orange-600",
    buttonhover: "hover:bg-orange-600",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-rose-300 bg-opacity-90",
    ismarkedborder: "border-rose-400 border-2 border-opacity-100",
    ismarkedtext: "text-red-900",
    accent: "bg-orange-500",
  },
  autumnleaves: {
    name: "Autumn Leaves",
    gradient: "bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500",
    header: "text-white",
    cardborder: "border-orange-400 border-2",
    cardbg: "bg-white bg-opacity-98",
    cardtextcolor: "text-red-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-orange-600",
    buttontext: "text-white",
    buttonborder: "border border-orange-700",
    buttonhover: "hover:bg-orange-700",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-yellow-300 bg-opacity-90",
    ismarkedborder: "border-yellow-400 border-2 border-opacity-100",
    ismarkedtext: "text-red-900",
    accent: "bg-orange-600",
  },
  winterwonderland: {
    name: "Winter Wonderland",
    gradient: "bg-gradient-to-br from-sky-200 via-blue-200 to-indigo-300",
    header: "text-white",
    cardborder: "border-blue-400 border-2",
    cardbg: "bg-white bg-opacity-98",
    cardtextcolor: "text-blue-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-blue-500",
    buttontext: "text-white",
    buttonborder: "border border-blue-600",
    buttonhover: "hover:bg-blue-600",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-sky-300 bg-opacity-90",
    ismarkedborder: "border-sky-400 border-2 border-opacity-100",
    ismarkedtext: "text-blue-900",
    accent: "bg-blue-500",
  },
  springbloom: {
    name: "Spring Bloom",
    gradient: "bg-gradient-to-br from-green-300 via-lime-300 to-yellow-400",
    header: "text-white",
    cardborder: "border-lime-400 border-2",
    cardbg: "bg-white bg-opacity-98",
    cardtextcolor: "text-green-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-lime-500",
    buttontext: "text-white",
    buttonborder: "border border-lime-600",
    buttonhover: "hover:bg-lime-600",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-green-300 bg-opacity-90",
    ismarkedborder: "border-green-400 border-2 border-opacity-100",
    ismarkedtext: "text-green-900",
    accent: "bg-lime-500",
  },
  summervibes: {
    name: "Summer Vibes",
    gradient: "bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500",
    header: "text-white",
    cardborder: "border-orange-400 border-2",
    cardbg: "bg-white bg-opacity-98",
    cardtextcolor: "text-red-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-orange-500",
    buttontext: "text-white",
    buttonborder: "border border-orange-600",
    buttonhover: "hover:bg-orange-600",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-yellow-300 bg-opacity-90",
    ismarkedborder: "border-yellow-400 border-2 border-opacity-100",
    ismarkedtext: "text-red-900",
    accent: "bg-orange-500",
  },
  starlitnight: {
    name: "Starlit Night",
    gradient: "bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600",
    header: "text-white",
    cardborder: "border-purple-400 border-2",
    cardbg: "bg-white bg-opacity-98",
    cardtextcolor: "text-purple-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-purple-500",
    buttontext: "text-white",
    buttonborder: "border border-purple-600",
    buttonhover: "hover:bg-purple-600",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-indigo-300 bg-opacity-90",
    ismarkedborder: "border-indigo-400 border-2 border-opacity-100",
    ismarkedtext: "text-indigo-900",
    accent: "bg-indigo-500",
  },
  moonlitpath: {
    name: "Moonlit Path",
    gradient: "bg-gradient-to-br from-blue-800 via-blue-600 to-blue-500",
    header: "text-white",
    cardborder: "border-blue-400 border-2",
    cardbg: "bg-white bg-opacity-98",
    cardtextcolor: "text-blue-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-blue-500",
    buttontext: "text-white",
    buttonborder: "border border-blue-600",
    buttonhover: "hover:bg-blue-600",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-blue-300 bg-opacity-90",
    ismarkedborder: "border-blue-400 border-2 border-opacity-100",
    ismarkedtext: "text-blue-900",
    accent: "bg-blue-500",
  },
  goldenhour: {
    name: "Golden Hour",
    gradient: "bg-gradient-to-br from-yellow-500 via-orange-400 to-red-300",
    header: "text-white",
    cardborder: "border-orange-400 border-2",
    cardbg: "bg-white bg-opacity-98",
    cardtextcolor: "text-red-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-orange-500",
    buttontext: "text-white",
    buttonborder: "border border-orange-600",
    buttonhover: "hover:bg-orange-600",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-yellow-300 bg-opacity-90",
    ismarkedborder: "border-yellow-400 border-2 border-opacity-100",
    ismarkedtext: "text-red-900",
    accent: "bg-orange-500",
  },
  twilightglow: {
    name: "Twilight Glow",
    gradient: "bg-gradient-to-br from-purple-600 via-pink-500 to-red-400",
    header: "text-white",
    cardborder: "border-pink-400 border-2",
    cardbg: "bg-white bg-opacity-98",
    cardtextcolor: "text-purple-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-pink-600",
    buttontext: "text-white",
    buttonborder: "border border-pink-700",
    buttonhover: "hover:bg-pink-700",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-purple-300 bg-opacity-90",
    ismarkedborder: "border-purple-400 border-2 border-opacity-100",
    ismarkedtext: "text-purple-900",
    accent: "bg-pink-600",
  },
  crystalclear: {
    name: "Crystal Clear",
    gradient: "bg-gradient-to-br from-cyan-300 via-sky-300 to-blue-400",
    header: "text-white",
    cardborder: "border-sky-400 border-2",
    cardbg: "bg-white bg-opacity-98",
    cardtextcolor: "text-blue-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-sky-500",
    buttontext: "text-white",
    buttonborder: "border border-sky-600",
    buttonhover: "hover:bg-sky-600",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-cyan-300 bg-opacity-90",
    ismarkedborder: "border-cyan-400 border-2 border-opacity-100",
    ismarkedtext: "text-blue-900",
    accent: "bg-sky-500",
  },
  sunnyday: {
    name: "Sunny Day",
    gradient: "bg-gradient-to-br from-yellow-200 via-yellow-400 to-orange-300",
    header: "text-yellow-900",
    cardborder: "border-yellow-400 border-2",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-yellow-900",
    textcolor: "text-yellow-900",
    buttonbgcolor: "bg-yellow-500",
    buttontext: "text-white",
    buttonborder: "border border-yellow-700",
    buttonhover: "hover:bg-yellow-600",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-orange-200 bg-opacity-80",
    ismarkedborder: "border-orange-400 border-2 border-opacity-100",
    ismarkedtext: "text-orange-900",
    accent: "bg-yellow-500",
  },
  rainbowdreams: {
    name: "Rainbow Dreams",
    gradient:
      "bg-gradient-to-br from-red-500 via-orange-400 via-yellow-300 via-green-400 via-blue-500 via-indigo-500 to-purple-600",
    header: "text-white",
    cardborder: "border-indigo-400 border-2 shadow-sm shadow-pink-300/50",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-indigo-900",
    textcolor: "text-white",
    buttonbgcolor:
      "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500",
    buttontext: "text-white",
    buttonborder: "border border-purple-600",
    buttonhover:
      "hover:bg-gradient-to-r hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600",
    buttonshadow:
      "shadow-lg shadow-pink-500/20 hover:shadow-xl hover:shadow-purple-500/30",
    ismarkedbg:
      "bg-gradient-to-br from-yellow-300 via-green-300 to-blue-300 bg-opacity-90",
    ismarkedborder: "border-yellow-400 border-3 shadow-md shadow-orange-300/60",
    ismarkedtext: "text-indigo-900 font-bold",
    accent: "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500",
  },
  sunsetbeach: {
    name: "Sunset Beach",
    gradient: "bg-gradient-to-br from-orange-300 via-pink-400 to-purple-500",
    header: "text-orange-900",
    cardborder: "border-orange-400 border-2",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-orange-900",
    textcolor: "text-orange-900",
    buttonbgcolor: "bg-orange-500",
    buttontext: "text-white",
    buttonborder: "border border-orange-700",
    buttonhover: "hover:bg-orange-600",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-pink-200 bg-opacity-80",
    ismarkedborder: "border-pink-400 border-2 border-opacity-100",
    ismarkedtext: "text-pink-900",
    accent: "bg-orange-500",
  },
  desertdunes: {
    name: "Desert Dunes",
    gradient: "bg-gradient-to-br from-yellow-300 via-orange-200 to-stone-400",
    header: "text-stone-900",
    cardborder: "border-yellow-400 border-2",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-stone-900",
    textcolor: "text-stone-900",
    buttonbgcolor: "bg-yellow-600",
    buttontext: "text-white",
    buttonborder: "border border-yellow-700",
    buttonhover: "hover:bg-yellow-700",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-orange-200 bg-opacity-80",
    ismarkedborder: "border-orange-400 border-2 border-opacity-100",
    ismarkedtext: "text-orange-900",
    accent: "bg-yellow-600",
  },
  tropicalparadise: {
    name: "Tropical Paradise",
    gradient: "bg-gradient-to-br from-green-300 via-cyan-300 to-blue-400",
    header: "text-green-900",
    cardborder: "border-green-400 border-2",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-green-900",
    textcolor: "text-green-900",
    buttonbgcolor: "bg-green-500",
    buttontext: "text-white",
    buttonborder: "border border-green-700",
    buttonhover: "hover:bg-green-600",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-cyan-200 bg-opacity-80",
    ismarkedborder: "border-cyan-400 border-2 border-opacity-100",
    ismarkedtext: "text-cyan-900",
    accent: "bg-green-500",
  },
  timewarp: {
    name: "Time Warp",
    gradient: "bg-gradient-to-br from-purple-900 via-blue-700 to-pink-500",
    header: "text-white",
    cardborder: "border-purple-400 border-2",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-purple-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-purple-700",
    buttontext: "text-white",
    buttonborder: "border border-purple-800",
    buttonhover: "hover:bg-purple-800",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-blue-300 bg-opacity-80",
    ismarkedborder: "border-blue-400 border-2 border-opacity-100",
    ismarkedtext: "text-blue-900",
    accent: "bg-purple-700",
  },
  galacticadventure: {
    name: "Galactic Adventure",
    gradient: "bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-700",
    header: "text-white",
    cardborder: "border-indigo-400 border-2",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-indigo-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-indigo-600",
    buttontext: "text-white",
    buttonborder: "border border-indigo-700",
    buttonhover: "hover:bg-indigo-700",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-purple-300 bg-opacity-80",
    ismarkedborder: "border-purple-400 border-2 border-opacity-100",
    ismarkedtext: "text-purple-900",
    accent: "bg-indigo-600",
  },
  cosmicjourney: {
    name: "Cosmic Journey",
    gradient: "bg-gradient-to-br from-blue-900 via-purple-800 to-pink-700",
    header: "text-white",
    cardborder: "border-purple-400 border-2",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-purple-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-purple-600",
    buttontext: "text-white",
    buttonborder: "border border-purple-700",
    buttonhover: "hover:bg-purple-700",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-pink-300 bg-opacity-80",
    ismarkedborder: "border-pink-400 border-2 border-opacity-100",
    ismarkedtext: "text-pink-900",
    accent: "bg-purple-600",
  },
  futuristiccity: {
    name: "Futuristic City",
    gradient: "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500",
    header: "text-white",
    cardborder: "border-purple-400 border-2",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-purple-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-purple-600",
    buttontext: "text-white",
    buttonborder: "border border-purple-700",
    buttonhover: "hover:bg-purple-700",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-pink-300 bg-opacity-80",
    ismarkedborder: "border-pink-400 border-2 border-opacity-100",
    ismarkedtext: "text-pink-900",
    accent: "bg-purple-600",
  },
  neonlights: {
    name: "Neon Lights",
    gradient: "bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500",
    header: "text-white",
    cardborder: "border-purple-400 border-2",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-purple-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-purple-600",
    buttontext: "text-white",
    buttonborder: "border border-purple-700",
    buttonhover: "hover:bg-purple-700",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-indigo-300 bg-opacity-80",
    ismarkedborder: "border-indigo-400 border-2 border-opacity-100",
    ismarkedtext: "text-indigo-900",
    accent: "bg-purple-600",
  },
  cosmicrainbow: {
    name: "Cosmic Rainbow",
    gradient:
      "bg-gradient-to-br from-violet-600 via-fuchsia-500 via-pink-400 via-orange-400 via-yellow-400 via-lime-400 to-cyan-400",
    header: "text-white",
    cardborder: "border-fuchsia-400 border-2 shadow-sm shadow-cyan-300/40",
    cardbg: "bg-slate-900 bg-opacity-85",
    cardtextcolor: "text-cyan-100",
    textcolor: "text-white",
    buttonbgcolor:
      "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500",
    buttontext: "text-white",
    buttonborder: "border border-violet-400",
    buttonhover:
      "hover:bg-gradient-to-r hover:from-violet-600 hover:via-fuchsia-600 hover:to-cyan-600",
    buttonshadow:
      "shadow-lg shadow-fuchsia-500/25 hover:shadow-xl hover:shadow-cyan-500/35",
    ismarkedbg:
      "bg-gradient-to-br from-fuchsia-400 via-pink-300 to-orange-300 bg-opacity-95",
    ismarkedborder:
      "border-orange-400 border-3 shadow-md shadow-fuchsia-400/50",
    ismarkedtext: "text-violet-900 font-bold",
    accent: "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500",
  },
  tropicalrainbow: {
    name: "Tropical Rainbow",
    gradient:
      "bg-gradient-to-br from-emerald-400 via-teal-400 via-cyan-400 via-blue-400 via-purple-400 via-pink-400 to-rose-400",
    header: "text-white",
    cardborder: "border-teal-300 border-2 shadow-sm shadow-pink-300/40",
    cardbg: "bg-white bg-opacity-92",
    cardtextcolor: "text-emerald-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-gradient-to-r from-emerald-500 via-cyan-500 to-pink-500",
    buttontext: "text-white",
    buttonborder: "border border-emerald-500",
    buttonhover:
      "hover:bg-gradient-to-r hover:from-emerald-600 hover:via-cyan-600 hover:to-pink-600",
    buttonshadow:
      "shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-pink-500/30",
    ismarkedbg:
      "bg-gradient-to-br from-cyan-300 via-blue-300 to-purple-300 bg-opacity-90",
    ismarkedborder: "border-cyan-400 border-3 shadow-md shadow-blue-400/50",
    ismarkedtext: "text-emerald-900 font-bold",
    accent: "bg-gradient-to-r from-emerald-500 via-cyan-500 to-pink-500",
  },
  sunsetrainbow: {
    name: "Sunset Rainbow",
    gradient:
      "bg-gradient-to-br from-red-400 via-orange-400 via-amber-300 via-yellow-300 via-lime-400 via-green-400 to-teal-500",
    header: "text-white",
    cardborder: "border-orange-400 border-2 shadow-sm shadow-yellow-300/50",
    cardbg: "bg-amber-50 bg-opacity-95",
    cardtextcolor: "text-red-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500",
    buttontext: "text-white",
    buttonborder: "border border-red-500",
    buttonhover:
      "hover:bg-gradient-to-r hover:from-red-600 hover:via-orange-600 hover:to-yellow-600",
    buttonshadow:
      "shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-yellow-500/35",
    ismarkedbg:
      "bg-gradient-to-br from-lime-300 via-green-300 to-teal-300 bg-opacity-90",
    ismarkedborder: "border-lime-400 border-3 shadow-md shadow-green-400/50",
    ismarkedtext: "text-red-900 font-bold",
    accent: "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500",
  },
  monochrome: {
    name: "Monochrome",
    gradient: "bg-gradient-to-br from-white via-gray-100 to-gray-300",
    header: "text-gray-900",
    cardborder: "border-gray-500 border-2",
    cardbg: "bg-white bg-opacity-90",
    cardtextcolor: "text-gray-900",
    textcolor: "text-gray-900",
    buttonbgcolor: "bg-black",
    buttontext: "text-white",
    buttonborder: "border border-gray-800",
    buttonhover: "hover:bg-opacity-60",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-gray-600 bg-opacity-80",
    ismarkedborder: "border-gray-800 border-2 border-opacity-100",
    ismarkedtext: "text-white",
  },
  blackwhite: {
    name: "Black & White",
    gradient: "bg-gradient-to-br from-white via-gray-100 to-gray-300", // ljus bakgrund
    header: "text-black",
    cardborder: "border-black border-opacity-50 border-2",
    cardbg: "bg-white bg-opacity-100",
    cardtextcolor: "text-black",
    textcolor: "text-black",
    buttonbgcolor: "bg-white",
    buttontext: "text-black",
    buttonborder: "border border-black",
    buttonhover: "hover:bg-white hover:text-black hover:border-black",
    buttonshadow: "shadow-none",
    ismarkedbg: "bg-gray-200",
    ismarkedborder: "border-black border-opacity-100 border-2",
    ismarkedtext: "text-black",
    accent: "bg-black",
  },
  cherryhaze: {
    name: "Cherry Haze",
    gradient: "bg-gradient-to-br from-rose-100 via-pink-200 to-fuchsia-300",
    header: "text-fuchsia-900",
    cardborder: "border-pink-300 border-2",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-fuchsia-900",
    textcolor: "text-fuchsia-900",
    buttonbgcolor: "bg-fuchsia-500",
    buttontext: "text-white",
    buttonborder: "border border-fuchsia-700",
    buttonhover: "hover:bg-fuchsia-600",
    buttonshadow: "shadow-md hover:shadow-lg",
    ismarkedbg: "bg-pink-300 bg-opacity-80",
    ismarkedborder: "border-pink-400 border-2",
    ismarkedtext: "text-pink-900",
  },
  glacierblue: {
    name: "Glacier Blue",
    gradient: "bg-gradient-to-br from-sky-100 via-blue-200 to-cyan-300",
    header: "text-blue-900",
    cardborder: "border-blue-300 border-2",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-blue-900",
    textcolor: "text-blue-900",
    buttonbgcolor: "bg-blue-500",
    buttontext: "text-white",
    buttonborder: "border border-blue-700",
    buttonhover: "hover:bg-blue-600",
    buttonshadow: "shadow-md hover:shadow-lg",
    ismarkedbg: "bg-cyan-200 bg-opacity-80",
    ismarkedborder: "border-cyan-300 border-2",
    ismarkedtext: "text-blue-900",
  },
  spicypaprika: {
    name: "Spicy Paprika",
    gradient: "bg-gradient-to-br from-orange-300 via-red-400 to-amber-500",
    header: "text-red-900",
    cardborder: "border-orange-400 border-2",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-red-900",
    textcolor: "text-red-900",
    buttonbgcolor: "bg-red-600",
    buttontext: "text-white",
    buttonborder: "border border-red-700",
    buttonhover: "hover:bg-red-700",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-orange-300 bg-opacity-90",
    ismarkedborder: "border-orange-500 border-2",
    ismarkedtext: "text-red-900",
  },
  ilovebroccoli: {
    name: "I Love Broccoli",
    gradient: "bg-gradient-to-br from-lime-200 via-emerald-300 to-green-500",
    header: "text-green-900",
    cardborder: "border-lime-400 border-2",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-emerald-900",
    textcolor: "text-green-900",
    buttonbgcolor: "bg-lime-600",
    buttontext: "text-white",
    buttonborder: "border border-lime-700",
    buttonhover: "hover:bg-lime-700",
    buttonshadow: "shadow-md hover:shadow-lg",
    ismarkedbg: "bg-green-300 bg-opacity-80",
    ismarkedborder: "border-green-500 border-2",
    ismarkedtext: "text-green-900",
  },
  samtheman: {
    name: "Skane Griffin",
    gradient: "bg-gradient-to-br from-blue-900 via-blue-800 to-red-700",
    header: "text-white",
    cardborder: "border-red-700 border-2",
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-blue-900",
    textcolor: "text-white",
    buttonbgcolor: "bg-red-700",
    buttontext: "text-white",
    buttonborder: "border border-red-800",
    buttonhover: "hover:bg-red-800",
    buttonshadow: "shadow-md hover:shadow-lg",
    ismarkedbg: "bg-blue-700 bg-opacity-90",
    ismarkedborder: "border-blue-900 border-2",
    ismarkedtext: "text-white",
  },
  colafloat: {
    name: "Cola Float",
    gradient: "bg-gradient-to-br from-[#402218] via-[#8B4513] to-[#fef1df]", // deep cola to creamy float
    header: "text-[#301911]", // dark cola brown
    cardborder: "border-[#ffe5b4] border-2", // light creamy beige
    cardbg: "bg-white bg-opacity-90",
    cardtextcolor: "text-[#3b2c2a]",
    textcolor: "text-[#fddbb0]/90 text-shadow-xl",
    buttonbgcolor: "bg-[#8b4513]",
    buttontext: "text-white",
    buttonborder: "border border-[#5c3317]",
    buttonhover: "hover:bg-opacity-60",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-[#fddbb0] bg-opacity-90", // float-colored
    ismarkedborder: "border-[#ffe5b4] border-2",
    ismarkedtext: "text-[#4b2b20]",
  },
  statenislandferry: {
    name: "Staten Island Ferry",
    gradient: "bg-gradient-to-br from-[#f97316] via-[#fb923c] to-[#60a5fa]", // orange till blått
    header: "text-[#1e3a8a]", // djup marinblå
    cardborder: "border-[#facc15] border-2", // gul nyans från livbåtar/skyltar
    cardbg: "bg-white bg-opacity-90",
    cardtextcolor: "text-[#1f2937]",
    textcolor: "text-[#1f2937]",
    buttonbgcolor: "bg-[#f97316]",
    buttontext: "text-white",
    buttonborder: "border border-[#ea580c]",
    buttonhover: "hover:bg-opacity-60",
    buttonshadow: "shadow-md hover:shadow-lg",
    ismarkedbg: "bg-[#fde68a] bg-opacity-80",
    ismarkedborder: "border-[#facc15] border-2",
    ismarkedtext: "text-[#78350f]",
  },
  newyorkcab: {
    name: "New York Cab",
    gradient: "bg-gradient-to-br from-[#facc15] via-[#fbbf24] to-[#1f2937]", // gul till asfaltgrå
    header: "text-[#1e1e1e]",
    cardborder: "border-[#facc15] border-2",
    cardbg: "bg-white bg-opacity-90",
    cardtextcolor: "text-[#111827]",
    textcolor: "text-[#111827]",
    buttonbgcolor: "bg-[#1f2937]",
    buttontext: "text-[#facc15]",
    buttonborder: "border border-[#fbbf24]",
    buttonhover: "hover:bg-opacity-70",
    buttonshadow: "shadow-md hover:shadow-lg",
    ismarkedbg: "bg-[#fde68a] bg-opacity-90",
    ismarkedborder: "border-[#fbbf24] border-2",
    ismarkedtext: "text-[#1f2937]",
  },
  stockholmarchipelago: {
    name: "Stockholm Archipelago",
    gradient: "bg-gradient-to-br from-[#60a5fa] via-[#93c5fd] to-[#a7f3d0]", // blå till grön
    header: "text-[#0f172a]", // marinblå
    cardborder: "border-[#cbd5e1] border-2", // skärgårdsgranit
    cardbg: "bg-white bg-opacity-95",
    cardtextcolor: "text-[#0f172a]",
    textcolor: "text-[#0f172a]",
    buttonbgcolor: "bg-[#2563eb]", // blå som havet
    buttontext: "text-white",
    buttonborder: "border border-[#1d4ed8]",
    buttonhover: "hover:bg-opacity-60",
    buttonshadow: "shadow-md hover:shadow-lg",
    ismarkedbg: "bg-[#bbf7d0] bg-opacity-90", // skog/grönskande ö
    ismarkedborder: "border-[#6ee7b7] border-2",
    ismarkedtext: "text-[#065f46]",
  },
  ulurusunset: {
    name: "Uluru Sunset",
    gradient: "bg-gradient-to-br from-[#7c2d12] via-[#ea580c] to-[#fbbf24]", // röd sand till brinnande solnedgång
    header: "text-[#4b1d06]", // djupt rödbrun
    cardborder: "border-[#fcd34d] border-2", // solens gula kant
    cardbg: "bg-white bg-opacity-90",
    cardtextcolor: "text-[#3f1f0f]",
    textcolor: "text-[#3f1f0f]",
    buttonbgcolor: "bg-[#b45309]", // bränd orange
    buttontext: "text-white",
    buttonborder: "border border-[#78350f]",
    buttonhover: "hover:bg-opacity-70",
    buttonshadow: "shadow-lg hover:shadow-xl",
    ismarkedbg: "bg-[#fde68a] bg-opacity-90", // solvarm markering
    ismarkedborder: "border-[#fcd34d] border-2",
    ismarkedtext: "text-[#78350f]",
  },
  greenmauihills: {
    name: "Green Maui Hills",
    gradient: "bg-gradient-to-br from-[#166534] via-[#4ade80] to-[#bbf7d0]", // djupgrönt till tropiskt ljusgrönt
    header: "text-[#064e3b]", // mörkt tropikgrönt
    cardborder: "border-[#86efac] border-2", // fräsch ljusgrön kant
    cardbg: "bg-white bg-opacity-90",
    cardtextcolor: "text-[#052e16]",
    textcolor: "text-[#052e16]",
    buttonbgcolor: "bg-[#15803d]",
    buttontext: "text-white",
    buttonborder: "border border-[#166534]",
    buttonhover: "hover:bg-opacity-70",
    buttonshadow: "shadow-md hover:shadow-lg",
    ismarkedbg: "bg-[#a7f3d0] bg-opacity-90",
    ismarkedborder: "border-[#4ade80] border-2",
    ismarkedtext: "text-[#065f46]",
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
      window.localStorage.setItem(
        "game_state",
        JSON.stringify({
          theme: "mintbreeze",
          markeditems: new Array(25).fill(0),
        }),
      );
      theme = "mintbreeze";
      markeditems = new Array(25).fill(0);
    } else {
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
        markeditems = new Array(25).fill(0);
      }
    }

    dispatch({
      type: "LOAD_STATE",
      payload: { value: markeditems, position: null },
    });
    dispatch({ type: "SET_THEME", payload: { value: theme, position: null } });

    // ✅ Ensures loading overlay disappears
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
        className={cn(
          "bg-cover bg-center bg-no-repeat",
          hasClientData ? themes[state.theme as Theme].gradient : "",
          "w-full h-screen relative z-10 transition-all duration-700 cubic-bezier(0.165, 0.84, 0.44, 1)",
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
        <div className="h-svh overflow-y-auto py-5 container flex items-center justify-center">
          <div className="m-auto grid gap-1 items-center justify-center w-full">
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
                  <ChevronsUpDown className="inline mr-2" size={24} />
                </DrawerTitle>
              </DrawerHeader>
              <ScrollArea className="h-[320px] w-full">
                <div className="p-4 pb-0 grid gap-2 h-full">
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
                      className={cn(
                        "w-full justify-start",
                        themes[key as Theme].gradient,
                        themes[key as Theme].buttontext,
                        themes[key as Theme].buttonborder,
                        themes[key as Theme].buttonhover,
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
                    className="py-5 rounded-sm space-x-1 font-thin text-sm"
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
