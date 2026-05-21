import type { Route } from "./+types/home";

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
    <section className="bg-surface-dark py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-on-dark mb-6">
          Manaprobe
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-on-dark/80 mb-8 max-w-2xl mx-auto">
          The ultimate mobile app for Magic: The
          Gathering. Keep track of your card collection, decks, and more —
          all from your phone.
        </p>
        <p className="text-base sm:text-lg md:text-xl text-text-on-dark/80 mb-8 max-w-2xl mx-auto">
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
            className="inline-flex items-center gap-2 border-2 border-text-on-dark text-text-on-dark font-semibold px-6 py-3 rounded-lg hover:bg-text-on-dark/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
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
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-surface-alt">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
          See It in Action
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="flex justify-center">
            <img
              src="/screenshot-1.png"
              alt="Manaprobe app showing life counter interface with player scores"
              width={390}
              height={844}
              loading="lazy"
              className="rounded-2xl shadow-xl max-w-full h-auto w-full max-w-[280px] sm:max-w-[320px]"
            />
          </div>
          <div className="flex justify-center">
            <img
              src="/screenshot-2.png"
              alt="Manaprobe app showing game state tracking with multiple players"
              width={390}
              height={844}
              loading="lazy"
              className="rounded-2xl shadow-xl max-w-full h-auto w-full max-w-[280px] sm:max-w-[320px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesHighlight() {
  const features = [
    {
      title: "Life Tracking",
      description:
        "Quickly adjust life totals with intuitive tap controls. Supports starting life totals for any format.",
      icon: (
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
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      ),
    },
    {
      title: "Game State",
      description:
        "Track commander damage, poison counters, energy, and more. Never lose track of complex board states.",
      icon: (
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
            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
          />
        </svg>
      ),
    },
    {
      title: "Multiplayer Support",
      description:
        "Support for 2-6 players with customizable layouts. Perfect for Commander, Two-Headed Giant, and more.",
      icon: (
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
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
        </svg>
      ),
    },
    {
      title: "Clean Design",
      description:
        "A beautiful, distraction-free interface that lets you focus on the game. Dark mode included.",
      icon: (
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
            d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary text-center mb-4">
          Why Manaprobe?
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-text-secondary text-center mb-12 max-w-2xl mx-auto">
          Everything you need to keep your Magic games running smoothly.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-surface-alt rounded-xl p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
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

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ScreenshotSection />
      <FeaturesHighlight />
    </>
  );
}
