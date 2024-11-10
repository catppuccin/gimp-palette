import definitions from "./palette.json" with { type: "json" };

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

const entriesFromObject = <T extends object>(obj: T): Entries<T> =>
  Object.entries(obj) as Entries<T>;

/**
 * All flavor names of Catppuccin.
 */
export type FlavorName = "latte" | "frappe" | "macchiato" | "mocha";

/**
 * Accent colors of Catppuccin.
 */
export type AccentName =
  | "rosewater"
  | "flamingo"
  | "pink"
  | "mauve"
  | "red"
  | "maroon"
  | "peach"
  | "yellow"
  | "green"
  | "teal"
  | "sky"
  | "sapphire"
  | "blue"
  | "lavender";

/**
 * Monochromatic colors of Catppuccin,
 * from `text` to `crust`
 */
export type MonochromaticName =
  | "text"
  | "subtext1"
  | "subtext0"
  | "overlay2"
  | "overlay1"
  | "overlay0"
  | "surface2"
  | "surface1"
  | "surface0"
  | "base"
  | "mantle"
  | "crust";

type AnsiName =
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white";

/**
 * All color names of Catppuccin.
 */
export type ColorName = AccentName | MonochromaticName;

/**
 * Generic to map type T to all Catppuccin color names.
 */
export type Colors<T> = Record<ColorName, T>;

/**
 * Generic to map type T to all ANSI color names.
 */
export type AnsiColors<T> = Record<AnsiName, T>;

/**
 * A flavor of Catppuccin.
 */
export type CatppuccinFlavor = Readonly<{
  /**
   * Name of the flavor.
   */
  name: string;

  /**
   * Emoji associated with the flavor. Requires Unicode 13.0 (2020) or later to render.
   */
  emoji: string;

  /**
   * Order of the flavor in the palette spec.
   */
  order: number;

  /**
   * Whether the flavor is a dark theme.
   */
  dark: boolean;

  /**
   * An object containing all the colors of the flavor.
   */
  colors: CatppuccinColors;

  /**
   * An object containing all the ANSI color mappings of the flavor.
   */
  ansiColors: CatppuccinAnsiColors;

  /**
   * A typed Object.entries iterable of the colors of the flavor.
   */
  colorEntries: Entries<CatppuccinColors>;

  /**
   * A typed Object.entries iterable of the ANSI colors of the flavor.
   */
  ansiColorEntries: Entries<CatppuccinAnsiColors>;
}>;

/**
 * All colors of Catppuccin.
 */
export type CatppuccinColors = Readonly<Colors<ColorFormat>>;

/**
 * All ANSI color mappings of Catppuccin.
 */
export type CatppuccinAnsiColors = Readonly<AnsiColors<AnsiColorGroups>>;

/**
 * All flavors of Catppuccin.
 */
export type CatppuccinFlavors = Flavors<CatppuccinFlavor>;

export type Flavors<T> = {
  /**
   * Light variant.
   */
  latte: T;

  /**
   * Low-saturation, low-contrast dark variant.
   */
  frappe: T;

  /**
   * Mid-saturation, mid-contrast dark variant.
   */
  macchiato: T;

  /**
   * High-saturation, High-contrast dark variant.
   */
  mocha: T;
};

export type ColorFormat = Readonly<{
  /**
   * Name of the color.
   */
  name: string;

  /**
   * Order of the color in the palette spec.
   */
  order: number;

  /**
   * String-formatted hex value.
   * @example "#babbf1"
   */
  hex: string;

  /**
   * Formatted rgb value.
   * @example { r: 186, g: 187, b: 241}
   */
  rgb: {
    /**
     * Red, 0-255
     */
    r: number;
    /**
     * Green, 0-255
     */
    g: number;
    /**
     * Blue, 0-255
     */
    b: number;
  };

  /**
   * Formatted hsl value.
   * @example { h: 238.9, s: 12.1, l: 83.5 }
   */
  hsl: {
    /**
     * Hue, 0-360
     */
    h: number;
    /**
     * Saturation, 0-100
     */
    s: number;
    /**
     * Lightness, 0-100
     */
    l: number;
  };

  /**
   * Indicates whether the color is intended to be used as an accent color.
   */
  accent: boolean;
}>;

export type AnsiColorGroups = Readonly<{
  /**
   * Name of the ANSI color.
   */
  name: string;

  /**
   * Order of the ANSI color in the palette spec.
   */
  order: number;

  /**
   * An object containing all the ANSI "normal" colors, which are the 8 standard colors from 0 to 7.
   */
  normal: AnsiColorFormat;

  /**
   * An object containing all the ANSI "bright" colors, which are the 8 standard colors from 8 to 15.
   *
   * Note: These bright colors are not necessarily "brighter" than the normal colors, but rather more bold and saturated.
   */
  bright: AnsiColorFormat;
}>;

export type AnsiColorFormat = Readonly<{
  /**
   * Name of the ANSI group.
   */
  name: string;

  /**
   * String-formatted hex value.
   * @example "#babbf1"
   */
  hex: string;

  /**
   * Formatted rgb value.
   * @example { r: 186, g: 187, b: 241}
   */
  rgb: {
    /**
     * Red, 0-255
     */
    r: number;
    /**
     * Green, 0-255
     */
    g: number;
    /**
     * Blue, 0-255
     */
    b: number;
  };

  /**
   * Formatted hsl value.
   * @example { h: 238.9, s: 12.1, l: 83.5 }
   */
  hsl: {
    /**
     * Hue, 0-360
     */
    h: number;
    /**
     * Saturation, 0-100
     */
    s: number;
    /**
     * Lightness, 0-100
     */
    l: number;
  };

  /**
   * The ANSI color code.
   * @example 4
   */
  code: number;

  /**
   * Indicates whether the ANSI color is a "normal" or "bright" color.
   */
  bright: boolean;
}>;

const { version: _, ...jsonFlavors } = definitions;

/**
 * The version of the Catppuccin palette.
 */
export const version = definitions.version;

/**
 * All flavors of Catppuccin.
 */
export const flavors: CatppuccinFlavors = entriesFromObject(
  jsonFlavors,
).reduce((acc, [flavorName, flavor]) => {
  acc[flavorName] = {
    ...flavor,
    colorEntries: entriesFromObject(flavor.colors),
    ansiColorEntries: entriesFromObject(flavor.ansiColors),
  };
  return acc;
}, {} as CatppuccinFlavors);

/**
 * A typed `Object.entries()` iterable of all Catppuccin flavors.
 */
export const flavorEntries: Entries<CatppuccinFlavors> = entriesFromObject(
  flavors,
);
