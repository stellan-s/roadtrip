export function BingoHeader({ textColorClass }: { textColorClass: string }) {
  return (
    <h1
      className={`text-center mb-3 md:mb-5 text-lg uppercase md:text-4xl font-bold tracking-wider drop-shadow-lg ${textColorClass}`}
    >
      Roadtrip Bingo 3000
    </h1>
  );
}