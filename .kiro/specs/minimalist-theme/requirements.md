# Requirements Document

## Introduction

Replace the existing custom color scheme and visual styling derived from the Manaprobe logo assets (images_new/ directory) with a minimalist design system that supports both dark and light theme variants. The new design removes brand-specific purple/blue gradients and replaces them with a neutral, clean aesthetic using standard grayscale tones and minimal accent colors.

## Glossary

- **Theme_System**: The CSS custom property and Tailwind theme configuration that defines all color tokens, typography, and visual styling for the application
- **Light_Variant**: The theme variant optimized for bright environments using light backgrounds and dark text
- **Dark_Variant**: The theme variant optimized for low-light environments using dark backgrounds and light text
- **Color_Token**: A named CSS custom property that maps a semantic role (e.g., surface, text-primary) to a specific color value
- **Theme_Toggle**: A user interface control that allows switching between Light_Variant and Dark_Variant
- **Component**: A reusable UI element (Navbar, Footer, MobileMenuPanel) that consumes Color_Tokens for its visual presentation

## Requirements

### Requirement 1: Remove Brand Color Scheme

**User Story:** As a developer, I want to remove the Manaprobe logo-derived color scheme from the application, so that the visual design is no longer coupled to specific brand assets.

#### Acceptance Criteria

1. WHEN the Theme_System is loaded, THE Theme_System SHALL define no color tokens named brand-primary, brand-secondary, brand-accent, brand-dark, or brand-light, and SHALL not contain the hex values #6C3FA0, #4A90D9, #8B5CF6, #1E1B4B, or #F5F3FF in any token definition.
2. THE Theme_System SHALL define replacement Color_Tokens using a grayscale neutral palette (e.g., shades of gray ranging from near-white to near-black) that map to the same semantic roles (primary action, secondary action, accent/focus, dark background, light background) previously served by the brand tokens.
3. WHEN a Component references a former brand color utility class (text-brand-primary, bg-brand-dark, text-brand-light, outline-brand-accent, or any other brand-prefixed class), THE Theme_System SHALL resolve the reference to a corresponding neutral replacement token value without causing a build error or unresolved class.
4. IF the application is rendered in dark mode, THEN THE Theme_System SHALL apply neutral replacement values for all former brand color references used in dark mode styles, maintaining readable text contrast (minimum 4.5:1 ratio against the background).
5. THE Theme_System SHALL update all semantic color tokens (text-primary, surface-dark) that previously derived their values from the brand palette to use values from the neutral replacement palette instead.

### Requirement 2: Define Minimalist Light Variant

**User Story:** As a user, I want a clean light theme with neutral tones, so that the interface feels modern and distraction-free.

#### Acceptance Criteria

