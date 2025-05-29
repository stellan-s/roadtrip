export function NeonText({ children }: { children: React.ReactNode }) {
  return (
    <p className="neon-text text-7xl font-extrabold text-pink-400 opacity-90">
      {children}
    </p>
  );
}
