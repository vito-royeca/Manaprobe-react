import { useState } from "react";
import type { Route } from "./+types/contact";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact Us - ManaProbe" },
    {
      name: "description",
      content: "Get in touch with the ManaProbe team.",
    },
  ];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Invalid email format";
  if (!data.message.trim()) errors.message = "Message is required";
  return errors;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validateContactForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }
  }

  return (
    <section className="max-w-2xl mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark mb-6">
        Contact Us
      </h1>
      <p className="text-sm md:text-base lg:text-lg text-text-secondary mb-8">
        Have a question, suggestion, or just want to say hello? Fill out the
        form below and we'll get back to you as soon as possible.
      </p>

      {submitted && (
        <div
          className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 text-green-800"
          role="alert"
        >
          Thank you for your message! We'll be in touch soon.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Name field */}
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-text-primary mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            aria-describedby="contact-name-error"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-text-primary focus:border-brand-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          />
          {errors.name && (
            <p
              id="contact-name-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Email field */}
        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-text-primary mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-describedby="contact-email-error"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-text-primary focus:border-brand-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          />
          {errors.email && (
            <p
              id="contact-email-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Message field */}
        <div>
          <label
            htmlFor="contact-message"
            className="block text-sm font-medium text-text-primary mb-1"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            aria-describedby="contact-message-error"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-text-primary focus:border-brand-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 resize-y"
          />
          {errors.message && (
            <p
              id="contact-message-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full sm:w-auto rounded-lg bg-brand-primary px-8 py-3 font-semibold text-text-on-brand hover:bg-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 transition-colors"
        >
          Send Message
        </button>
      </form>

      {/* Alternative contact method */}
      <div className="mt-10 border-t border-gray-200 pt-8">
        <p className="text-text-secondary">
          Or email us directly at{" "}
          <a
            href="mailto:contact@manaprobe.com"
            className="text-brand-primary hover:text-brand-accent underline font-medium rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          >
            contact@manaprobe.com
          </a>
        </p>
      </div>
    </section>
  );
}
