#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path('public/images')
OUT = Path('/tmp/hero-card-options-v10.png')

OPTIONS = [
    {
        'title': 'Option 1 · 3 humans + 1 object',
        'cards': [
            ('generated/hero-cards-v9-cutout/woman-21-mint-lean.png', 'Fat Loss', (241,248,242), 236),
            ('generated/hero-cards-v9-cutout/man-33-blue-halfturn.png', 'Recovery', (244,247,250), 228),
            ('generated/nonhuman-v10-cutout/longevity-dna-ribbon.png', 'Longevity', (251,246,240), 184),
            ('generated/hero-cards-v9-cutout/man-58-sage-standing.png', 'Vitality', (239,246,242), 228),
        ],
    },
    {
        'title': 'Option 2 · 2 humans + 2 objects',
        'cards': [
            ('generated/hero-cards-v9-cutout/woman-21-mint-lean.png', 'Fat Loss', (241,248,242), 236),
            ('generated/hero-cards-v9-cutout/man-33-blue-halfturn.png', 'Recovery', (244,247,250), 228),
            ('generated/nonhuman-v10-cutout/longevity-dna-ribbon.png', 'Longevity', (251,246,240), 184),
            ('generated/nonhuman-v10-cutout/vitality-glass-orb.png', 'Vitality', (239,246,242), 168),
        ],
    },
    {
        'title': 'Option 3 · bolder / less human',
        'cards': [
            ('generated/nonhuman-v10-cutout/fatloss-fluid-form.png', 'Fat Loss', (241,248,242), 178),
            ('generated/hero-cards-v9-cutout/man-33-blue-halfturn.png', 'Recovery', (244,247,250), 228),
            ('generated/hero-cards-v9-cutout/woman-47-cream-seated.png', 'Longevity', (251,246,240), 228),
            ('generated/nonhuman-v10-cutout/vitality-glass-orb.png', 'Vitality', (239,246,242), 168),
        ],
    },
]

CARD_W, CARD_H = 228, 244
GAP = 16
TRAY_PAD = 16
LABEL_H = 56
CANVAS_W = TRAY_PAD*2 + CARD_W*4 + GAP*3 + 24
ROW_H = 360
CANVAS_H = 24 + ROW_H*len(OPTIONS)
canvas = Image.new('RGB', (CANVAS_W, CANVAS_H), (250,251,252))
d = ImageDraw.Draw(canvas)

def draw_option(y0, option):
    d.text((24, y0), option['title'], fill=(28,28,28))
    tray_x = 12
    tray_y = y0 + 28
    tray_w = CANVAS_W - 24
    tray_h = 286
    d.rounded_rectangle((tray_x, tray_y, tray_x+tray_w, tray_y+tray_h), radius=28, fill=(255,255,255), outline=(237,241,245), width=2)
    start_x = tray_x + 16
    for i, (rel_path, label, pastel, target_h) in enumerate(option['cards']):
        x = start_x + i*(CARD_W+GAP)
        y = tray_y + 22
        d.rounded_rectangle((x,y,x+CARD_W,y+CARD_H), radius=22, fill=(255,255,255))
        d.rounded_rectangle((x,y+16,x+CARD_W,y+16+160), radius=22, fill=pastel)
        d.rectangle((x,y+60,x+CARD_W,y+176), fill=pastel)
        label_y = y + CARD_H - LABEL_H
        d.rounded_rectangle((x,label_y,x+CARD_W,y+CARD_H), radius=18, fill=(242,243,243))
        d.rectangle((x,label_y,x+CARD_W,y+CARD_H), fill=(242,243,243))
        d.text((x+18, label_y+20), label, fill=(36,34,32))
        ax = x + CARD_W - 30
        ay = label_y + 28
        d.line((ax-10, ay, ax+8, ay), fill=(36,34,32), width=2)
        d.line((ax+2, ay-6, ax+8, ay), fill=(36,34,32), width=2)
        d.line((ax+2, ay+6, ax+8, ay), fill=(36,34,32), width=2)

        im = Image.open(ROOT / rel_path).convert('RGBA')
        ratio = target_h / im.height
        im = im.resize((int(im.width*ratio), target_h))
        px = x + (CARD_W - im.width)//2
        py = y - 54
        canvas.paste(im, (px, py), im)

for idx, option in enumerate(OPTIONS):
    draw_option(24 + idx*ROW_H, option)

canvas.save(OUT)
print(OUT)
