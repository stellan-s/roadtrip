export function BingoHeader({ textColorClass }: { textColorClass: string }) {
  return (
    <h1
      className={`max-w-[500px] text-center text-4xl uppercase md:text-6xl text-pretty break-words font-bold tracking-wider drop-shadow-lg ${textColorClass}`}
    >
      Roadtrip Bingo 3000
    </h1>
  );
}
