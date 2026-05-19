import type { Route } from "./+types/features";
import { FEATURES } from "../data/features";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Features - ManaProbe" },
    {
      name: "description",
      content:
        "Explore ManaProbe's features: life tracking, multiplayer support, commander damage, dice roller, and more.",
    },
  ];
}

export default function Features() {
  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark mb-4">
          App Features
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-text-secondary max-w-2xl mx-auto">
          Everything you need to track your Magic: The Gathering games, all in
          one app.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature) => (
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
