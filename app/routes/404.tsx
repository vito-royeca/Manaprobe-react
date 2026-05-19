import { Link } from "react-router";

export function meta() {
  return [
    { title: "Page Not Found - ManaProbe" },
  ];
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-brand-primary mb-4">
        404
      </h1>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
        Page Not Found
      </h2>
      <p className="text-sm md:text-base lg:text-lg text-text-secondary max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-brand-primary text-text-on-brand font-medium rounded-lg hover:bg-brand-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
      >
        Go back home
      </Link>
    </div>
  );
}
