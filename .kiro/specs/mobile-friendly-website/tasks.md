# Implementation Plan: Mobile-Friendly Website

## Overview

Transform the Manaprobe React application from a single-page placeholder into a multi-page, mobile-friendly marketing website. Implementation uses the existing React Router v7, Tailwind CSS v4, and Vite 8 stack, adding page routes, a responsive navigation system with hamburger menu, branded theme, and page content for Home, Features, About, and Contact pages.

## Tasks

- [x] 1. Set up project foundation and theme
  - [x] 1.1 Configure brand theme colors and typography in app.css
    - Replace existing app.css content with Tailwind CSS v4 `@theme` block defining brand colors (brand-primary, brand-secondary, brand-accent, brand-dark, brand-light), semantic colors (surface, text-primary, text-secondary, text-on-brand), and Inter font family
    - Add base styles for body, headings, and focus indicators
    - _Requirements: 9.1, 9.3, 10.4_

  - [x] 1.2 Copy favicon assets to public/ and update root.tsx meta/links
    - Copy favicon files from `images_new/favicon_io/` to `public/`
    - Update `links` export in `root.tsx` to include favicon-16x16, favicon-32x32, apple-touch-icon, and site.webmanifest references
    - Add meta tags for description and theme-color
    - _Requirements: 9.4_

  - [x] 1.3 Update route configuration for all pages
    - Modify `app/routes.ts` to add routes for `/features`, `/about`, `/contact`, and a catch-all `*` route for 404
    - Use `index`, `route` from `@react-router/dev/routes`
    - _Requirements: 1.1, 1.2_

- [x] 2. Implement navigation components
  - [x] 2.1 Create Navbar component with desktop navigation
    - Create `app/components/Navbar.tsx`
    - Display Manaprobe logo (from images_new/) linking to `/`
    - Render horizontal `NavLink` items for Home, Features, About, Contact
    - Use `NavLink` className callback to style active link differently
    - Use semantic `<header>` and `<nav>` elements with `role="navigation"`
    - Desktop links visible at `md:` breakpoint (768px) and above
    - _Requirements: 2.1, 2.2, 2.3, 9.2, 10.2_

  - [x] 2.2 Create MobileMenuPanel component with hamburger toggle
    - Create `app/components/MobileMenuPanel.tsx`
    - Accept `isOpen` and `onLinkClick` props
    - Render navigation links in a dropdown/slide-down panel
    - Panel visible only when `isOpen` is true and viewport < 768px
    - Include `id` attribute for `aria-controls` reference
    - Links are keyboard-navigable with Tab/Shift+Tab
    - _Requirements: 3.1, 3.2, 3.3, 3.5_

  - [x] 2.3 Integrate hamburger button and mobile menu into Navbar
    - Add hamburger icon button visible only below `md:` breakpoint
    - Manage `isMenuOpen` state in Navbar
    - Wire hamburger button with `aria-expanded`, `aria-label`, `aria-controls`
    - Close menu on: link click, outside click (useEffect with document listener), Escape key, hamburger toggle
    - Close menu on route change using `useLocation` from react-router
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [x] 2.4 Create Footer component
    - Create `app/components/Footer.tsx`
    - Include copyright notice, quick page links, and contact/social links
    - Use semantic `<footer>` element
    - Responsive layout: stacked on mobile, row on desktop
    - _Requirements: 10.2_

  - [x] 2.5 Wire Navbar and Footer into root.tsx Layout
    - Import and render `<Navbar />` above `<Outlet />`
    - Import and render `<Footer />` below `<Outlet />`
    - Wrap `<Outlet />` in a `<main>` element for semantic structure
    - _Requirements: 10.2_

