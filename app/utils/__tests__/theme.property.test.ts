import { describe, it, expect, beforeEach } from "vitest";
import fc from "fast-check";
import { applyTheme } from "../theme";

/**
 * **Validates: Requirements 4.2**
 *
 * Feature: minimalist-theme, Property 3: Theme application idempotence
 *
 * For any theme value, calling `applyTheme(theme)` multiple times SHALL produce
 * the same DOM state as calling it once — specifically,
 * `document.documentElement.classList.contains('dark')` SHALL equal
 * `theme === 'dark'` after any number of applications.
 */
describe("Property 3: Theme application idempotence", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("dark");
  });

  it("applying a theme N times produces the same DOM state as applying it once", () => {
    fc.assert(
      fc.property(
        fc.oneof(fc.constant("light" as const), fc.constant("dark" as const)),
        fc.integer({ min: 1, max: 10 }),
        (theme, repetitions) => {
          // Clean up before each property check
          document.documentElement.classList.remove("dark");

          // Apply theme N times
          for (let i = 0; i < repetitions; i++) {
            applyTheme(theme);
          }

          // Assert DOM state matches expected
          const hasDarkClass =
            document.documentElement.classList.contains("dark");
          expect(hasDarkClass).toBe(theme === "dark");
        }
      ),
      { numRuns: 100 }
    );
  });
});
