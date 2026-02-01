export function MountainRange({ opacity = 1 }: { opacity?: number }) {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none flex justify-center">
      <svg
        viewBox="0 0 1440 320"
        className="h-40 sm:h-56 sm:w-full flex-shrink-0"
        style={{ aspectRatio: "1440 / 320" }}
        preserveAspectRatio="none"
      >
        {/* Distant mountains — faceted silhouette with asymmetric peaks */}
        <path
          d="M0,200 L55,175 L115,130 L168,82 L188,35 L222,88 L278,152
             L335,158 L382,118 L422,62 L450,25 L465,8 L482,38 L535,118
             L588,150 L640,122 L688,68 L728,28 L758,65 L815,142 L862,158
             L925,115 L968,52 L1002,15 L1038,58 L1098,142 L1155,158
             L1220,112 L1262,52 L1298,38 L1340,105 L1398,155 L1440,168
             L1440,320 L0,320 Z"
          fill="white"
          opacity={0.14 * opacity}
        />

        {/* Snow caps — jagged irregular bases on three tallest peaks */}
        <path
          d="M465,8 L448,34 L454,28 L460,34 L468,27 L476,34 Z"
          fill="white"
          opacity={0.5 * opacity}
        />
        <path
          d="M728,28 L706,56 L715,48 L724,56 L735,48 L748,56 Z"
          fill="white"
          opacity={0.5 * opacity}
        />
        <path
          d="M1002,15 L979,44 L988,36 L997,44 L1010,36 L1024,44 Z"
          fill="white"
          opacity={0.5 * opacity}
        />

        {/* Middle mountains — broader, gentler peaks */}
        <path
          d="M0,250 L62,238 L128,254 L195,220 L258,244 L328,195 L382,232
             L448,190 L512,228 L578,196 L645,234 L712,190 L778,226
             L848,182 L918,222 L990,190 L1062,228 L1135,192 L1208,232
             L1282,212 L1365,228 L1440,242
             L1440,320 L0,320 Z"
          fill="white"
          opacity={0.22 * opacity}
        />

        {/* Foreground hills — smooth rolling bezier curves */}
        <path
          d="M0,275 C85,266 185,282 328,270 C438,260 528,278 668,267
             C790,256 912,275 1055,264 C1172,254 1302,271 1440,266
             L1440,320 L0,320 Z"
          fill="white"
          opacity={0.38 * opacity}
        />
      </svg>
    </div>
  );
}
