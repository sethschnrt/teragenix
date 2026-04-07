#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageDraw

CUTOUT_DIR = Path("public/images/generated/hero-cards-v4-cutout")
OUT = Path("/tmp/medvi-card-mockup-v4.png")

cards = [
    ("woman-27-mint.png", "Fat Loss", (241,248,242)),
    ("man-32-blue.png", "Recovery", (244,247,250)),
    ("woman-41-cream.png", "Longevity", (251,246,240)),
    ("man-49-sage.png", "Vitality", (240,246,242)),
]

CARD_W, CARD_H = 240, 290
PASTEL_H = 180
WHITE_GAP = 12
LABEL_H = 54
BOTTOM_GAP = 12
R = 22
OUTER_PAD = 18
GAP = 18
canvas = Image.new("RGB", (OUTER_PAD*2 + CARD_W*4 + GAP*3, 360), (255,255,255))
d = ImageDraw.Draw(canvas)

# outer white tray
tray = (10, 20, canvas.width-10, 340)
d.rounded_rectangle(tray, radius=26, fill=(255,255,255))

for i, (filename, label, pastel) in enumerate(cards):
    x = OUTER_PAD + i*(CARD_W + GAP)
    y = 35
    # card body white
    d.rounded_rectangle((x, y, x+CARD_W, y+CARD_H), radius=R, fill=(255,255,255))
    # pastel panel
    d.rounded_rectangle((x, y+14, x+CARD_W, y+14+PASTEL_H), radius=R, fill=pastel)
    # flatten bottom of pastel panel by covering corners to mimic attached section
    d.rectangle((x, y+14+40, x+CARD_W, y+14+PASTEL_H), fill=pastel)
    # label area light grey
    label_y = y + 14 + PASTEL_H + WHITE_GAP
    d.rounded_rectangle((x+12, label_y, x+CARD_W-12, label_y+LABEL_H), radius=18, fill=(242,243,243))
    d.text((x+28, label_y+18), label, fill=(36,34,32))
    # arrow
    ax = x + CARD_W - 40; ay = label_y + 27
    d.line((ax-10, ay, ax+8, ay), fill=(36,34,32), width=2)
    d.line((ax+2, ay-6, ax+8, ay), fill=(36,34,32), width=2)
    d.line((ax+2, ay+6, ax+8, ay), fill=(36,34,32), width=2)
    # cutout subject overlapping top
    im = Image.open(CUTOUT_DIR / filename).convert('RGBA')
    # scale based on subject
    thumb = im.copy()
    if 'woman-27' in filename:
        target_h = 230
    elif 'woman-41' in filename:
        target_h = 220
    elif 'man-49' in filename:
        target_h = 225
    else:
        target_h = 220
    ratio = target_h / thumb.height
    thumb = thumb.resize((int(thumb.width*ratio), target_h))
    px = x + (CARD_W - thumb.width)//2
    py = y - 6
    canvas.paste(thumb, (px, py), thumb)

canvas.save(OUT)
print(OUT)
