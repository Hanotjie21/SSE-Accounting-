---
name: Prestige Ledger
colors:
  surface: '#fbf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#44474f'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#747780'
  outline-variant: '#c4c6d0'
  surface-tint: '#465e8c'
  primary: '#00173a'
  on-primary: '#ffffff'
  primary-container: '#102c57'
  on-primary-container: '#7c94c6'
  inverse-primary: '#aec7fb'
  secondary: '#7b5800'
  on-secondary: '#ffffff'
  secondary-container: '#fdc34d'
  on-secondary-container: '#715000'
  tertiary: '#16191a'
  on-tertiary: '#ffffff'
  tertiary-container: '#2a2d2e'
  on-tertiary-container: '#929495'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#aec7fb'
  on-primary-fixed: '#001a40'
  on-primary-fixed-variant: '#2e4673'
  secondary-fixed: '#ffdea6'
  secondary-fixed-dim: '#f7bd48'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5d4200'
  tertiary-fixed: '#e1e3e4'
  tertiary-fixed-dim: '#c5c7c8'
  on-tertiary-fixed: '#191c1d'
  on-tertiary-fixed-variant: '#454748'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  section-padding: 80px
---

## Brand & Style

The design system is engineered for **SSE Investments**, conveying a brand personality that is authoritative, meticulous, and sophisticated. The target audience includes high-net-worth individuals and corporate entities who require absolute clarity in financial management. 

The aesthetic is **Modern Corporate**, blending the structured, data-driven layout of high-end fintech with the classic institutional trustworthiness of traditional accounting. We employ a mix of:
- **Clean Minimalism:** Utilizing significant whitespace to ensure financial data remains legible and uncluttered.
- **Tonal Layering:** Subtle background shifts and soft container borders create a sense of organized depth without the "noise" of heavy shadows.
- **Refined Precision:** High-contrast typography and razor-sharp iconography communicate accuracy and attention to detail.

## Colors

The palette is derived directly from the institutional legacy of financial firms. 

- **Navy Blue (#102C57):** The anchor of the system, used for headers, primary actions, and brand-critical elements to evoke stability and wisdom.
- **Gold/Mustard (#B8860B):** A prestigious accent used sparingly for secondary actions, highlight markers, and status indicators that denote success and growth.
- **White & Light Gray:** The primary canvases for data display, ensuring high readability and a clean professional atmosphere.
- **Functional Neutrals:** Deep charcoals are used for body text to maintain optimal contrast without the harshness of pure black.

## Typography

This design system utilizes a dual-font approach to balance modernity with professional utility.

**Manrope** is used for headlines. Its geometric yet slightly condensed nature feels contemporary and precise, fitting for an investment firm's growth-oriented message.

**Work Sans** handles all body copy and tabular data. It is chosen for its exceptional legibility at small sizes and its neutral, reliable character.

- **Contrast:** Headings should always use the Primary Navy color.
- **Hierarchy:** Use the uppercase labels for section headers in tables or technical forms to maintain a disciplined, "accounting ledger" feel.

## Layout & Spacing

The layout philosophy follows a **Fixed-Fluid Hybrid** model. Content is contained within a maximum width of 1200px on desktop to ensure line lengths remain readable, while background elements and headers may bleed to the edges to feel expansive.

- **Grid:** A 12-column grid is utilized for desktop layouts.
- **Rhythm:** A strict 8px baseline grid governs all vertical spacing. Elements should be spaced in increments of 8 (8, 16, 24, 32, 48, 64).
- **Responsive:** On mobile, margins reduce to 16px and the 12-column grid collapses into a single-column stack. Tablet devices use a 6-column grid with 24px margins.

## Elevation & Depth

Visual hierarchy is achieved primarily through **Tonal Layers** and **Low-Contrast Outlines** rather than aggressive shadows.

- **Surfaces:** Use `#F8F9FA` for secondary sections (like sidebars or card backgrounds) to differentiate from the main `#FFFFFF` canvas.
- **Borders:** Define containers with 1px solid strokes in `#E5E7EB`. This mimics the clean lines of professional financial documents.
- **Interactive Depth:** Only the most critical interactive elements (like a primary "CTA" or a focused "Investment Card") may use a very soft, diffused shadow (0px 4px 20px rgba(16, 44, 87, 0.08)) to indicate they are "lifted" from the page.

## Shapes

The shape language is **Soft and Disciplined**. We avoid fully sharp corners to ensure the UI feels modern and approachable, but we also avoid heavy rounding (pill shapes) to maintain a serious, corporate tone.

- **Standard Radius:** 0.25rem (4px) for most small components like inputs and small buttons.
- **Large Radius:** 0.5rem (8px) for cards and main content containers.
- **Icons:** Use linear, stroke-based icons with a consistent 2px weight to match the precision of the typography.

## Components

### Buttons
- **Primary:** Solid Navy (#102C57) with White text. Used for the main action.
- **Secondary:** Solid Gold (#B8860B) with White text. Used for emphasized secondary actions like "Get a Quote."
- **Ghost:** Navy border with Navy text, used for less prominent actions.

### Cards & Data Tables
- Cards should have a 1px border (#E5E7EB) and no shadow by default.
- Data tables should use the Navy color for the header background with White text to anchor the information. Alternate row striping should use the Tertiary Gray (#F8F9FA).

### Input Fields
- Inputs feature a 1px border. On focus, the border transitions to Primary Navy with a subtle 2px outer glow in a semi-transparent Navy tint.

### Chips & Tags
- Used for status (e.g., "Pending," "Completed"). These should use muted background versions of the status colors (Success Green, Error Red) with dark text to maintain the "Professional" aesthetic.