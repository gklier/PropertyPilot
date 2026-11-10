# PropertyPilot visual system — restrained Liquid Glass on the web

## Intention

A premium, calm enterprise experience: restrained translucent controls and floating navigation layered above **opaque, readable work surfaces**. Think Liquid Glass-like material + Linear-like information design. This is a web interpretation, not Apple's native rendering API or an Apple endorsement.

Apple's developer material guidance emphasizes glass in a distinct functional/navigation layer, **not** generally in the content layer. Source: https://developer.apple.com/design/human-interface-guidelines/materials

## Design hierarchy

1. **Content plane:** flat/slightly elevated canvas, opaque content surfaces, strong typography, dense but readable tables, functional document viewer.
2. **Interaction plane:** floating top bar, selective command palette, popovers, active filter dock, nav/side controls, subtle blurred surfaces.
3. **Focus plane:** dialogs, toasts, overlays, critical reviewer decisions, high contrast and clear keyboard focus.

## Baseline tokens (starting proposals; refine visually)

- Radius: 8px compact controls, 12px cards, 16–20px nav/popovers. Avoid 'pill everything'.
- Spacing: 4/8/12/16/24/32 system. Tables support comfortable and compact density options.
- Typography: modern humanist/neo-grotesk sans; numeric tables use tabular numerals. Use one main face and optional editorial display face, not five fonts.
- Light canvas: cool-neutral near `#F4F6F8`; main text `#17212B`, subtext around `#556372`; opaque panels near white.
- Dark canvas: deep graphite around `#10151B`; surfaces `#171E26`; primary text near `#EFF3F7`.
- Accent: restrained deep cobalt/teal, to be chosen and tested as a single consistent action color. Status colors reserved for meaningful states.
- Glass nav example: neutral tint with backdrop blur ~18px, subtle 1px inner edge, small specular highlight, carefully restrained shadow, light environmental color pickup. These are hypotheses and require browser evaluation.
- Motion: hover/focus 100–180ms, popover 180–260ms, layout transition 220–350ms (adjust by context). Spring-like where natural, without jitter.
- No forced motion in reduced-motion mode; no information should depend on blur/translucency.

## Component inventory

Top navigation, command palette, sidebar/rail, header, entity quick switcher, property selector, vendor table, document viewer, COI extraction evidence panel, review drawer, date/status chips, notification preview, assignment control, empty state, upload dropzone, confirmation modal, toast, skeleton, auth form, account switcher and user menu.

## Interaction commitments

- All buttons do something. Functional forms, search, table sorting/pagination, saved filters only if persistence exists, no fake charts, no invented metrics or broken links.
- Keyboard: Tab/Shift-Tab, Enter/Space, Escape where expected, visible focus, sensible focus restoration after dialogs, proper semantic HTML.
- Accessible color/contrast and touch targets. Contrast should be measured, not assumed. Use icons with accessible names or hidden decorative semantics.
- Responsive layouts at 320/375/768/1024/1440. Tables need horizontal scroll or genuinely useful mobile card alternatives without clipping data.
- Respect `prefers-reduced-motion`, forced colors and browser-specific reduced transparency controls; fallback to high-opacity surfaces when needed.
- Avoid compositing overload: no large fullscreen blur over moving content on every frame; profile performance.

## AI slop rejection checklist

Reject generic frosted KPI cards everywhere, blue-purple gradient glows, meaningless animated particles, giant nonfunctional search bars, cloned sidebar demos, overdesigned hero blocks in the operational app, endless tiny captions, emoji-as-product-icons, irrelevant charts and lorem ipsum copy.

## Screenshots required (when browser available)

- Desktop 1440: portfolio dashboard, vendor listing, vendor detail, COI review flow.
- Tablet 768: navigation adaptation and table overflow.
- Mobile 375/320: dashboard, form validation, upload flow, bottom/side navigation.
- Both light/dark theme, error state, loading state, reduced motion/transparency alternatives.

## Styling and technology

Prefer CSS variables + Tailwind utility boundaries; use shadcn/ui/Radix for accessible primitives. Only introduce advanced WebGL/canvas effects if they demonstrably improve navigation without harming accessibility or responsiveness. Avoid copying proprietary Apple visual assets or protected brand elements.
