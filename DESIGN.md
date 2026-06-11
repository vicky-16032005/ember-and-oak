# Design system

Mood: "last embers at midnight: char-black oak, one coal still glowing, candle smoke."
Theme is locked dark across the whole page. Strategy: committed single accent.

## Color (composed in OKLCH, shipped as hex tokens in tailwind.config.js)

| Token | OKLCH | Hex | Role |
|---|---|---|---|
| bg | oklch(0.17 0.004 60) | #121110 | page background |
| deep | oklch(0.12 0.003 60) | #0B0A09 | nav glass, footer, insets |
| surface | oklch(0.22 0.008 60) | #1C1916 | cards, panels |
| divider | - | #2B2620 | hairlines |
| ink | oklch(0.93 0.012 80) | #EDE7DD | body text (>= 12:1 on bg) |
| muted | oklch(0.70 0.015 75) | #A89F92 | secondary text (>= 5:1 on bg) |
| ember | oklch(0.58 0.15 45) | #C75A1E | THE accent: CTA fills, brand mark |
| ember-bright | oklch(0.72 0.14 48) | #F08A4D | accent text and icons on dark (>= 6:1) |
| tan | oklch(0.85 0.06 85) | #E8C795 | hero flourish line, stat numerals |

Button labels are 18px semibold on ember fills (large-text AA at ~3.4:1, near-white
per Helmholtz-Kohlrausch). Ember is the only interactive accent; tan is editorial only.

## Type

- Display: Young Serif (single weight, 1970s cookbook warmth) for h1-h3, stat numerals
- Body/UI: Figtree 300-700
- No mono, no italic-serif editorial lane, no eyebrows/kickers anywhere

## Shape and spacing

- Radius scale: cards 16px (rounded-2xl), inner panels 12px (rounded-xl), pills for buttons/nav
- Content width: max-w-wrap (76rem); section rhythm py-28 with a tighter stat band

## Motion (Jakub-weighted polish)

- Hero: one orchestrated GSAP timeline (rise + fade, power3.out)
- Scroll reveals: gsap.from with once:true; content visible by default if JS/motion is off
- Sticky-stack "Our day": cards recede (scale/blur/opacity) as the next arrives, scrubbed
- Signature: CSS ember-rise particles + coal-breathe glow (the brand moment)
- Counters: IntersectionObserver + RAF writing to refs, ease-out cubic
- Everything gated by prefers-reduced-motion (CSS media block + gsap.matchMedia)
- Only transform / opacity / filter are animated
