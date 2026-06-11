import {
  Card,
  CardActionArea,
  CardMedia,
} from "@mui/material";

import type { Route } from "./+types/home";
import { FEATURES } from "../data/features";
import { ADDITIONAL_FEATURES } from "../data/features";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Manaprobe - A database of Magic: The Gathering Cards" },
    {
      name: "description",
      content:
        "Track and manage your Magic: The Gathering cards, collections, and decks.",
    },
  ];
}

function HeroSection() {
  return (
    <section className="py-16 sm:py-24 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-on-dark mb-6">
          Manaprobe Mobile App
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
        {/* <p className="text-sm md:text-base lg:text-lg text-text-secondary text-center mb-12 max-w-2xl mx-auto"> */}
          The ultimate mobile app for Magic: The
          Gathering. Keep track of your card collection, decks, and more —
          all from your phone.
        </p>
        <p className="text-base sm:text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
          Coming soon to iOS and Android.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-text-on-dark text-surface-dark font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-text-on-dark/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
          >
            <button className="text-white disabled:text-gray-400" disabled>
              <svg
                className="w-5 h-5 "
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </button>
            Download on App Store
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-text-on-dark text-surface-dark font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-text-on-dark/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
          >
            <button className="text-white disabled:text-gray-400" disabled>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.3 2.3-8.636-8.632z" />
              </svg>
            </button>
            Get on Google Play
          </a>
        </div>
      </div>
    </section>
  );
}

function ScreenshotSection() {
  return (
    <section className="py-16 sm:py-20 bg-surface-alt">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
          See It in Action
        </h2>
          <div className="flex justify-center">
            <Card sx={{ maxWidth: 300 }}>
              <CardActionArea>
                <CardMedia
                  component="video"
                  width="50%"
                  height="auto"
                  image="/videos/action01.m4v"
                  title="Manaprobe iOS mobile app in action"
                  autoPlay
                  muted
                  loop
                  controls
                />
              </CardActionArea>
            </Card>
          </div>
      </div>
    </section>
  );
}

function FeaturesHighlight() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary text-center mb-4">
          Why Manaprobe?
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-text-secondary text-center mb-12 max-w-2xl mx-auto">
          Everything you need to keep your Magic games running smoothly.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="bg-surface-alt rounded-xl p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <svg
                className="w-8 h-8 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={feature.icon}
                />
              </svg>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-text-secondary">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdditionalFeaturesHighlight() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary text-center mb-4">
          App Features
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ADDITIONAL_FEATURES.map((feature) => (
          <article
            key={feature.id}
            className="rounded-2xl border border-brand-light bg-surface p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            {feature.icon && (
              <span className="text-4xl mb-4 block" aria-hidden="true">
                {feature.icon}
              </span>
            )}
            <h2 className="text-lg md:text-xl font-semibold text-brand-dark mb-2">
              {feature.title}
            </h2>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ScreenshotSection />
      <FeaturesHighlight />
      <AdditionalFeaturesHighlight />
    </>
  );
}
