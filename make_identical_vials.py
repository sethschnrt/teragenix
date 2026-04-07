#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

WORKSPACE = "/Users/Rex/.openclaw/workspace"
VIAL_DIR = os.path.join(WORKSPACE, "teragenix/public/images/vials")
MASTER_PATH = os.path.join(WORKSPACE, "vial1.webp")
OUT_DIR = VIAL_DIR

products = [
    ("bpc-157", "BPC-157", "5mg"),
    ("tb-500", "TB-500", "5mg"),
    ("recovery-stack", "Recovery\nStack", "5mg + 5mg"),
    ("semaglutide", "Semaglutide", "5mg"),
    ("tirzepatide", "Tirzepatide", "10mg"),
    ("semax", "Semax", "30mg"),
    ("selank", "Selank", "20mg"),
    ("pt-141", "PT-141", "10mg"),
    ("ghk-cu", "GHK-Cu", "50mg"),
    ("epithalon", "Epithalon", "50mg"),
]

BLUE = "#4A90D9"
NAVY = "#1A2E3B"
MUTED = "#7A9BB5"
WHITE = "#FFFFFF"
LABEL_BOX = (261, 207, 412, 507)

FONT_CANDIDATES = [
    "/System/Library/Fonts/Supplemental/Times New Roman Bold.ttf",
    "/System/Library/Fonts/Supplemental/Georgia Bold.ttf",
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
]
SANS_CANDIDATES = [
    "/System/Library/Fonts/Supplemental/Arial.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
]

def pick_font(paths, size):
    for p in paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()

font_logo = pick_font(FONT_CANDIDATES, 17)
font_research = pick_font(SANS_CANDIDATES, 8)
font_name = pick_font(FONT_CANDIDATES, 15)
font_name_small = pick_font(FONT_CANDIDATES, 13)
font_badge = pick_font(SANS_CANDIDATES, 12)


def draw_centered(draw, text, font, fill, x_center, y):
    bbox = draw.multiline_textbbox((0, 0), text, font=font, align="center", spacing=1)
    w = bbox[2] - bbox[0]
    draw.multiline_text((x_center - w / 2, y), text, font=font, fill=fill, align="center", spacing=1)


def make_blank_master():
    img = Image.open(MASTER_PATH).convert("RGBA")
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    l, t, r, b = LABEL_BOX
    draw.rounded_rectangle((l, t, r, b), radius=3, fill=(255, 255, 255, 248))
    return Image.alpha_composite(img, overlay)


def render_label(name, dosage):
    l, t, r, b = LABEL_BOX
    w = r - l
    h = b - t
    label = Image.new("RGBA", (w, h), (255, 255, 255, 0))
    draw = ImageDraw.Draw(label)
    xc = w // 2

    draw_centered(draw, "TERAGENIX", font_logo, NAVY, xc, 22)
    draw_centered(draw, "FOR RESEARCH USE ONLY", font_research, MUTED, xc, 58)

    name_font = font_name_small if len(name.replace("\n", "")) > 11 else font_name
    bbox = draw.multiline_textbbox((0, 0), name, font=name_font, align="center", spacing=1)
    name_y = 98 if "\n" in name else 108
    draw.multiline_text((xc - (bbox[2]-bbox[0])/2, name_y), name, font=name_font, fill=NAVY, align="center", spacing=1)

    bb = draw.textbbox((0, 0), dosage, font=font_badge)
    bw = bb[2] - bb[0] + 28
    bh = bb[3] - bb[1] + 12
    bx = (w - bw) // 2
    by = 172
    draw.rounded_rectangle((bx, by, bx + bw, by + bh), radius=bh // 2, fill=BLUE)
    tx = bx + (bw - (bb[2] - bb[0])) / 2
    ty = by + (bh - (bb[3] - bb[1])) / 2 - 1
    draw.text((tx, ty), dosage, font=font_badge, fill=WHITE)
    return label


def main():
    l, t, r, b = LABEL_BOX
    for slug, name, dosage in products:
        img = make_blank_master()
        label = render_label(name, dosage)
        img.paste(label, (l, t), label)
        out = os.path.join(OUT_DIR, f"{slug}.png")
        img.save(out, "PNG", optimize=True)
        print(f"saved {out}")

if __name__ == "__main__":
    main()
