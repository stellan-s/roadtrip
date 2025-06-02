"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// scripts/hyphenate.ts
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const hypher_1 = __importDefault(require("hypher"));
// default–import the CJS modules directly
const hyphenation_en_us_1 = __importDefault(require("hyphenation.en-us"));
const hyphenation_sv_1 = __importDefault(require("hyphenation.sv"));
const hyphenation_de_1 = __importDefault(require("hyphenation.de"));
const hyphenation_fr_1 = __importDefault(require("hyphenation.fr"));
const hyphenation_es_1 = __importDefault(require("hyphenation.es"));
const hyphenation_it_1 = __importDefault(require("hyphenation.it"));
const hyphenation_fi_1 = __importDefault(require("hyphenation.fi"));
const hyphenation_nb_no_1 = __importDefault(require("hyphenation.nb-no"));
const hyphenation_da_1 = __importDefault(require("hyphenation.da"));
// … other imports …
const hyphers = {
    en: new hypher_1.default(hyphenation_en_us_1.default),
    sv: new hypher_1.default(hyphenation_sv_1.default),
    de: new hypher_1.default(hyphenation_de_1.default),
    fr: new hypher_1.default(hyphenation_fr_1.default),
    es: new hypher_1.default(hyphenation_es_1.default),
    it: new hypher_1.default(hyphenation_it_1.default),
    fi: new hypher_1.default(hyphenation_fi_1.default),
    no: new hypher_1.default(hyphenation_nb_no_1.default),
    da: new hypher_1.default(hyphenation_da_1.default),
    // Add other languages as needed
};
function softHyphenate(lang, str) {
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
const projectRoot = path_1.default.resolve(__dirname, "../..");
const jsonPath = path_1.default.join(projectRoot, "app", "items", "items.json");
const raw = fs_1.default.readFileSync(jsonPath, "utf-8");
const items = JSON.parse(raw);
// Transform…
const hyphenated = items.map((item) => ({
    key: item.key,
    text: Object.fromEntries(Object.entries(item.text).map(([lang, txt]) => [
        lang,
        softHyphenate(lang, txt),
    ])),
}));
// Write out a TS module
const out = `export const items = ${JSON.stringify(hyphenated, null, 2)} as const;`;
fs_1.default.writeFileSync(path_1.default.resolve(__dirname, "../items.ts"), out);
