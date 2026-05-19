import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { validateContactForm } from "../contact";
import type { ContactFormData } from "../contact";

/**
 * **Validates: Requirements 7.2**
 *
 * Property 7: Contact form required field validation
 * For any contact form submission where one or more required fields (name, email, message)
 * are empty or whitespace-only, the form shall prevent submission and display a validation
 * error for each invalid field.
 */
describe("Property: Contact form required field validation", () => {
  // Arbitrary for generating whitespace-only or empty strings
  const emptyOrWhitespace = fc
    .array(fc.constantFrom(" ", "\t", "\n", "\r"), { minLength: 0, maxLength: 10 })
    .map((chars) => chars.join(""));

  // Arbitrary for generating non-empty, non-whitespace strings
  const nonEmptyString = fc
    .string({ minLength: 1, maxLength: 50 })
    .filter((s) => s.trim().length > 0);

  // Arbitrary for generating valid email addresses
  const validEmail = fc
    .tuple(
      fc.stringMatching(/^[a-zA-Z][a-zA-Z0-9]{0,9}$/),
      fc.stringMatching(/^[a-zA-Z][a-zA-Z0-9]{0,9}$/),
      fc.stringMatching(/^[a-zA-Z]{2,5}$/)
    )
    .map(([local, domain, tld]) => `${local}@${domain}.${tld}`);

  // Arbitrary for generating invalid email formats (non-empty, non-whitespace, but not matching email regex)
  const invalidEmail = fc.oneof(
    // Missing @ sign entirely
    fc.stringMatching(/^[a-zA-Z][a-zA-Z0-9]{1,10}$/).map((s) => s),
    // Missing domain extension (no dot after @)
    fc
      .tuple(
        fc.stringMatching(/^[a-zA-Z][a-zA-Z0-9]{0,5}$/),
        fc.stringMatching(/^[a-zA-Z][a-zA-Z0-9]{0,5}$/)
      )
      .map(([local, domain]) => `${local}@${domain}`),
    // No local part (starts with @)
    fc.stringMatching(/^[a-zA-Z][a-zA-Z0-9]{0,5}$/).map((domain) => `@${domain}.com`),
    // Spaces in email
    fc
      .tuple(
        fc.stringMatching(/^[a-zA-Z][a-zA-Z0-9]{0,4}$/),
        fc.stringMatching(/^[a-zA-Z][a-zA-Z0-9]{0,4}$/)
      )
      .map(([a, b]) => `${a} ${b}@example.com`)
  );

  it("rejects any form where name is empty/whitespace", () => {
    fc.assert(
      fc.property(emptyOrWhitespace, validEmail, nonEmptyString, (name, email, message) => {
        const errors = validateContactForm({ name, email, message });
        expect(errors.name).toBe("Name is required");
      }),
      { numRuns: 100 }
    );
  });

  it("rejects any form where email is empty/whitespace", () => {
    fc.assert(
      fc.property(nonEmptyString, emptyOrWhitespace, nonEmptyString, (name, email, message) => {
        const errors = validateContactForm({ name, email, message });
        expect(errors.email).toBe("Email is required");
      }),
      { numRuns: 100 }
    );
  });

  it("rejects any form where message is empty/whitespace", () => {
    fc.assert(
      fc.property(nonEmptyString, validEmail, emptyOrWhitespace, (name, email, message) => {
        const errors = validateContactForm({ name, email, message });
        expect(errors.message).toBe("Message is required");
      }),
      { numRuns: 100 }
    );
  });

  it("rejects any form where all fields are empty/whitespace", () => {
    fc.assert(
      fc.property(emptyOrWhitespace, emptyOrWhitespace, emptyOrWhitespace, (name, email, message) => {
        const errors = validateContactForm({ name, email, message });
        expect(errors.name).toBe("Name is required");
        expect(errors.email).toBe("Email is required");
        expect(errors.message).toBe("Message is required");
      }),
      { numRuns: 100 }
    );
  });

  it("returns no errors when all fields are non-empty and email is valid", () => {
    fc.assert(
      fc.property(nonEmptyString, validEmail, nonEmptyString, (name, email, message) => {
        const errors = validateContactForm({ name, email, message });
        expect(errors).toEqual({});
      }),
      { numRuns: 100 }
    );
  });

  it("returns email error for any invalid email format", () => {
    fc.assert(
      fc.property(nonEmptyString, invalidEmail, nonEmptyString, (name, email, message) => {
        const errors = validateContactForm({ name, email, message });
        expect(errors.email).toBe("Invalid email format");
      }),
      { numRuns: 100 }
    );
  });

  it("always returns at least one error when at least one required field is missing", () => {
    const formWithAtLeastOneMissing = fc
      .tuple(
        fc.oneof(emptyOrWhitespace, nonEmptyString),
        fc.oneof(emptyOrWhitespace, validEmail),
        fc.oneof(emptyOrWhitespace, nonEmptyString)
      )
      .filter(([name, email, message]) => {
        return name.trim() === "" || email.trim() === "" || message.trim() === "";
      });

    fc.assert(
      fc.property(formWithAtLeastOneMissing, ([name, email, message]) => {
        const errors = validateContactForm({ name, email, message });
        const hasErrors = Object.keys(errors).length > 0;
        expect(hasErrors).toBe(true);
      }),
      { numRuns: 100 }
    );
  });
});
