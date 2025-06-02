declare module "hypher" {
  interface Hypher {
    hyphenate(word: string): string[];
    hyphenateText(text: string): string;
  }
  const Hypher: {
    new (patterns: any): Hypher;
  };
  export = Hypher;
}

declare module "hyphenation.en-us" {
  const patterns: any;
  export default patterns;
}
declare module "hyphenation.sv" {
  const patterns: any;
  export default patterns;
}
declare module "hyphenation.de" {
  const patterns: any;
  export default patterns;
}
declare module "hyphenation.fr" {
  const patterns: any;
  export default patterns;
}
declare module "hyphenation.es" {
  const patterns: any;
  export default patterns;
}
declare module "hyphenation.it" {
  const patterns: any;
  export default patterns;
}
declare module "hyphenation.fi" {
  const patterns: any;
  export default patterns;
}
declare module "hyphenation.nb-no" {
  const patterns: any;
  export default patterns;
}
declare module "hyphenation.da" {
  const patterns: any;
  export default patterns;
}
