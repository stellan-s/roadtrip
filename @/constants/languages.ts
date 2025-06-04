export const languages = [
  { code: "sv", name: "Svenska", flag: "🇸🇪" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "no", name: "Norsk", flag: "🇳🇴" },
  { code: "da", name: "Dansk", flag: "🇩🇰" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "fi", name: "Suomi", flag: "🇫🇮" },
];

export type languageCode = (typeof languages)[number]["code"];
