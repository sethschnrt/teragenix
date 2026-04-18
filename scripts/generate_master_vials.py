#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path('/Users/Rex/.openclaw/workspace/teragenix')
BLANK = ROOT / 'public/images/vials/blank-vial-mockup-flatlight.png'
GOOD_REF = ROOT / 'public/images/vials/retatrutide.png'
OUT_DIR = ROOT / 'public/images/vials/generated-batch'
OUT_DIR.mkdir(parents=True, exist_ok=True)

FONT_BOLD = ROOT / 'assets/logos/Poppins-Bold.ttf'

PRODUCTS = [
    ('bpc-157', 'BPC-157', '10mg'),
    ('semax', 'Semax', '10mg'),
    ('selank', 'Selank', '10mg'),
    ('cjc-ipamorelin', 'CJC / Ipamorelin', '10mg'),
    ('nad-plus', 'NAD+', '1000 mg'),
]

# Exact approved top label block from a known-good live bottle.
TOP_BLOCK_BOX = (360, 430, 670, 590)
# Measured from the known-good live family.
NAME_BOX = (397, 596, 645, 635)
PILL_BOX = (446, 708, 576, 757)

NAVY = '#1A2B3A'
BLUE = '#5996D5'
WHITE = '#FFFFFF'


def load_font(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_BOLD), size)


def fit_single_line(draw: ImageDraw.ImageDraw, text: str, box: tuple[int, int, int, int], max_size: int, min_size: int) -> ImageFont.FreeTypeFont:
    x1, y1, x2, y2 = box
    max_w = x2 - x1
    max_h = y2 - y1
    for size in range(max_size, min_size - 1, -1):
        font = load_font(size)
        bb = draw.textbbox((0, 0), text, font=font)
        if (bb[2] - bb[0]) <= max_w and (bb[3] - bb[1]) <= max_h:
            return font
    return load_font(min_size)


def draw_centered_text(draw: ImageDraw.ImageDraw, text: str, box: tuple[int, int, int, int], font: ImageFont.FreeTypeFont, fill: str, y_offset: float = 0) -> None:
    x1, y1, x2, y2 = box
    bb = draw.textbbox((0, 0), text, font=font)
    w = bb[2] - bb[0]
    h = bb[3] - bb[1]
    x = x1 + ((x2 - x1) - w) / 2
    y = y1 + ((y2 - y1) - h) / 2 + y_offset
    draw.text((x, y), text, font=font, fill=fill)


def render_name(draw: ImageDraw.ImageDraw, name: str) -> None:
    if name == 'CJC / Ipamorelin':
        box = (360, 592, 682, 639)
        font = fit_single_line(draw, name, box, 30, 17)
        draw_centered_text(draw, name, box, font, NAVY, y_offset=-1)
    elif name == 'NAD+':
        font = fit_single_line(draw, name, NAME_BOX, 37, 24)
        draw_centered_text(draw, name, NAME_BOX, font, NAVY, y_offset=-1)
    else:
        font = fit_single_line(draw, name, NAME_BOX, 34, 22)
        draw_centered_text(draw, name, NAME_BOX, font, NAVY, y_offset=-1)


def render_pill(draw: ImageDraw.ImageDraw, dose: str) -> None:
    x1, y1, x2, y2 = PILL_BOX
    extra = 0
    if len(dose) >= 6:
        extra = 36
    pill = (x1 - extra // 2, y1, x2 + extra // 2, y2)
    radius = (pill[3] - pill[1]) // 2
    draw.rounded_rectangle(pill, radius=radius, fill=BLUE)
    font = fit_single_line(draw, dose, (pill[0] + 10, pill[1] + 8, pill[2] - 10, pill[3] - 8), 24, 16)
    draw_centered_text(draw, dose, pill, font, WHITE, y_offset=-1)


def render(slug: str, name: str, dose: str) -> Path:
    blank_img = Image.open(BLANK).convert('RGBA')
    ref_img = Image.open(GOOD_REF).convert('RGBA')
    # Copy the exact approved top block from the good live family.
    blank_img.paste(ref_img.crop(TOP_BLOCK_BOX), TOP_BLOCK_BOX)
    draw = ImageDraw.Draw(blank_img)
    render_name(draw, name)
    render_pill(draw, dose)
    out = OUT_DIR / f'{slug}.png'
    blank_img.save(out, format='PNG', optimize=True)
    return out


def main() -> None:
    for slug, name, dose in PRODUCTS:
        print(render(slug, name, dose))


if __name__ == '__main__':
    main()
