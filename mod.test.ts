import { assertEquals } from "std/assert/assert_equals.ts";

import { flavorEntries, flavors, version } from "@catppuccin/palette";
import palette from "@/palette.json" with { type: "json" };

Deno.test("flavorEntries", () => {
  flavorEntries.map(([flavorName, flavor]) => {
    flavor.colorEntries.map(([colorName, color]) =>
      assertEquals(color.hex, palette[flavorName].colors[colorName].hex)
    );
  });
});

Deno.test("flavors", () => {
  flavorEntries.map(([flavorName]) => {
    assertEquals(flavors[flavorName].name, palette[flavorName].name);
  });
});

Deno.test("ansiEntries - name", () => {
  flavorEntries.map(([_, flavor]) => {
    flavor.ansiColorEntries.map(([_, ansiColor]) => {
      assertEquals(
        ansiColor.normal.name,
        ansiColor.name,
      );
      assertEquals(
        ansiColor.bright.name,
        `Bright ${ansiColor.name}`,
      );
    });
  });
});

Deno.test("ansiEntries - hex", () => {
  flavorEntries.map(([flavorName, flavor]) => {
    flavor.ansiColorEntries.map(([ansiColorName, ansiColor]) => {
      assertEquals(
        ansiColor.normal.hex,
        palette[flavorName].ansiColors[ansiColorName].normal.hex,
      );
    });
  });
});

Deno.test("ansiEntries - hex (black & white)", () => {
  flavorEntries.map(([flavorName, flavor]) => {
    flavor.ansiColorEntries.map(([ansiColorName, ansiColor]) => {
      if (ansiColorName == "black") {
        if (flavorName == "latte") {
          assertEquals(
            ansiColor.normal.hex,
            palette[flavorName].colors.subtext1.hex,
          );
          assertEquals(
            ansiColor.bright.hex,
            palette[flavorName].colors.subtext0.hex,
          );
        } else {
          assertEquals(
            ansiColor.normal.hex,
            palette[flavorName].colors.surface1.hex,
          );
          assertEquals(
            ansiColor.bright.hex,
            palette[flavorName].colors.surface2.hex,
          );
        }
      }

      if (ansiColorName == "white") {
        if (flavorName == "latte") {
          assertEquals(
            ansiColor.normal.hex,
            palette[flavorName].colors.surface2.hex,
          );
          assertEquals(
            ansiColor.bright.hex,
            palette[flavorName].colors.surface1.hex,
          );
        } else {
          assertEquals(
            ansiColor.normal.hex,
            palette[flavorName].colors.subtext0.hex,
          );
          assertEquals(
            ansiColor.bright.hex,
            palette[flavorName].colors.subtext1.hex,
          );
        }
      }
    });
  });
});

Deno.test("version", () => {
  assertEquals(version, "1.7.1"); // x-release-please-version
});
