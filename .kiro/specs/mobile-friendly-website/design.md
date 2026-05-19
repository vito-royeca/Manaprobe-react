# Technical Design Document

## Overview

This document describes the technical architecture for transforming the ManaProbe React application from a single-page placeholder into a multi-page, mobile-friendly marketing website. The design leverages the existing React Router v7, Tailwind CSS v4, and Vite 8 stack, adding page routes, a responsive navigation system with hamburger menu, and branded page content.

## Architecture

### Component Hierarchy

```
root.tsx (Layout)
├── components/Navbar.tsx (persistent header)
│   ├── Logo (links to /)
│   ├── DesktopNav (visible >= 768px)
│   └── MobileMenu (hamburger, visible < 768px)
│       ├── HamburgerButton
│       └── MobileMenuPanel (slide-out/dropdown)
├── <Outlet /> (page content)
│   ├── routes/home.tsx
│   ├── routes/features.tsx
│   ├── routes/about.tsx
│   ├── routes/contact.tsx
│   └── routes/404.tsx (catch-all)
└── components/Footer.tsx (persistent footer)
```

### Routing Architecture

The application uses React Router v7's file-based routing with explicit route configuration in `app/routes.ts`. Routes are defined declaratively:

```typescript
// app/routes.ts
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("features", "routes/features.tsx"),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
  route("*", "routes/404.tsx"),
] satisfies RouteConfig;
```

Client-side navigation is handled by React Router's `<Link>` and `<NavLink>` components, ensuring no full page reloads. The SSR configuration remains enabled for initial page loads and SEO.

## Components and Interfaces

### Navbar (`app/components/Navbar.tsx`)

The primary navigation component rendered in `root.tsx` above the `<Outlet />`.

**Responsibilities:**
- Display ManaProbe logo linking to home
- Render desktop navigation links (viewport >= 768px)
- Render hamburger button and mobile menu panel (viewport < 768px)
- Highlight the active route link

**State:**
- `isMenuOpen: boolean` — controls mobile menu visibility

**Behavior:**
- Uses Tailwind responsive classes (`md:flex`, `md:hidden`) to toggle between desktop and mobile layouts at the 768px breakpoint
- Mobile menu closes on: link click, outside click, hamburger toggle, or Escape key
- Includes ARIA attributes: `aria-expanded`, `aria-label`, `aria-controls` on the hamburger button; `role="navigation"` on the nav element

```typescript
interface NavbarProps {
  // No props needed — uses NavLink from react-router for active state
}

// Navigation items configuration
const NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/features", label: "Features" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
] as const;
```

### MobileMenuPanel (`app/components/MobileMenuPanel.tsx`)

A dropdown/slide-down panel that renders navigation links on mobile viewports.

**Props:**
```typescript
interface MobileMenuPanelProps {
  isOpen: boolean;
  onLinkClick: () => void;
}
```

**Accessibility:**
- `id` attribute matching the hamburger button's `aria-controls`
- Links are focusable and navigable via Tab/Shift+Tab
- Panel traps focus when open (first/last item wrapping)
- Escape key closes the menu

### Footer (`app/components/Footer.tsx`)

A persistent footer rendered below the `<Outlet />` in `root.tsx`.

**Content:**
- Copyright notice
- Quick links to pages
- Social/contact links

### Page Components

Each page is a route module exporting a default component and a `meta` function:

#### Home Page (`app/routes/home.tsx`)
- **HeroSection**: App name headline, description paragraph, download CTA button(s)
- **ScreenshotSection**: App screenshot(s) from `images_new/` displayed responsively
- **FeaturesHighlight**: Grid of 3-4 key features with icons and brief descriptions

#### Features Page (`app/routes/features.tsx`)
- Responsive grid layout of feature cards
- Each card: title, description, optional icon/image
- Grid adapts: 1 column on mobile, 2 on tablet, 3 on desktop

#### About Page (`app/routes/about.tsx`)
- Descriptive text about ManaProbe and its creators
- At least one content section with heading and paragraph text

#### Contact Page (`app/routes/contact.tsx`)
- Contact form with fields: name, email, message
- Client-side validation for required fields
- Alternative contact method (email link)
- Form submission handler (initially client-side only)

#### 404 Page (`app/routes/404.tsx`)
- Error message indicating page not found
- Link back to home page
- Consistent styling with the rest of the site

### Interfaces

#### Navigation Item Type

```typescript
interface NavItem {
  path: string;
  label: string;
}
```

#### Contact Form Data

```typescript
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}
```

#### Feature Item Type

```typescript
interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon?: string; // Tailwind class or SVG reference
}
```

## Data Models

### Static Content

All page content is defined as static data within the route modules or a shared constants file. No external data fetching is required for the initial implementation.

```typescript
// app/data/features.ts
export const FEATURES: FeatureItem[] = [
  {
    id: "feature-1",
    title: "Feature Title",
    description: "Feature description text.",
    icon: "icon-class",
  },
  // ... additional features
];
```

### Form Validation

Contact form validation uses a pure validation function:

```typescript
function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Invalid email format";
  if (!data.message.trim()) errors.message = "Message is required";
  return errors;
}
```

## Styling and Theme

### Color Theme

Custom theme colors derived from the ManaProbe logo (purple/blue tones) defined in `app/app.css`:

```css
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

  /* ManaProbe brand colors derived from logo */
  --color-brand-primary: #6C3FA0;
  --color-brand-secondary: #4A90D9;
  --color-brand-accent: #8B5CF6;
  --color-brand-dark: #1E1B4B;
  --color-brand-light: #F5F3FF;

  /* Semantic colors */
  --color-surface: #FFFFFF;
  --color-surface-dark: #0F0D1A;
  --color-text-primary: #1E1B4B;
  --color-text-secondary: #4B5563;
  --color-text-on-brand: #FFFFFF;
}
```

