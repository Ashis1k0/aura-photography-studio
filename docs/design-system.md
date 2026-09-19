# Design System: Editorial & Cinematic Photography

## 1. Visual Direction & Brand Philosophy

A luxury photography portfolio demands that the interface recedes to let the visual narratives dominate. 
The brand language merges **High-Fashion Editorial Typography** with **Cinematic Space, Asymmetric Rhythm, and Near-Black Depth**.

## 2. Color Palette & Tokens

| Token | Hex | Role | Contrast vs BG |
| :--- | :--- | :--- | :--- |
| `bg-primary` | `#0A0A0C` | Deep Near-Black Background | Baseline |
| `bg-surface` | `#121216` | Warm Charcoal / Card / Section Layer | 1.15:1 |
| `bg-elevated` | `#1A1A22` | Hover States, Modals, Overlays | 1.3:1 |
| `text-primary`| `#F6F4F0` | Warm Ivory Headings & Primary Text | 16.8:1 (AAA) |
| `text-muted` | `#C8BDA8` | Soft Sand Subheadings, Metadata | 10.2:1 (AAA) |
| `text-dim` | `#827E74` | Supplementary Info & Captions | 4.8:1 (AA) |
| `accent` | `#D4AF37` | Muted Antique Gold (Used Sparingly) | 9.4:1 (AAA) |
| `border-subtle`| `rgba(246, 244, 240, 0.08)` | Refined hairline borders | Subdued |
| `border-focus` | `rgba(212, 175, 55, 0.6)` | Accessible visible focus rings | High |

## 3. Typography Scale

Using fluid typography via CSS `clamp()`:
- **Display Serif**: `Cinzel` / `Playfair Display` for Hero and Editorial Section Titles.
- **Body & Metadata Sans**: `Inter` / `Plus Jakarta Sans` for clean, legibility-first reading.

| Level | Size Clamp | Line Height | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Title (H1)** | `clamp(2.8rem, 8vw, 6.5rem)` | 1.05 | `-0.02em` | Homepage Hero, Key Projects |
| **Section Title (H2)**| `clamp(2.0rem, 5vw, 3.8rem)` | 1.15 | `-0.01em` | Section Titles |
| **Subtitle / H3** | `clamp(1.3rem, 3vw, 2.0rem)` | 1.25 | `0em` | Card Titles, Category Headers |
| **Body Large** | `1.125rem` (18px) | 1.6 | `0.01em` | Intros & Lead paragraphs |
| **Body Regular** | `1.0rem` (16px) | 1.55 | `0.01em` | General description |
| **Small / Metadata** | `0.85rem` (13.6px) | 1.4 | `0.05em` | Dates, Locations, Badges |

## 4. Spacing Scale

Strict adherence to a 4px-base geometric scale:
`4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128` px.

## 5. Interaction States & Transitions

All interactive components specify 7 essential states:
1. **Default**: Crisp, restrained, low-noise.
2. **Hover**: 250ms subtle transform scale (`scale(1.02)`), subtle opacity shifts, metadata reveal.
3. **Focus-Visible**: 2px solid antique gold (`#D4AF37`) offset by 2px with high contrast.
4. **Active**: Subtle scale tap (`scale(0.98)`).
5. **Disabled**: Reduced opacity (`0.4`), `cursor: not-allowed`, `aria-disabled="true"`.
6. **Loading**: Skeleton pulse or delicate gold spinner with `aria-busy="true"`.
7. **Error**: Accessible error banner with red accent (`#E5484D`), clear text instructions.
