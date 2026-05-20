import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  getResolvedTheme,
  applyTheme,
  persistTheme,
  onSystemThemeChange,
} from "../theme";

function createMockMatchMedia(matches: boolean) {
  return (query: string) =>
    ({
      matches,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }) as unknown as MediaQueryList;
}

describe("theme utility", () => {
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
    // Provide a default matchMedia mock (system prefers light)
    window.matchMedia = vi.fn(createMockMatchMedia(false));
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    vi.restoreAllMocks();
  });

  describe("getResolvedTheme", () => {
    it("returns stored 'dark' preference from localStorage", () => {
      localStorage.setItem("theme", "dark");
      expect(getResolvedTheme()).toBe("dark");
    });

    it("returns stored 'light' preference from localStorage", () => {
      localStorage.setItem("theme", "light");
      expect(getResolvedTheme()).toBe("light");
    });

    it("ignores invalid localStorage values and falls back to system preference", () => {
      localStorage.setItem("theme", "invalid-value");
      // jsdom matchMedia defaults to not matching
      expect(getResolvedTheme()).toBe("light");
    });

    it("returns 'dark' when no stored preference and system prefers dark", () => {
      window.matchMedia = vi.fn(createMockMatchMedia(true));
      expect(getResolvedTheme()).toBe("dark");
    });

    it("returns 'light' when no stored preference and system prefers light", () => {
      window.matchMedia = vi.fn(createMockMatchMedia(false));
      expect(getResolvedTheme()).toBe("light");
    });

    it("returns 'light' when localStorage throws an error", () => {
      vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
        throw new Error("SecurityError: access denied");
      });
      expect(getResolvedTheme()).toBe("light");
    });
  });

  describe("applyTheme", () => {
    it("adds 'dark' class when theme is 'dark'", () => {
      applyTheme("dark");
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    it("removes 'dark' class when theme is 'light'", () => {
      document.documentElement.classList.add("dark");
      applyTheme("light");
      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });

    it("is idempotent - multiple calls produce same result", () => {
      applyTheme("dark");
      applyTheme("dark");
      applyTheme("dark");
      expect(document.documentElement.classList.contains("dark")).toBe(true);
      expect(document.documentElement.className).toBe("dark");
    });
  });

  describe("persistTheme", () => {
    it("saves 'dark' to localStorage", () => {
      persistTheme("dark");
      expect(localStorage.getItem("theme")).toBe("dark");
    });

    it("saves 'light' to localStorage", () => {
      persistTheme("light");
      expect(localStorage.getItem("theme")).toBe("light");
    });

    it("handles localStorage errors gracefully", () => {
      vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        throw new Error("QuotaExceededError");
      });
      // Should not throw
      expect(() => persistTheme("dark")).not.toThrow();
    });
  });

  describe("onSystemThemeChange", () => {
    it("registers a listener and returns a cleanup function", () => {
      const addEventListenerSpy = vi.fn();
      const removeEventListenerSpy = vi.fn();

      window.matchMedia = vi.fn(
        () =>
          ({
            matches: false,
            media: "(prefers-color-scheme: dark)",
            addEventListener: addEventListenerSpy,
            removeEventListener: removeEventListenerSpy,
            dispatchEvent: vi.fn(),
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
          }) as unknown as MediaQueryList
      );

      const callback = vi.fn();
      const cleanup = onSystemThemeChange(callback);

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "change",
        expect.any(Function)
      );

      cleanup();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "change",
        expect.any(Function)
      );
    });

    it("calls callback with 'dark' when system switches to dark", () => {
      let capturedHandler: ((e: MediaQueryListEvent) => void) | null = null;

      window.matchMedia = vi.fn(
        () =>
          ({
            matches: false,
            media: "(prefers-color-scheme: dark)",
            addEventListener: (
              _event: string,
              handler: (e: MediaQueryListEvent) => void
            ) => {
              capturedHandler = handler;
            },
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
          }) as unknown as MediaQueryList
      );

      const callback = vi.fn();
      onSystemThemeChange(callback);

      // Simulate system preference change to dark
      capturedHandler!({ matches: true } as MediaQueryListEvent);
      expect(callback).toHaveBeenCalledWith("dark");
    });

    it("calls callback with 'light' when system switches to light", () => {
      let capturedHandler: ((e: MediaQueryListEvent) => void) | null = null;

      window.matchMedia = vi.fn(
        () =>
          ({
            matches: true,
            media: "(prefers-color-scheme: dark)",
            addEventListener: (
              _event: string,
              handler: (e: MediaQueryListEvent) => void
            ) => {
              capturedHandler = handler;
            },
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
          }) as unknown as MediaQueryList
      );

      const callback = vi.fn();
      onSystemThemeChange(callback);

      // Simulate system preference change to light
      capturedHandler!({ matches: false } as MediaQueryListEvent);
      expect(callback).toHaveBeenCalledWith("light");
    });
  });
});
