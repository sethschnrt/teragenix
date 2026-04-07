#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw

SRC = Path("public/images/generated/hero-cards-v2")
OUT = Path("/tmp/generated-hero-cards-v2-grid.png")
files = sorted(SRC.glob("*.png"))

thumbs = []
for f in files:
    im = Image.open(f).convert("RGB")
    im = ImageOps.fit(im, (420, 420), method=Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (420, 460), (248, 248, 248))
    canvas.paste(im, (0, 0))
    d = ImageDraw.Draw(canvas)
    d.rectangle([0, 420, 420, 460], fill=(28, 28, 28))
    d.text((14, 434), f.stem, fill=(255, 255, 255))
    thumbs.append(canvas)

cols = 2
rows = (len(thumbs) + cols - 1) // cols
W, H, G = 420, 460, 16
grid = Image.new("RGB", (cols*W + (cols+1)*G, rows*H + (rows+1)*G), (255,255,255))
for i, t in enumerate(thumbs):
    r, c = divmod(i, cols)
    grid.paste(t, (G + c*(W+G), G + r*(H+G)))

grid.save(OUT)
print(OUT)