- [x] 3. Checkpoint - Navigation complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implement page content
  - [x] 4.1 Implement Home page with hero, screenshots, and feature highlights
    - Rewrite `app/routes/home.tsx` with:
      - HeroSection: app name headline, description paragraph, download CTA button(s)
      - ScreenshotSection: responsive app screenshot(s) from `images_new/` with `loading="lazy"`, `alt`, `width`, `height`
      - FeaturesHighlight: grid of 3-4 key features with icons and brief descriptions
    - Export `meta` function for page title and description
    - _Requirements: 4.1, 4.2, 4.3, 8.1, 8.3_

  - [x] 4.2 Implement Features page with responsive grid
    - Create `app/routes/features.tsx`
    - Create `app/data/features.ts` with static feature data array (FeatureItem type)
    - Render feature cards in responsive grid: 1 col mobile, 2 col tablet (`md:`), 3 col desktop (`lg:`)
    - Each card: title, description, optional icon/visual
    - Export `meta` function for page title
    - _Requirements: 5.1, 5.2, 8.1_

  - [x] 4.3 Implement About page
    - Create `app/routes/about.tsx`
    - Display information about Manaprobe app and its creators
    - Include at least one section with heading and descriptive paragraph text
    - Export `meta` function for page title
    - _Requirements: 6.1, 6.2_

  - [x] 4.4 Implement Contact page with validated form
    - Create `app/routes/contact.tsx`
    - Build contact form with name, email, message fields
    - Implement `validateContactForm` function for client-side validation
    - Display inline validation errors below each field on submit
    - Prevent submission when required fields are empty/whitespace or email is invalid
    - Include alternative contact method (email link)
    - Use proper `<label>` elements and `aria-describedby` for error messages
    - Export `meta` function for page title
    - _Requirements: 7.1, 7.2_

  - [x] 4.5 Implement 404 catch-all page
    - Create `app/routes/404.tsx`
    - Display friendly "Page not found" message
    - Include a `<Link>` back to the Home page
    - Consistent styling with site theme
    - Export `meta` function for page title
    - _Requirements: 1.3_

- [x] 5. Checkpoint - All pages implemented
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Responsive polish and accessibility
  - [x] 6.1 Ensure responsive layout across all pages
    - Verify no horizontal overflow on viewports 320px–1920px
    - Apply fluid typography using Tailwind responsive utilities (`text-sm md:text-base lg:text-lg`)
    - Ensure images use `max-w-full h-auto` and explicit dimensions
    - Test spacing scales appropriately between breakpoints
    - _Requirements: 8.1, 8.2, 8.3_

  - [x] 6.2 Add focus indicators and color contrast compliance
    - Add visible focus ring styles (e.g., `focus-visible:ring-2 focus-visible:ring-brand-accent`) to all interactive elements
    - Verify text/background color combinations meet 4.5:1 contrast ratio
    - Ensure all form inputs, links, and buttons have visible focus states
    - _Requirements: 10.3, 10.4_

  - [x] 6.3 Add image optimization and performance attributes
    - Add `loading="lazy"` to below-the-fold images
    - Ensure all `<img>` elements have `alt`, `width`, and `height` attributes
    - Verify `font-display: swap` is applied via Google Fonts URL parameter
    - Confirm preconnect links for fonts.googleapis.com and fonts.gstatic.com
    - _Requirements: 10.1, 8.3_

- [x] 7. Checkpoint - Final verification
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Testing
  - [x] 8.1 Write unit tests for contact form validation
    - Test empty name/email/message returns appropriate errors
    - Test invalid email format returns error
    - Test valid submission returns no errors
    - Test whitespace-only fields are rejected
    - _Requirements: 7.2_

  - [x] 8.2 Write property test for contact form required field validation
    - **Property 7: Contact form required field validation**
    - Generate random form data with missing/whitespace fields, verify rejection and error display
    - **Validates: Requirements 7.2**

  - [x] 8.3 Write property test for feature list rendering completeness
    - **Property 6: Feature list rendering completeness**
    - Generate random feature data arrays, verify all titles and descriptions appear in rendered output
    - **Validates: Requirements 5.1**

  - [x] 8.4 Write unit tests for navigation rendering
    - Verify all 4 navigation links render with correct href and label
    - Verify logo renders and links to "/"
    - Verify active link styling applies to current route
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 8.5 Write integration tests for hamburger menu interaction
    - Test menu opens on hamburger click
    - Test menu closes on link click, outside click, Escape key
    - Test ARIA attributes update correctly (aria-expanded)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- All page content is static — no external API calls needed for initial implementation
- The existing `ErrorBoundary` in root.tsx serves as a fallback; the dedicated 404 route handles undefined paths gracefully
- Logo and screenshot images should be copied or referenced from `images_new/` — consider moving web-optimized versions to `public/` or importing them directly

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3"] },
    { "id": 1, "tasks": ["2.1", "2.4"] },
    { "id": 2, "tasks": ["2.2", "2.5"] },
    { "id": 3, "tasks": ["2.3"] },
    { "id": 4, "tasks": ["4.1", "4.2", "4.3", "4.4", "4.5"] },
    { "id": 5, "tasks": ["6.1", "6.2", "6.3"] },
    { "id": 6, "tasks": ["8.1", "8.4"] },
    { "id": 7, "tasks": ["8.2", "8.3", "8.5"] }
  ]
}
```
