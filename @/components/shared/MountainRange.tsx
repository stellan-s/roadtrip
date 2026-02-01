export function MountainRange({ opacity = 1 }: { opacity?: number }) {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none flex justify-center">
      <svg
        viewBox="0 0 1440 320"
        className="h-40 sm:h-56 sm:w-full flex-shrink-0"
        style={{ aspectRatio: "1440 / 320" }}
        preserveAspectRatio="none"
      >
        {/* Distant mountains — faceted low-poly silhouette */}
        <path
          d="M0,200 L70,165 L130,110 L180,30 L220,90 L260,155 L340,125 L400,65 L450,15 L500,70 L550,130 L620,100 L680,55 L730,25 L780,80 L830,140 L910,105 L970,45 L1030,5 L1080,60 L1140,125 L1210,90 L1270,40 L1320,70 L1370,120 L1440,160 L1440,320 L0,320 Z"
          fill="white"
          opacity={0.15 * opacity}
        />
        {/* Snow caps on the three tallest peaks */}
        <path
          d="M1030,5 L1003,23 L1046,23 Z M450,15 L432,33 L466,33 Z M730,25 L702,42 L745,42 Z"
          fill="white"
          opacity={0.5 * opacity}
        />
        {/* Middle mountains */}
        <path
          d="M0,245 L80,215 L150,240 L230,180 L290,220 L370,165 L440,200 L510,150 L570,185 L650,145 L720,180 L800,140 L870,175 L950,148 L1020,185 L1100,155 L1170,195 L1250,160 L1340,200 L1440,225 L1440,320 L0,320 Z"
          fill="white"
          opacity={0.25 * opacity}
        />
        {/* Foreground hills */}
        <path
          d="M0,278 L200,265 L380,280 L560,262 L720,275 L900,258 L1080,272 L1260,260 L1440,270 L1440,320 L0,320 Z"
          fill="white"
          opacity={0.35 * opacity}
        />
      </svg>
    </div>
  );
}
