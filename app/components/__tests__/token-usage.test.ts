import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const componentsDir = path.resolve(__dirname, "..");
const routesDir = path.resolve(__dirname, "../../routes");

function readSource(filePath: string): string {
  return fs.readFileSync(filePath, "utf-8");
}

describe("Component token usage", () => {
  describe("No brand- prefixed class references", () => {
    it("Navbar.tsx contains no brand- prefixed class references", () => {
      const source = readSource(path.join(componentsDir, "Navbar.tsx"));
      const brandPattern = /\bbrand-/g;
      const matches = source.match(brandPattern);
      expect(matches).toBeNull();
    });

    it("Footer.tsx contains no brand- prefixed class references", () => {
      const source = readSource(path.join(componentsDir, "Footer.tsx"));
      const brandPattern = /\bbrand-/g;
      const matches = source.match(brandPattern);
      expect(matches).toBeNull();
    });

    it("MobileMenuPanel.tsx contains no brand- prefixed class references", () => {
      const source = readSource(
        path.join(componentsDir, "MobileMenuPanel.tsx")
      );
      const brandPattern = /\bbrand-/g;
      const matches = source.match(brandPattern);
      expect(matches).toBeNull();
    });

    it("home.tsx contains no brand- prefixed class references", () => {
      const source = readSource(path.join(routesDir, "home.tsx"));
      const brandPattern = /\bbrand-/g;
      const matches = source.match(brandPattern);
      expect(matches).toBeNull();
    });
  });

  describe("No gradient classes in home page", () => {
    it("home.tsx contains no gradient classes", () => {
      const source = readSource(path.join(routesDir, "home.tsx"));
      // Check for bg-gradient-to-* pattern
      const bgGradientPattern = /\bbg-gradient/g;
      expect(source.match(bgGradientPattern)).toBeNull();

      // Check for gradient stop classes (from-*, via-*, to-* used in gradient context)
      // These are Tailwind gradient stop utilities
      const fromPattern = /\bfrom-[a-zA-Z]/g;
      expect(source.match(fromPattern)).toBeNull();

      const viaPattern = /\bvia-[a-zA-Z]/g;
      expect(source.match(viaPattern)).toBeNull();

      // to- used as gradient stop (not to= for links or to-br etc standalone)
      // Match to-{color} patterns but not to="" (JSX attribute)
      const toGradientPattern = /\bto-[a-zA-Z](?!["=])/g;
      const toMatches = source.match(toGradientPattern);
      // Filter out non-gradient uses like "to" prop in NavLink
      const gradientToMatches = toMatches?.filter(
        (m) => !m.startsWith("to=") && m !== "to"
      );
      expect(gradientToMatches ?? null).toBeNull();
    });
  });

  describe("No banned hex values in components", () => {
    const bannedHexValues = [
      "#6C3FA0",
      "#4A90D9",
      "#8B5CF6",
      "#1E1B4B",
      "#F5F3FF",
    ];

    const componentFiles = [
      { name: "Navbar.tsx", dir: componentsDir },
      { name: "Footer.tsx", dir: componentsDir },
      { name: "MobileMenuPanel.tsx", dir: componentsDir },
      { name: "home.tsx", dir: routesDir },
    ];

    for (const file of componentFiles) {
      it(`${file.name} contains no banned hex values`, () => {
        const source = readSource(path.join(file.dir, file.name));
        for (const hex of bannedHexValues) {
          expect(source.toLowerCase()).not.toContain(hex.toLowerCase());
        }
      });
    }
  });
});
