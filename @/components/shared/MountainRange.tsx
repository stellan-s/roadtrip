type MountainRangeProps = {
  opacity?: number;
  fromColor?: string;
  toColor?: string;
  ink?: "auto" | "light" | "dark";
};

type Rgb = [number, number, number];

const FALLBACK_FROM = "#12c2e9";
const FALLBACK_TO = "#f64f59";

function normalizeHexColor(color?: string): string | null {
  if (!color) {
    return null;
  }

  const trimmed = color.trim();
  const match = trimmed.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
  if (!match) {
    return null;
  }

  const raw = match[1].toLowerCase();
  if (raw.length === 3) {
    return `#${raw
      .split("")
      .map((char) => `${char}${char}`)
      .join("")}`;
  }

  return `#${raw}`;
}

function hexToRgb(hex: string): Rgb {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((channel) => {
    const value = channel / 255;
    return value <= 0.03928
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function resolveInkColor(
  ink: MountainRangeProps["ink"],
  fromColor?: string,
  toColor?: string,
): "#ffffff" | "#000000" {
  if (ink === "light") {
    return "#ffffff";
  }
  if (ink === "dark") {
    return "#000000";
  }

  const from = normalizeHexColor(fromColor) ?? FALLBACK_FROM;
  const to = normalizeHexColor(toColor) ?? FALLBACK_TO;
  const avgLuminance = (relativeLuminance(from) + relativeLuminance(to)) / 2;

  return avgLuminance < 0.24 ? "#ffffff" : "#000000";
}

export function MountainRange({
  opacity = 1,
  fromColor,
  toColor,
  ink = "auto",
}: MountainRangeProps) {
  const inkColor = resolveInkColor(ink, fromColor, toColor);
  const layers = (
    <>
      {/* Far ridge */}
      <path
        d="M0,160 L20,166 L44,164 L70,154 L98,148 L126,164 L154,170 L184,166
           L214,162 L244,152 L272,154 L302,148 L330,162 L360,170 L390,176 L422,176
           L454,170 L486,176 L518,186 L548,186 L578,164 L608,148 L636,150 L664,158
           L694,168 L724,170 L756,166 L786,164 L816,156 L846,162 L876,160 L906,150
           L936,160 L966,162 L996,162 L1028,150 L1060,146 L1090,160 L1120,164 L1150,176
           L1182,182 L1214,180 L1246,178 L1278,170 L1310,166 L1340,150 L1370,130
           L1400,136 L1424,128 L1440,134 L1440,360 L0,360 Z"
        fill={inkColor}
        opacity={0.06 * opacity}
      />

      {/* Mid-far ridge */}
      <path
        d="M0,196 L34,182 L70,188 L104,196 L138,210 L172,220 L206,220 L240,230
           L278,226 L314,222 L352,230 L390,218 L422,218 L454,206 L486,194 L520,202
           L554,196 L588,188 L622,184 L656,174 L690,186 L724,196 L758,214 L792,220
           L826,220 L860,230 L896,228 L930,240 L964,244 L998,246 L1032,246 L1068,244
           L1104,240 L1140,242 L1176,236 L1212,228 L1248,220 L1282,214 L1316,220
           L1352,228 L1386,238 L1416,244 L1440,248 L1440,360 L0,360 Z"
        fill={inkColor}
        opacity={0.1 * opacity}
      />

      {/* Near ridge */}
      <path
        d="M0,268 L32,264 L64,252 L94,266 L126,258 L156,262 L186,254 L218,266
           L248,256 L278,244 L308,252 L338,242 L368,256 L398,248 L430,260 L462,252
           L494,264 L526,258 L558,266 L590,252 L622,246 L654,238 L686,252 L718,248
           L748,236 L776,258 L804,262 L834,244 L864,258 L894,252 L926,262 L958,258
           L990,270 L1022,276 L1054,282 L1088,286 L1122,288 L1156,286 L1190,290
           L1224,294 L1260,298 L1296,296 L1330,288 L1362,282 L1396,274 L1422,262 L1440,266
           L1440,360 L0,360 Z"
        fill={inkColor}
        opacity={0.14 * opacity}
      />

      {/* Foreground foothills */}
      <path
        d="M0,314 C88,300 190,314 320,306 C458,298 566,320 700,308
           C842,296 956,318 1100,306 C1224,296 1334,316 1440,308
           L1440,360 L0,360 Z"
        fill={inkColor}
        opacity={0.18 * opacity}
      />

      {/* Pine treeline */}
      <path
        d="M0,360 L0,334 L6,310 L12,328 L18,305 L24,330 L30,318 L36,333 L42,325
           L48,335 L54,315 L60,336 L66,313 L72,337 L78,326 L84,338 L90,325 L96,338
           L102,313 L108,337 L114,315 L120,336 L126,324 L132,334 L138,316 L144,332
           L150,304 L156,329 L162,310 L168,327 L174,314 L180,324 L186,302 L192,322
           L198,295 L204,320 L210,306 L216,319 L222,306 L228,318 L234,294 L240,318
           L246,296 L252,318 L258,309 L264,319 L270,306 L276,321 L282,298 L288,323
           L294,307 L300,325 L306,318 L312,328 L318,311 L324,330 L330,308 L336,333
           L342,321 L348,335 L354,325 L360,336 L366,314 L372,337 L378,315 L384,338
           L390,327 L396,338 L402,323 L408,337 L414,311 L420,336 L426,315 L432,334
           L438,322 L444,332 L450,312 L456,330 L462,302 L468,327 L474,310 L480,325
           L486,313 L492,323 L498,299 L504,321 L510,295 L516,319 L522,306 L528,318
           L534,305 L540,318 L546,293 L552,318 L558,299 L564,319 L570,311 L576,321
           L582,306 L588,323 L594,300 L600,325 L606,311 L612,327 L618,320 L624,330
           L630,311 L636,332 L642,310 L648,334 L654,324 L660,336 L666,325 L672,337
           L678,314 L684,338 L690,317 L696,338 L702,327 L708,337 L714,320 L720,336
           L726,310 L732,335 L738,315 L744,332 L750,320 L756,330 L762,308 L768,328
           L774,300 L780,325 L786,310 L792,323 L798,310 L804,321 L810,296 L816,319
           L822,296 L828,318 L834,307 L840,318 L846,303 L852,318 L858,294 L864,319
           L870,302 L876,320 L882,312 L888,322 L894,306 L900,325 L906,302 L912,327
           L918,315 L924,329 L930,321 L936,332 L942,312 L948,334 L954,313 L960,336
           L966,326 L972,337 L978,325 L984,338 L990,313 L996,338 L1002,317 L1008,337
           L1014,326 L1020,336 L1026,318 L1032,335 L1038,308 L1044,333 L1050,314 L1056,330
           L1062,318 L1068,328 L1074,304 L1080,325 L1086,299 L1092,323 L1098,309 L1104,321
           L1110,308 L1116,320 L1122,294 L1128,318 L1134,297 L1140,318 L1146,308 L1152,318
           L1158,303 L1164,319 L1170,295 L1176,320 L1182,305 L1188,322 L1194,314 L1200,324
           L1206,307 L1212,327 L1218,304 L1224,329 L1230,319 L1236,332 L1242,322 L1248,334
           L1254,312 L1260,336 L1266,315 L1272,337 L1278,328 L1284,338 L1290,323 L1296,338
           L1302,313 L1308,338 L1314,319 L1320,337 L1326,325 L1332,335 L1338,314 L1344,333
           L1350,306 L1356,331 L1362,314 L1368,328 L1374,315 L1380,326 L1386,300 L1392,323
           L1398,298 L1404,321 L1410,309 L1416,320 L1422,305 L1428,319 L1434,293 L1440,318
           L1440,360 L0,360 Z"
        fill={inkColor}
        transform="matrix(1 0 0 0.62 0 144)"
        opacity={0.18 * opacity}
      />
    </>
  );

  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none flex justify-center">
      <svg
        viewBox="0 120 1440 240"
        className="h-60 min-w-[180vw] w-auto max-w-none flex-shrink-0 lg:hidden"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
        aria-hidden="true"
      >
        {layers}
      </svg>
      <svg
        viewBox="0 120 1440 240"
        className="hidden h-60 w-full flex-shrink-0 lg:block lg:h-80"
        preserveAspectRatio="none"
        role="presentation"
        aria-hidden="true"
      >
        {layers}
      </svg>
    </div>
  );
}