### Responsive Breakpoints

Using Tailwind's default breakpoint system:
- Mobile: < 768px (`md:` prefix for desktop overrides)
- Tablet: 768px - 1023px
- Desktop: >= 1024px

### Favicon and Meta Tags

The `root.tsx` Layout component includes favicon references from `images_new/favicon_io/`:

```typescript
export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
  { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
  { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
  // ... font preconnects
];
```

Favicon assets will be copied to the `public/` directory during setup.

## Error Handling

### Route-Level Error Boundary

The existing `ErrorBoundary` in `root.tsx` handles:
- 404 responses (undefined routes caught by the `*` route)
- Unexpected runtime errors in development (with stack trace)
- Generic error messages in production

The catch-all `routes/404.tsx` provides a user-friendly 404 page. The root ErrorBoundary serves as a fallback for unexpected errors.

### Form Validation Errors

Contact form errors are handled client-side:
- Validation runs on submit
- Errors displayed inline below each field
- Form does not submit until all required fields pass validation
- No server-side submission in initial implementation

### Image Loading

Images use responsive `<img>` elements with:
- `loading="lazy"` for below-the-fold images
- `alt` attributes for accessibility
- `width` and `height` attributes to prevent layout shift
- CSS `max-width: 100%` and `height: auto` for responsive scaling

## Performance Considerations

- **Code Splitting**: React Router v7 automatically code-splits per route
- **SSR**: Server-side rendering enabled for fast initial paint and SEO
- **Image Optimization**: Lazy loading for non-critical images, explicit dimensions to prevent CLS
- **Font Loading**: `display=swap` on Google Fonts to prevent FOIT
- **CSS**: Tailwind CSS v4 with Vite plugin for minimal CSS output (only used classes)
- **Preconnect**: DNS prefetch for Google Fonts domains

## Testing Strategy

### Unit Tests
- **Contact form validation**: Example-based tests for specific valid/invalid inputs (empty fields, invalid email formats, valid submissions)
- **Navigation item rendering**: Verify each page link renders with correct href and label
- **Page content presence**: Verify each page contains required content elements (hero section, feature cards, about text, contact form)
- **Accessibility attributes**: Verify ARIA attributes on hamburger menu, form labels, and semantic elements

### Property Tests
- **Form validation completeness** (Property 7): Generate random form data with missing/whitespace fields, verify rejection
- **Feature rendering** (Property 6): Generate random feature lists, verify all titles and descriptions appear in output
- **404 route handling** (Property 1): Generate random non-matching URL paths, verify 404 page renders

### Integration Tests
- **Client-side navigation**: Verify route transitions don't trigger full page reloads
- **Responsive layout**: Verify breakpoint behavior at key viewport widths
- **Hamburger menu interaction**: Open/close/navigate flow on mobile viewport

### Smoke Tests
- **Lighthouse performance**: Run audit and verify score >= 90 on mobile
- **Build success**: Verify `react-router build` completes without errors

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Undefined routes display 404

*For any* URL path that is not one of the defined application routes ("/", "/features", "/about", "/contact"), navigating to that path shall render a 404 page containing a link to the Home page.

**Validates: Requirements 1.3**

### Property 2: Desktop navigation visibility above breakpoint

*For any* viewport width at or above 768px, all navigation links (Home, Features, About, Contact) shall be visible in the navigation bar and the hamburger icon shall be hidden.

**Validates: Requirements 2.1**

### Property 3: Active link indication on navigation

*For any* navigation link corresponding to the current route, that link shall have a visually distinct active state (different styling from inactive links) after navigation completes.

**Validates: Requirements 2.3**

### Property 4: Mobile hamburger visibility below breakpoint

*For any* viewport width below 768px, the horizontal navigation links shall be hidden and a hamburger icon button shall be visible in the navigation bar.

**Validates: Requirements 3.1**

### Property 5: Hamburger menu link navigation and close

*For any* navigation link within the open hamburger menu, tapping that link shall navigate to the corresponding page route and the hamburger menu shall transition to a closed state.

**Validates: Requirements 3.3**

### Property 6: Feature list rendering completeness

*For any* list of feature data objects provided to the Features page, the rendered output shall contain each feature's title and description text.

**Validates: Requirements 5.1**

### Property 7: Contact form required field validation

*For any* contact form submission where one or more required fields (name, email, message) are empty or whitespace-only, the form shall prevent submission and display a validation error for each invalid field.

**Validates: Requirements 7.2**

### Property 8: Responsive content containment

*For any* viewport width between 320px and 1920px and any page route, no content element shall overflow its container horizontally, and all images shall maintain their aspect ratio without exceeding their container width.

**Validates: Requirements 8.1, 8.3**

### Property 9: Logo presence across all pages

*For any* defined page route in the application, the navigation bar shall contain the ManaProbe logo image element that links to the Home page.

**Validates: Requirements 9.2**

### Property 10: Semantic HTML structure across all pages

*For any* defined page route, the rendered document shall contain semantic HTML elements: `<header>`, `<nav>`, `<main>`, and `<footer>`.

**Validates: Requirements 10.2**

### Property 11: Keyboard focus indicators on interactive elements

*For any* interactive element (links, buttons, form inputs) on any page, focusing the element via keyboard navigation shall produce a visible focus indicator distinguishable from the unfocused state.

**Validates: Requirements 10.4**
