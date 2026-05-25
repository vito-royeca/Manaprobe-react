export function meta() {
  return [
    { title: "About - Manaprobe" },
    {
      name: "description",
      content:
        "Learn about Manaprobe, the Magic: The Gathering life counter and game state tracker.",
    },
  ];
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Heading */}
      <h1 className="mb-8 text-3xl font-bold text-brand-dark md:text-4xl lg:text-5xl">
        About Manaprobe
      </h1>

      {/* What is Manaprobe */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl sm:text-2xl font-semibold text-brand-primary md:text-3xl">
          What is Manaprobe?
        </h2>
        <p className="text-sm md:text-base lg:text-lg leading-relaxed text-text-secondary">
          Manaprobe is a mobile app designed for Magic: The Gathering players
          who want a fast, reliable way to track life totals and game state
          during matches. Whether you're playing a casual kitchen-table game or
          competing at your local game store, Manaprobe keeps your game running
          smoothly so you can focus on the plays that matter.
        </p>
      </section>

      {/* Our Mission */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl sm:text-2xl font-semibold text-brand-primary md:text-3xl">
          Our Mission
        </h2>
        <p className="text-sm md:text-base lg:text-lg leading-relaxed text-text-secondary">
          Manaprobe was built by MTG enthusiasts who wanted a better game
          tracking experience. We found that existing tools were either too
          cluttered, too slow, or missing the features that mattered most during
          actual gameplay. So we set out to create something simple, intuitive,
          and purpose-built for the Magic community — a life counter that stays
          out of your way and just works.
        </p>
      </section>

      {/* Technology */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl sm:text-2xl font-semibold text-brand-primary md:text-3xl">
          Built for Players
        </h2>
        <p className="text-sm md:text-base lg:text-lg leading-relaxed text-text-secondary">
          Manaprobe is crafted with modern mobile technology to deliver a
          responsive, battery-friendly experience on both iOS and Android. We
          prioritize speed and reliability so that tracking your game never
          interrupts the flow of play. Our goal is to keep improving Manaprobe
          based on feedback from the community — because the best tools are
          shaped by the people who use them.
        </p>
      </section>
    </div>
  );
}
