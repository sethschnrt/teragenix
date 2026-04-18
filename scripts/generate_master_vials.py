#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path('/Users/Rex/.openclaw/workspace/teragenix')
MASTER = ROOT / 'public/images/vials/reference/original-master-vial.png'
TEMPLATE = ROOT / 'public/images/vials/retatrutide.png'
OUT_DIR = ROOT / 'public/images/vials/generated-batch'
OUT_DIR.mkdir(parents=True, exist_ok=True)

FONT_BOLD = ROOT / 'assets/logos/Poppins-Bold.ttf'

PRODUCTS = [
    ('bpc-157', 'BPC-157', '10mg'),
    ('semax', 'Semax', '10mg'),
    ('selank', 'Selank', '10mg'),
    ('cjc-ipamorelin', 'CJC / Ipamorelin', '10mg'),
    ('nad-plus', 'NAD+', '1000mg'),
]

# Leave the existing logo + FOR RESEARCH ONLY alone. Only replace product-name area and pill area.
NAME_RESET_BOX = (382, 586, 650, 640)
NAME_BOX = (368, 584, 667, 644)
PILL_RESET_BOX = (438, 700, 586, 760)
PILL_BOX = (446, 706, 578, 756)

NAVY = '#162534'
BLUE = '#4C97F2'
WHITE = '#FFFFFF'


def load_font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size)


def fit_single_line(draw: ImageDraw.ImageDraw, text: str, box: tuple[int, int, int, int], max_size: int, min_size: int) -> ImageFont.FreeTypeFont:
    x1, y1, x2, y2 = box
    max_w = x2 - x1
    max_h = y2 - y1
    for size in range(max_size, min_size - 1, -1):
        font = load_font(FONT_BOLD, size)
        bb = draw.textbbox((0, 0), text, font=font)
        if (bb[2] - bb[0]) <= max_w and (bb[3] - bb[1]) <= max_h:
            return font
    return load_font(FONT_BOLD, min_size)


def fit_two_line(draw: ImageDraw.ImageDraw, lines: list[str], box: tuple[int, int, int, int], max_size: int, min_size: int, spacing: int = 0) -> ImageFont.FreeTypeFont:
    x1, y1, x2, y2 = box
    max_w = x2 - x1
    max_h = y2 - y1
    text = '\n'.join(lines)
    for size in range(max_size, min_size - 1, -1):
        font = load_font(FONT_BOLD, size)
        bb = draw.multiline_textbbox((0, 0), text, font=font, spacing=spacing, align='center')
        if (bb[2] - bb[0]) <= max_w and (bb[3] - bb[1]) <= max_h:
            return font
    return load_font(FONT_BOLD, min_size)


def draw_centered_text(draw: ImageDraw.ImageDraw, text: str, box: tuple[int, int, int, int], font: ImageFont.FreeTypeFont, fill: str) -> None:
    x1, y1, x2, y2 = box
    bb = draw.textbbox((0, 0), text, font=font)
    x = x1 + ((x2 - x1) - (bb[2] - bb[0])) / 2
    y = y1 + ((y2 - y1) - (bb[3] - bb[1])) / 2 - 1
    draw.text((x, y), text, font=font, fill=fill)


def draw_centered_multiline(draw: ImageDraw.ImageDraw, text: str, box: tuple[int, int, int, int], font: ImageFont.FreeTypeFont, fill: str, spacing: int = 0) -> None:
    x1, y1, x2, y2 = box
    bb = draw.multiline_textbbox((0, 0), text, font=font, spacing=spacing, align='center')
    x = x1 + ((x2 - x1) - (bb[2] - bb[0])) / 2
    y = y1 + ((y2 - y1) - (bb[3] - bb[1])) / 2 - 2
    draw.multiline_text((x, y), text, font=font, fill=fill, spacing=spacing, align='center')


def restore_region(base: Image.Image, master: Image.Image, box: tuple[int, int, int, int]) -> None:
    patch = master.crop(box).convert('RGBA')
    w = box[2] - box[0]
    h = box[3] - box[1]
    mask = Image.new('L', (w, h), 0)
    md = ImageDraw.Draw(mask)
    md.rectangle((10, 10, w - 10, h - 10), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(8))
    region = base.crop(box).convert('RGBA')
    blended = Image.composite(patch, region, mask)
    base.paste(blended, box)


def render_product_name(draw: ImageDraw.ImageDraw, name: str) -> None:
    if name == 'CJC / Ipamorelin':
        display = 'CJC/Ipamorelin'
        box = (352, 588, 684, 640)
        font = fit_single_line(draw, display, box, max_size=28, min_size=18)
        draw_centered_text(draw, display, box, font, NAVY)
    else:
        font = fit_single_line(draw, name, NAME_BOX, max_size=44 if len(name) <= 12 else 36, min_size=24)
        draw_centered_text(draw, name, NAME_BOX, font, NAVY)


def render_dose_pill(draw: ImageDraw.ImageDraw, dose: str) -> None:
    x1, y1, x2, y2 = PILL_BOX
    extra = 0
    if len(dose) >= 6:
        extra = 24
    pill = (x1 - extra // 2, y1, x2 + extra // 2, y2)
    radius = (pill[3] - pill[1]) // 2
    draw.rounded_rectangle(pill, radius=radius, fill=BLUE)
    dose_font = fit_single_line(draw, dose, (pill[0] + 10, pill[1] + 4, pill[2] - 10, pill[3] - 4), max_size=28, min_size=18)
    draw_centered_text(draw, dose, pill, dose_font, WHITE)


def render(slug: str, name: str, dose: str) -> Path:
    base = Image.open(TEMPLATE).convert('RGBA')
    master = Image.open(MASTER).convert('RGBA')
    restore_region(base, master, NAME_RESET_BOX)
    restore_region(base, master, PILL_RESET_BOX)
    draw = ImageDraw.Draw(base)
    render_product_name(draw, name)
    render_dose_pill(draw, dose)
    out = OUT_DIR / f'{slug}.png'
    base.save(out, format='PNG', optimize=True)
    return out


def main() -> None:
    for slug, name, dose in PRODUCTS:
        out = render(slug, name, dose)
        print(out)


if __name__ == '__main__':
    main()