1. THE Light_Variant SHALL define a surface background color using a CSS custom property with a lightness value of 95% or above in the HSL color space (e.g., #FFFFFF or #FAFAFA).
2. THE Light_Variant SHALL define a primary text color using a CSS custom property with a lightness value of 20% or below in the HSL color space (e.g., #111827 or #1F2937).
3. THE Light_Variant SHALL define a secondary text color using a CSS custom property with a lightness value between 40% and 60% in the HSL color space (e.g., #6B7280).
4. THE Light_Variant SHALL define a single accent color CSS custom property for interactive elements (links, buttons, and form controls) using a saturation value of 50% or below or a lightness value of 20% or below in the HSL color space (e.g., #111827 or #3B82F6).
5. THE Light_Variant SHALL define a border color using a CSS custom property with a lightness value of 85% or above in the HSL color space (e.g., #E5E7EB).
6. IF no user preference is stored AND the operating system does not indicate a dark color scheme preference via the prefers-color-scheme media query, THEN THE Light_Variant SHALL apply as the default theme.
7. THE Light_Variant SHALL maintain a minimum contrast ratio of 4.5:1 between the primary text color and the surface background color, and a minimum contrast ratio of 3:1 between the secondary text color and the surface background color.

### Requirement 3: Define Minimalist Dark Variant

**User Story:** As a user, I want a clean dark theme with neutral tones, so that I can use the application comfortably in low-light environments.

#### Acceptance Criteria

1. THE Dark_Variant SHALL define a surface background color with a luminance value no greater than 10% relative luminance (e.g., a neutral dark tone consistent with the brand palette).
2. THE Dark_Variant SHALL define a primary text color with a luminance value no less than 90% relative luminance, providing a minimum contrast ratio of 7:1 against the surface background color.
3. THE Dark_Variant SHALL define a secondary text color with a luminance value between 40% and 60% relative luminance, providing a minimum contrast ratio of 4.5:1 against the surface background color.
4. THE Dark_Variant SHALL define a single accent color applied to all interactive elements (links, buttons, and focus indicators) that provides a minimum contrast ratio of 4.5:1 against the surface background color.
5. THE Dark_Variant SHALL define a border color with a luminance value between 15% and 30% relative luminance, visually distinguishable from the surface background with a minimum contrast ratio of 1.5:1.
6. WHEN the operating system indicates a dark color scheme preference, THE Theme_System SHALL apply the Dark_Variant without requiring a page reload.
7. WHEN the operating system color scheme preference changes from light to dark or dark to light while the Website is open, THE Theme_System SHALL update the applied variant within 1 second to match the new preference.

### Requirement 4: Theme Switching Mechanism

**User Story:** As a user, I want to toggle between light and dark themes manually, so that I can choose the variant that suits my current environment regardless of system settings.

#### Acceptance Criteria

1. THE Theme_Toggle SHALL be visible and operable from the Navbar Component on all viewport sizes from 320px to 1920px wide
2. WHEN a user activates the Theme_Toggle, THE Theme_System SHALL switch between Light_Variant and Dark_Variant by updating the document root element's class attribute and applying the corresponding color scheme within 100 milliseconds
3. WHEN a user selects a theme via the Theme_Toggle, THE Theme_System SHALL persist the selection in browser local storage
4. WHEN the application loads and a persisted theme preference exists in local storage, THE Theme_System SHALL apply the persisted preference instead of the operating system preference
5. IF the application loads and no persisted theme preference exists in local storage, THEN THE Theme_System SHALL apply the operating system's preferred color scheme as the default
6. THE Theme_Toggle SHALL display a sun icon when Dark_Variant is active and a moon icon when Light_Variant is active, indicating the theme the user would switch to upon activation
7. THE Theme_Toggle SHALL be operable via keyboard activation and include an aria-label attribute that identifies the current theme state for screen readers

### Requirement 5: Update Component Styling

**User Story:** As a developer, I want all existing components to use the new minimalist Color_Tokens, so that the entire application has a consistent visual appearance.

#### Acceptance Criteria

1. THE Navbar Component SHALL reference only Color_Tokens defined in the application theme (surface, text-primary, text-secondary, accent, border) for all background, text, border, and hover-state styling, with no hardcoded color values.
2. THE Footer Component SHALL reference only Color_Tokens defined in the application theme for all background, text, and link-color styling, with no hardcoded color values.
3. THE MobileMenuPanel Component SHALL reference only Color_Tokens defined in the application theme for all background, text, border, and active-state styling, with no hardcoded color values.
4. WHEN the system color scheme preference changes (e.g., light to dark), THE Navbar Component SHALL update its visual presentation to reflect the corresponding theme colors without a page reload.
5. WHEN the system color scheme preference changes, THE Footer Component SHALL update its visual presentation to reflect the corresponding theme colors without a page reload.
6. WHEN the system color scheme preference changes, THE MobileMenuPanel Component SHALL update its visual presentation to reflect the corresponding theme colors without a page reload.
7. THE Navbar Component, Footer Component, and MobileMenuPanel Component SHALL each maintain a minimum contrast ratio of 4.5:1 between text and background colors in both light and dark color schemes.

### Requirement 6: Remove Logo-Derived Gradient Styling

**User Story:** As a developer, I want to remove gradient backgrounds derived from brand colors, so that the design is consistent with the minimalist approach.

#### Acceptance Criteria

1. THE Theme_System SHALL NOT define any CSS gradient backgrounds (linear-gradient, radial-gradient, or conic-gradient) that use the brand color variables (brand-primary, brand-secondary, brand-accent, or brand-dark) as gradient stops.
2. WHEN the home page hero section renders, THE hero section SHALL display a single solid background color from the defined theme palette instead of a multi-color gradient, in both light and dark color scheme modes.
3. THE Theme_System SHALL use only solid background colors or opacity variations of a single color token for all section backgrounds across every page of the Website.
4. WHEN any page renders in dark color scheme mode, THE page sections SHALL display solid background colors from the dark theme palette without any gradient transitions between colors.

### Requirement 7: Typography and Spacing Consistency

**User Story:** As a user, I want consistent typography and spacing across both theme variants, so that the reading experience remains uniform regardless of the active theme.

#### Acceptance Criteria

1. WHILE the Light_Variant is active, THE Theme_System SHALL apply the primary text Color_Token as the heading color, and WHILE the Dark_Variant is active, THE Theme_System SHALL apply the corresponding dark variant primary text Color_Token as the heading color.
2. THE Theme_System SHALL use the Inter font family as the sole typeface for both Light_Variant and Dark_Variant, with no font-family changes between variants.
3. THE Theme_System SHALL apply the accent Color_Token as the outline color for all focus-visible indicators in both Light_Variant and Dark_Variant.
4. WHEN switching between Light_Variant and Dark_Variant, THE Theme_System SHALL preserve all margin, padding, font-size, line-height, and layout dimension values unchanged, modifying only color-related properties (color, background-color, border-color, outline-color).
5. WHEN switching between Light_Variant and Dark_Variant, THE Theme_System SHALL maintain a minimum contrast ratio of 4.5:1 between heading text and its background in each variant.

### Requirement 8: Accessibility Compliance

**User Story:** As a user with visual impairments, I want the minimalist theme to maintain sufficient color contrast, so that I can read and interact with all content.

#### Acceptance Criteria

1. WHILE the light color scheme is active, THE Website SHALL maintain a minimum contrast ratio of 4.5:1 between primary text and the surface background color (WCAG AA for normal text)
2. WHILE the dark color scheme is active, THE Website SHALL maintain a minimum contrast ratio of 4.5:1 between primary text and the surface-dark background color (WCAG AA for normal text)
3. WHILE the light color scheme is active, THE Website SHALL maintain a minimum contrast ratio of 3:1 for interactive element boundaries (button borders, link underlines, form input borders) and icons against their immediate background color (WCAG AA for non-text elements)
4. WHILE the dark color scheme is active, THE Website SHALL maintain a minimum contrast ratio of 3:1 for interactive element boundaries (button borders, link underlines, form input borders) and icons against their immediate background color (WCAG AA for non-text elements)
5. WHEN focus-visible is triggered on an interactive element via keyboard navigation, THE Website SHALL render a focus indicator of at least 2px thickness with a minimum contrast ratio of 3:1 against both the element's background and the page background
6. WHILE the dark color scheme is active, THE Website SHALL maintain a minimum contrast ratio of 4.5:1 between secondary text and the surface-dark background color (WCAG AA for normal text)
7. WHILE the light color scheme is active, THE Website SHALL maintain a minimum contrast ratio of 4.5:1 between secondary text and the surface background color (WCAG AA for normal text)
