import { join } from "std/path/join.ts";
import tinycolor from "tinycolor2";
import Color from "colorjs";

import meta from "../deno.json" with { type: "json" };

import type {
  CatppuccinAnsiColors,
  CatppuccinColors,
  CatppuccinFlavor,
  ColorName,
  Flavors,
} from "@catppuccin/palette";

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

const entriesFromObject = <T extends object>(obj: T): Entries<T> =>
  Object.entries(obj) as Entries<T>;

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

const prettyNames = [
  "Rosewater",
  "Flamingo",
  "Pink",
  "Mauve",
  "Red",
  "Maroon",
  "Peach",
  "Yellow",
  "Green",
  "Teal",
  "Sky",
  "Sapphire",
  "Blue",
  "Lavender",
  "Text",
  "Subtext 1",
  "Subtext 0",
  "Overlay 2",
  "Overlay 1",
  "Overlay 0",
  "Surface 2",
  "Surface 1",
  "Surface 0",
  "Base",
  "Mantle",
  "Crust",
] as const;

const definitions = {
  latte: {
    name: "Latte",
    emoji: "🌻",
    dark: false,
    colors: {
      rosewater: "#dc8a78",
      flamingo: "#dd7878",
      pink: "#ea76cb",
      mauve: "#8839ef",
      red: "#d20f39",
      maroon: "#e64553",
      peach: "#fe640b",
      yellow: "#df8e1d",
      green: "#40a02b",
      teal: "#179299",
      sky: "#04a5e5",
      sapphire: "#209fb5",
      blue: "#1e66f5",
      lavender: "#7287fd",
      text: "#4c4f69",
      subtext1: "#5c5f77",
      subtext0: "#6c6f85",
      overlay2: "#7c7f93",
      overlay1: "#8c8fa1",
      overlay0: "#9ca0b0",
      surface2: "#acb0be",
      surface1: "#bcc0cc",
      surface0: "#ccd0da",
      base: "#eff1f5",
      mantle: "#e6e9ef",
      crust: "#dce0e8",
    },
  },
  frappe: {
    name: "Frappé",
    emoji: "🪴",
    dark: true,
    colors: {
      rosewater: "#f2d5cf",
      flamingo: "#eebebe",
      pink: "#f4b8e4",
      mauve: "#ca9ee6",
      red: "#e78284",
      maroon: "#ea999c",
      peach: "#ef9f76",
      yellow: "#e5c890",
      green: "#a6d189",
      teal: "#81c8be",
      sky: "#99d1db",
      sapphire: "#85c1dc",
      blue: "#8caaee",
      lavender: "#babbf1",
      text: "#c6d0f5",
      subtext1: "#b5bfe2",
      subtext0: "#a5adce",
      overlay2: "#949cbb",
      overlay1: "#838ba7",
      overlay0: "#737994",
      surface2: "#626880",
      surface1: "#51576d",
      surface0: "#414559",
      base: "#303446",
      mantle: "#292c3c",
      crust: "#232634",
    },
  },
  macchiato: {
    name: "Macchiato",
    emoji: "🌺",
    dark: true,
    colors: {
      rosewater: "#f4dbd6",
      flamingo: "#f0c6c6",
      pink: "#f5bde6",
      mauve: "#c6a0f6",
      red: "#ed8796",
      maroon: "#ee99a0",
      peach: "#f5a97f",
      yellow: "#eed49f",
      green: "#a6da95",
      teal: "#8bd5ca",
      sky: "#91d7e3",
      sapphire: "#7dc4e4",
      blue: "#8aadf4",
      lavender: "#b7bdf8",
      text: "#cad3f5",
      subtext1: "#b8c0e0",
      subtext0: "#a5adcb",
      overlay2: "#939ab7",
      overlay1: "#8087a2",
      overlay0: "#6e738d",
      surface2: "#5b6078",
      surface1: "#494d64",
      surface0: "#363a4f",
      base: "#24273a",
      mantle: "#1e2030",
      crust: "#181926",
    },
  },
  mocha: {
    name: "Mocha",
    emoji: "🌿",
    dark: true,
    colors: {
      rosewater: "#f5e0dc",
      flamingo: "#f2cdcd",
      pink: "#f5c2e7",
      mauve: "#cba6f7",
      red: "#f38ba8",
      maroon: "#eba0ac",
      peach: "#fab387",
      yellow: "#f9e2af",
      green: "#a6e3a1",
      teal: "#94e2d5",
      sky: "#89dceb",
      sapphire: "#74c7ec",
      blue: "#89b4fa",
      lavender: "#b4befe",
      text: "#cdd6f4",
      subtext1: "#bac2de",
      subtext0: "#a6adc8",
      overlay2: "#9399b2",
      overlay1: "#7f849c",
      overlay0: "#6c7086",
      surface2: "#585b70",
      surface1: "#45475a",
      surface0: "#313244",
      base: "#1e1e2e",
      mantle: "#181825",
      crust: "#11111b",
    },
  },
};

