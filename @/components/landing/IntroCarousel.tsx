export function IntroCarousel({ lang }: { lang: "sv" | "en" | null }) {
  return (
    <div className="w-screen overflow-hidden">
      <div
        className="w-[200%] flex transition-all transform-gpu duration-700 ease-out items-center justify-around"
        style={{
          transform:
            lang === "sv"
              ? "translateX(0%)"
              : lang === "en"
              ? "translateX(-50%)"
              : "translateX(0%)",
        }}
      >
        <div className="text-center px-2 sm:px-10">
          <h6 className="text-center uppercase mb-3 font-bold tracking-wider">
            Roadtrip Bingo
          </h6>
          <h1 className="font-bold text-5xl tracking-tighter mb-3 px-1">
            Skriv in ett ord för att skapa din bricka
          </h1>
          <p className="text-md px-5">
            Ett ord, vilket som helst. Använd samma ord om du vill återvända
            till en identisk bingobricka
          </p>
        </div>
        <div className="text-center px-2 sm:p-10">
          <h6 className="text-center uppercase mb-3 font-bold tracking-wider">
            Roadtrip Bingo
          </h6>
          <h1 className="font-bold text-5xl tracking-tighter mb-3 px-1">
            Enter a word to create your bingo card
          </h1>
          <p className="text-md px-5">
            Any word, it doesn&apos;t matter which. Use the same word if you
            want to return to an identical bingo card
          </p>
        </div>
      </div>
    </div>
  );
}