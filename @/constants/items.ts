// default–import the CJS modules directly
import patternsEN from "hyphenation.en-us";
import patternsSV from "hyphenation.sv";
import patternsDE from "hyphenation.de";
import patternsFR from "hyphenation.fr";
import patternsES from "hyphenation.es";
import patternsIT from "hyphenation.it";
import patternsFI from "hyphenation.fi";
import patternsNO from "hyphenation.nb-no";
import patternsDA from "hyphenation.da";
import Hypher from "hypher";

export type IconKey =
  | "car"
  | "utensils"
  | "cowboy"
  | "coffee"
  | "trafficCone"
  | "trainTrack"
  | "windmill"
  | "waves"
  | "tent"
  | "mountain"
  | "milestone"
  | "shrub"
  | "bridge"
  | "truck"
  | "megaphone"
  | "motorcycle"
  | "policeCar"
  | "siren"
  | "carFront"
  | "camper"
  | "fastFood"
  | "telescope"
  | "rollercoaster"
  | "tractor"
  | "towerControl"
  | "carTunnel"
  | "gasStation"
  | "ferry"
  | "sun"
  | "boombox"
  | "sportCar"
  | "bike"
  | "barn"
  | "castle"
  | "rain"
  | "cloud"
  | "caravan"
  | "mountainCity"
  | "plane"
  | "helicopter"
  | "ambulance"
  | "mapPinned"
  | "church"
  | "windTurbine"
  | "cctv"
  | "anchor"
  | "towtruck";

// 20. Språkstöd för fler språk

export type Language =
  | "sv"
  | "en"
  | "fr"
  | "de"
  | "es"
  | "it"
  | "fi"
  | "no"
  | "da";

const hyphers = {
  en: new Hypher(patternsEN),
  sv: new Hypher(patternsSV),
  de: new Hypher(patternsDE),
  fr: new Hypher(patternsFR),
  es: new Hypher(patternsES),
  it: new Hypher(patternsIT),
  fi: new Hypher(patternsFI),
  no: new Hypher(patternsNO),
  da: new Hypher(patternsDA),
} as const;

function softHyphenate(lang: Language, str: string): string {
  // Om str innehåller mellanslag, gå igenom varje ord för sig
  return str
    .split(" ")
    .map((token) => {
      // bara hyphenata token om den är längre än, säg, 8 tecken
      if (token.length < 8) return token;
      // hypher delar på bindestreck, vi sätter in \u00AD istället
      return hyphers[lang].hyphenate(token).join("\u00AD");
    })
    .join(" ");
}

// Ursprunglig data (utan soft hyphens)
import rawItems from "./items.json";

type RawItem = {
  key: string;
  text: Record<string, IconKey>;
};

export const items: {
  key: string;
  text: Record<Language, IconKey>;
}[] = (rawItems as RawItem[]).map((item) => ({
  key: item.key,
  text: Object.fromEntries(
    Object.entries(item.text).map(([lang, txt]) => [
      lang,
      softHyphenate(lang as Language, txt),
    ]),
  ) as Record<Language, IconKey>,
}));
