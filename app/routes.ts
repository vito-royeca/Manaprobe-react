import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout('./layouts/normal.tsx', [
    index("routes/home.tsx"),
    route("features", "routes/features.tsx"),
    route("about", "routes/about.tsx"),
    route("contact", "routes/contact.tsx"),
    route("*", "routes/404.tsx"),
  ]),
  layout('./layouts/feature.tsx', [
    route('sets', './features/sets/index.tsx'),
  ]),
] satisfies RouteConfig;
