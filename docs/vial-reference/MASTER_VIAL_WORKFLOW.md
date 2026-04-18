# Teragenix Master Vial Workflow

## Canonical source image
- Use `public/images/vials/reference/original-master-vial.png` as the master reference.
- This is the approved original vial image Jam provided on 2026-04-17.

## Hard rules
- Start from this exact master vial image, not a different render family.
- Keep the same realistic black-background product-shot style.
- Keep the same vial shape, glass, silver neck, blue cap, lighting, crop, and reflections.
- Do not add a neck label.
- Do not swap fonts or approximate the logo.
- Do not freehand a new label style.
- Do not mix asset families on the public shop.
- If the source art does not match this reference, do not publish it.

## Label system to preserve
- White centered front label.
- Lowercase `teragenix` wordmark with superscript `12` exactly as in the master reference.
- Same brand colors and typography treatment as the master reference.
- Add product name and dose using the same label system, not a new one.

## Public product-dose source of truth
When Jam provides a supplier sheet, use that as the dosage source of truth for public bottle art.

Known corrected doses from 2026-04-17:
- BPC-157 = 10mg
- Glutathione = 1500mg
- Semax = 10mg
- Selank = 10mg
- Glow-70 = 70mg

## Release rule
Before pushing bottle art live:
1. Confirm the image still matches the master reference visually.
2. Confirm the logo is correct.
3. Confirm the fonts are correct.
4. Confirm the visible dose matches the source sheet.
5. Check the actual production image, not just the filename/path.

If any of those fail, do not publish.
