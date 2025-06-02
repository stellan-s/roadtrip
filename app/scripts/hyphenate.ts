// scripts/hyphenate.ts
import fs from "fs";
import path from "path";
import Hypher from "hypher";
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
// … other imports …

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
  // Add other languages as needed
} as const;

function softHyphenate(lang: keyof typeof hyphers, str: string): string {
  return str
    .split(" ")
    .map((token) => {
      return token.length < 8
        ? token
        : hyphers[lang].hyphenate(token).join("\u00AD");
    })
    .join(" ");
}

// Read your raw JSON…
const raw = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../src/items.raw.json"), "utf8"),
);

// Transform…
const hyphenated = raw.map((item: any) => ({
  key: item.key,
  text: Object.fromEntries(
    Object.entries(item.text).map(([lang, txt]) => [
      lang,
      softHyphenate(lang as keyof typeof hyphers, txt as string),
    ]),
  ),
}));

// Write out a TS module
const out = `export const items = ${JSON.stringify(
  hyphenated,
  null,
  2,
)} as const;`;
fs.writeFileSync(path.resolve(__dirname, "../src/items.ts"), out);
