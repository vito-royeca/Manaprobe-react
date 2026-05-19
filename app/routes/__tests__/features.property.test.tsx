import { describe, it, expect, vi, beforeEach } from "vitest";
import fc from "fast-check";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import type { FeatureItem } from "../../data/features";

/**
 * **Validates: Requirements 5.1**
 *
 * Property 6: Feature list rendering completeness
 * For any list of feature data objects provided to the Features page,
 * the rendered output shall contain each feature's title and description text.
 */

vi.mock("../../data/features", () => ({
  FEATURES: [] as FeatureItem[],
}));

// Generate realistic alphanumeric strings to avoid HTML encoding edge cases
const alphanumericString = (minLength: number, maxLength: number) =>
  fc.stringMatching(new RegExp(`^[a-zA-Z0-9 ]{${minLength},${maxLength}}$`)).filter((s) => s.trim().length >= minLength);

// Arbitrary for generating a valid FeatureItem
const featureItemArb: fc.Arbitrary<FeatureItem> = fc.record({
  id: alphanumericString(3, 15).map((s) => s.trim().replace(/\s+/g, "-")),
  title: alphanumericString(3, 30).map((s) => s.trim()),
  description: alphanumericString(10, 60).map((s) => s.trim()),
  icon: fc.option(fc.constantFrom("❤️", "⚔️", "🎲", "📜", "👥", "☠️", "🎨", "⏱️"), { nil: undefined }),
});

// Arbitrary for generating arrays of FeatureItems with unique ids
const featureArrayArb = fc
  .array(featureItemArb, { minLength: 1, maxLength: 8 })
  .map((items) =>
    items.map((item, index) => ({
      ...item,
      id: `${item.id}-${index}`,
    }))
  );

describe("Property: Feature list rendering completeness", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("renders all feature titles and descriptions for any generated feature array", async () => {
    await fc.assert(
      fc.asyncProperty(featureArrayArb, async (features) => {
        // Mock the features data with generated data
        vi.doMock("../../data/features", () => ({
          FEATURES: features,
        }));

        // Import the Features component with the mocked data
        const { default: Features } = await import("../features");

        const { container, unmount } = render(
          <MemoryRouter initialEntries={["/features"]}>
            <Features />
          </MemoryRouter>
        );

        const textContent = container.textContent || "";

        // Verify every feature's title appears in the rendered output
        for (const feature of features) {
          expect(textContent).toContain(feature.title);
        }

        // Verify every feature's description appears in the rendered output
        for (const feature of features) {
          expect(textContent).toContain(feature.description);
        }

        // Clean up
        unmount();
        vi.resetModules();
      }),
      { numRuns: 50 }
    );
  });
});
