import { describe, it, expect } from "vitest";
import { validateContactForm } from "../contact";
import type { ContactFormData } from "../contact";

describe("validateContactForm", () => {
  it("returns name error when name is empty", () => {
    const data: ContactFormData = { name: "", email: "test@example.com", message: "Hello" };
    const errors = validateContactForm(data);
    expect(errors.name).toBe("Name is required");
    expect(errors.email).toBeUndefined();
    expect(errors.message).toBeUndefined();
  });

  it("returns email error when email is empty", () => {
    const data: ContactFormData = { name: "John", email: "", message: "Hello" };
    const errors = validateContactForm(data);
    expect(errors.email).toBe("Email is required");
    expect(errors.name).toBeUndefined();
    expect(errors.message).toBeUndefined();
  });

  it("returns message error when message is empty", () => {
    const data: ContactFormData = { name: "John", email: "test@example.com", message: "" };
    const errors = validateContactForm(data);
    expect(errors.message).toBe("Message is required");
    expect(errors.name).toBeUndefined();
    expect(errors.email).toBeUndefined();
  });

  it("returns all errors when all fields are empty", () => {
    const data: ContactFormData = { name: "", email: "", message: "" };
    const errors = validateContactForm(data);
    expect(errors.name).toBe("Name is required");
    expect(errors.email).toBe("Email is required");
    expect(errors.message).toBe("Message is required");
  });

  it('returns "Invalid email format" for email without @', () => {
    const data: ContactFormData = { name: "John", email: "notanemail", message: "Hello" };
    const errors = validateContactForm(data);
    expect(errors.email).toBe("Invalid email format");
  });

  it('returns "Invalid email format" for email missing domain extension', () => {
    const data: ContactFormData = { name: "John", email: "missing@domain", message: "Hello" };
    const errors = validateContactForm(data);
    expect(errors.email).toBe("Invalid email format");
  });

  it('returns "Invalid email format" for email with no local part', () => {
    const data: ContactFormData = { name: "John", email: "@nodomain.com", message: "Hello" };
    const errors = validateContactForm(data);
    expect(errors.email).toBe("Invalid email format");
  });

  it("returns empty errors object for valid submission", () => {
    const data: ContactFormData = { name: "Jane Doe", email: "jane@example.com", message: "Hi there!" };
    const errors = validateContactForm(data);
    expect(errors).toEqual({});
  });

  it("returns name error when name is whitespace only", () => {
    const data: ContactFormData = { name: "   ", email: "test@example.com", message: "Hello" };
    const errors = validateContactForm(data);
    expect(errors.name).toBe("Name is required");
  });

  it("returns email error when email is whitespace only", () => {
    const data: ContactFormData = { name: "John", email: "   ", message: "Hello" };
    const errors = validateContactForm(data);
    expect(errors.email).toBe("Email is required");
  });

  it("returns message error when message is whitespace only", () => {
    const data: ContactFormData = { name: "John", email: "test@example.com", message: "   " };
    const errors = validateContactForm(data);
    expect(errors.message).toBe("Message is required");
  });
});
