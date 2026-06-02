declare module "hypher" {
  interface Hypher {
    hyphenate(word: string): string[];
    hyphenateText(text: string): string;
  }
  const Hypher: {
    new (patterns: unknown): Hypher;
  };
  export = Hypher;
}

declare module "hyphenation.sv" {
  const patterns: unknown;
  export default patterns;
}
declare module "hyphenation.de" {
  const patterns: unknown;
  export default patterns;
}
declare module "hyphenation.fr" {
  const patterns: unknown;
  export default patterns;
}
declare module "hyphenation.es" {
  const patterns: unknown;
  export default patterns;
}
declare module "hyphenation.it" {
  const patterns: unknown;
  export default patterns;
}
declare module "hyphenation.fi" {
  const patterns: unknown;
  export default patterns;
}
declare module "hyphenation.nb-no" {
  const patterns: unknown;
  export default patterns;
}
declare module "hyphenation.da" {
  const patterns: unknown;
  export default patterns;
}
declare module "hyphenation.en-us" {
  const patterns: unknown;
  export default patterns;
}