const accents = [
  "rosewater",
  "flamingo",
  "pink",
  "mauve",
  "red",
  "maroon",
  "peach",
  "yellow",
  "green",
  "teal",
  "sky",
  "sapphire",
  "blue",
  "lavender",
];

const ansiMappings = {
  black: {
    normal: {
      mapping: "", // superfluous, exists to make TypeScript happy
      code: 0,
    },
    bright: {
      code: 8,
    },
  },
  red: {
    normal: {
      mapping: "red",
      code: 1,
    },
    bright: {
      code: 9,
    },
  },
  green: {
    normal: {
      mapping: "green",
      code: 2,
    },
    bright: {
      code: 10,
    },
  },
  yellow: {
    normal: {
      mapping: "yellow",
      code: 3,
    },
    bright: {
      code: 11,
    },
  },
  blue: {
    normal: {
      mapping: "blue",
      code: 4,
    },
    bright: {
      code: 12,
    },
  },
  magenta: {
    normal: {
      mapping: "pink",
      code: 5,
    },
    bright: {
      code: 13,
    },
  },
  cyan: {
    normal: {
      mapping: "teal",
      code: 6,
    },
    bright: {
      code: 14,
    },
  },
  white: {
    normal: {
      mapping: "", // superfluous, exists to make TypeScript happy
      code: 7,
    },
    bright: {
      code: 15,
    },
  },
};

const toRgb = (hex: string): { r: number; g: number; b: number } => {
  const { r, g, b } = tinycolor(hex).toRgb();
  return {
    r,
    g,
    b,
  };
};

const toHsl = (hex: string): { h: number; s: number; l: number } => {
  const { h, s, l } = tinycolor(hex).toHsl();
  return {
    h,
    s,
    l,
  };
};

const formatted = entriesFromObject(definitions).reduce(
  (acc, [flavorName, flavor], currentIndex) => {
    acc[flavorName] = {
      name: flavor.name,
      emoji: flavor.emoji,
      order: currentIndex,
      dark: flavor.dark,
      colors: entriesFromObject(flavor.colors).reduce(
        (acc, [colorName, color], currentIndex) => {
          acc[colorName] = {
            name: prettyNames[currentIndex],
            order: currentIndex,
            hex: color,
            rgb: toRgb(color),
            hsl: toHsl(color),
            accent: accents.includes(colorName),
          };
          return acc;
        },
        {} as Writeable<CatppuccinColors>,
      ),
      ansiColors: entriesFromObject(ansiMappings).reduce(
        (acc, [name, props], currentIndex) => {
          const mapping = props.normal.mapping as ColorName;
          const normalName = name[0].toUpperCase() +
            name.substring(1).toLowerCase();
          const brightName = `Bright ${normalName}`;
          let normalColorHex = flavor.colors[mapping];
          let brightColorHex: string;

          if (name == "black") {
            normalColorHex = flavor.dark
              ? flavor.colors["surface1"]
              : flavor.colors["subtext1"];
            brightColorHex = flavor.dark
              ? flavor.colors["surface2"]
              : flavor.colors["subtext0"];
          } else if (name == "white") {
            normalColorHex = flavor.dark
              ? flavor.colors["subtext0"]
              : flavor.colors["surface2"];
            brightColorHex = flavor.dark
              ? flavor.colors["subtext1"]
              : flavor.colors["surface1"];
          } else {
            const brightColor = new Color(normalColorHex);
            brightColor.lch.l *= flavor.dark ? 0.94 : 1.09;
            brightColor.lch.c += flavor.dark ? 8 : 0;
            brightColor.lch.h += 2;
            brightColorHex = brightColor.toString({ format: "hex" });
          }

          acc[name] = {
            name: normalName,
            order: currentIndex,
            normal: {
              name: normalName,
              hex: normalColorHex,
              rgb: toRgb(normalColorHex),
              hsl: toHsl(normalColorHex),
              code: props.normal.code,
              bright: false,
            },
            bright: {
              name: brightName,
              hex: brightColorHex,
              rgb: toRgb(brightColorHex),
              hsl: toHsl(brightColorHex),
              code: props.bright.code,
              bright: true,
            },
          };

          return acc;
        },
        {} as Writeable<CatppuccinAnsiColors>,
      ),
    };
    return acc;
  },
  {} as Flavors<Omit<CatppuccinFlavor, "colorEntries" | "ansiColorEntries">>,
);

const __dirname = new URL(".", import.meta.url).pathname;

const result = {
  version: meta.version,
  ...formatted,
};

Deno.writeTextFileSync(
  join(__dirname, "../palette.json"),
  JSON.stringify(result, null, 2),
);
