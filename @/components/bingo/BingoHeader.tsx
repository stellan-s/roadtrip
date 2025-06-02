export function BingoHeader({ textColorClass }: { textColorClass: string }) {
  return (
    <h1
      className={`max-w-[500px] text-center text-xl uppercase md:text-6xl text-pretty break-keep  md:break-words font-bold tracking-wider drop-shadow-2xl ${textColorClass}`}
    >
      Roadtrip Bingo 3000
    </h1>
  );
}
