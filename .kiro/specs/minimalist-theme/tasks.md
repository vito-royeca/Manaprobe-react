# Implementation Plan: Minimalist Theme

## Overview

Replace the Manaprobe brand color scheme with a minimalist neutral design system supporting light and dark variants. Implementation uses Tailwind CSS v4's `@theme` directive for token definitions, a class-based dark mode strategy (`dark` class on `<html>`), a theme utility module for persistence and system preference detection, and a ThemeToggle component in the Navbar.

## Tasks

- [x] 1. Define minimalist color tokens and base styles
  - [x] 1.1 Replace brand color tokens with neutral palette in app.css
    - Remove all brand color tokens (`brand-primary`, `brand-secondary`, `brand-accent`, `brand-dark`, `brand-light`) from the `@theme` block
    - Define new semantic tokens: `surface`, `surface-alt`, `text-primary`, `text-secondary`, `accent`, `border`, `surface-dark`, `text-on-dark`
    - Set light variant values as defaults in `@theme`
    - Add dark variant token overrides scoped under `.dark` selector using CSS custom properties
    - Update base styles (`html, body`) to use new tokens and support class-based dark mode
    - Update heading styles to use `text-primary` token instead of `brand-dark`/`brand-light`
    - Update focus-visible indicator to use `accent` token
    - Remove the `prefers-color-scheme` media queries from app.css (handled by JS utility)
    - _Requirements: 1.1, 1.2, 1.5, 2.1–2.5, 2.7, 3.1–3.5, 6.1, 6.3, 7.1, 7.2, 7.3, 8.1–8.7_

- [x] 2. Create theme utility module and ThemeToggle component
  - [x] 2.1 Create theme utility module at app/utils/theme.ts
    - Implement `getResolvedTheme()` function: localStorage > system preference > 'light' default
    - Implement `applyTheme(theme)` function: toggle `dark` class on `document.documentElement`
    - Implement `persistTheme(theme)` function: save to localStorage with error handling
    - Implement `onSystemThemeChange(callback)` function: listen to `matchMedia` changes, return cleanup
    - Add SSR guard (`typeof window !== 'undefined'`) for all browser APIs
    - Handle localStorage errors (private browsing, quota exceeded) gracefully
    - _Requirements: 2.6, 3.6, 3.7, 4.2, 4.3, 4.4, 4.5_

  - [x] 2.2 Write property test for theme resolution priority
    - **Property 1: Theme resolution priority**
    - **Validates: Requirements 2.6, 3.6, 4.4, 4.5**

  - [x] 2.3 Write property test for theme persistence round-trip
    - **Property 2: Theme persistence round-trip**
    - **Validates: Requirements 4.3**

  - [x] 2.4 Write property test for theme application idempotence
    - **Property 3: Theme application idempotence**
    - **Validates: Requirements 4.2**

  - [x] 2.5 Create ThemeToggle component at app/components/ThemeToggle.tsx
    - Render a button with sun SVG icon (when dark mode active) and moon SVG icon (when light mode active)
    - On click: toggle between light/dark, call `applyTheme()` and `persistTheme()`
    - Include `aria-label` describing current state (e.g., "Switch to light theme" / "Switch to dark theme")
    - Ensure keyboard operability (button element, focusable)
    - Accept optional `className` prop for positioning flexibility
    - Use `accent` token for focus ring styling
    - _Requirements: 4.1, 4.2, 4.3, 4.6, 4.7_

  - [x] 2.6 Write unit tests for ThemeToggle component
    - Test correct icon rendering for each theme state
    - Test aria-label updates on toggle
    - Test keyboard activation
    - _Requirements: 4.6, 4.7_

- [x] 3. Integrate theme initialization in root layout
  - [x] 3.1 Add theme initialization script to app/root.tsx
    - Import `getResolvedTheme`, `applyTheme`, `onSystemThemeChange` from theme utility
    - Call `getResolvedTheme()` and `applyTheme()` on app mount (useEffect in Layout or App)
    - Subscribe to system preference changes with `onSystemThemeChange()` and clean up on unmount
    - Update `meta` theme-color to neutral value (remove `#6C3FA0`)
    - _Requirements: 3.6, 3.7, 4.4, 4.5, 5.4, 5.5, 5.6_

- [x] 4. Checkpoint - Verify theme infrastructure
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Update component styling to use neutral tokens
  - [x] 5.1 Update Navbar component to use minimalist tokens
    - Add `<ThemeToggle />` between desktop nav links and hamburger button
    - Replace `border-brand-light` with `border-border`
    - Replace `bg-brand-accent/10` and `text-brand-accent` active states with `accent` token equivalents
    - Replace `text-brand-primary`, `hover:bg-brand-light` with neutral token classes
    - Replace `focus-visible:ring-brand-accent` with `focus-visible:ring-accent`
    - Ensure ThemeToggle is visible on all viewport sizes (320px–1920px)
    - _Requirements: 1.3, 4.1, 5.1, 5.4, 5.7_

  - [x] 5.2 Update Footer component to use minimalist tokens
    - Replace `bg-brand-dark` with `bg-surface-dark`
    - Replace `text-text-on-brand` with `text-text-on-dark`
    - Replace `text-brand-light/80` with `text-text-on-dark/80` or `text-text-secondary`
    - Replace `focus-visible:ring-brand-accent` with `focus-visible:ring-accent`
    - Replace `focus-visible:ring-offset-brand-dark` with `focus-visible:ring-offset-surface-dark`
    - _Requirements: 1.3, 5.2, 5.5, 5.7_

  - [x] 5.3 Update MobileMenuPanel component to use minimalist tokens
    - Replace `border-brand-light` with `border-border`
    - Replace `bg-brand-accent/10` and `text-brand-accent` with accent token equivalents
    - Replace `text-brand-primary`, `hover:bg-brand-light` with neutral token classes
    - Replace `focus-visible:ring-brand-accent` with `focus-visible:ring-accent`
    - _Requirements: 1.3, 5.3, 5.6, 5.7_

  - [x] 5.4 Update home page to remove gradients and use neutral tokens
    - Replace hero section gradient (`bg-gradient-to-br from-brand-dark via-brand-primary to-brand-secondary`) with solid neutral background using theme tokens
    - Update hero text colors from `text-text-on-brand`, `text-brand-light/90` to neutral equivalents
    - Update hero button styles to use accent/neutral tokens
    - Replace screenshot section `bg-brand-light` with `bg-surface-alt`
    - Replace feature card `bg-brand-light` with `bg-surface-alt`
    - Replace `text-brand-dark` headings with `text-text-primary`
    - Replace `text-brand-accent` icon colors with `text-accent`
    - Add dark mode variants for all sections (solid dark backgrounds, no gradients)
    - _Requirements: 1.3, 1.4, 6.1, 6.2, 6.3, 6.4_

  - [x] 5.5 Write unit tests for component token usage
    - Verify no hardcoded brand color values remain in component source
    - Verify no gradient classes remain in home page
    - _Requirements: 5.1, 5.2, 5.3, 6.2_

- [x] 6. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The design specifies TypeScript as the implementation language
- `fast-check` is already available in devDependencies for property-based testing
- All color token values are pre-verified for WCAG AA contrast compliance in the design document

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["2.1"] },
    { "id": 2, "tasks": ["2.2", "2.3", "2.4", "2.5"] },
    { "id": 3, "tasks": ["2.6", "3.1"] },
    { "id": 4, "tasks": ["5.1", "5.2", "5.3", "5.4"] },
    { "id": 5, "tasks": ["5.5"] }
  ]
}
```
