#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageDraw

SRC = Path("public/images/generated/hero-cards-v2-cutout")
OUT = Path("/tmp/generated-hero-cards-v2-cutouts-grid.png")
files = sorted(SRC.glob("*.png"))

def checker(size, sq=24):
    bg = Image.new("RGB", size, (235,235,235))
    px = bg.load()
    for y in range(size[1]):
        for x in range(size[0]):
            if ((x//sq)+(y//sq)) % 2 == 0:
                px[x,y] = (210,210,210)
    return bg

thumbs = []
for f in files:
    im = Image.open(f).convert("RGBA")
    thumb = im.copy()
    thumb.thumbnail((420,420))
    bg = checker((420,420))
    x = (420 - thumb.width)//2
    y = (420 - thumb.height)//2
    bg.paste(thumb, (x,y), thumb)
    canvas = Image.new("RGB", (420, 460), (248,248,248))
    canvas.paste(bg, (0,0))
    d = ImageDraw.Draw(canvas)
    d.rectangle([0,420,420,460], fill=(28,28,28))
    d.text((14,434), f.stem, fill=(255,255,255))
    thumbs.append(canvas)

cols = 2
rows = (len(thumbs)+1)//2
W,H,G = 420,460,16
grid = Image.new("RGB", (cols*W + (cols+1)*G, rows*H + (rows+1)*G), (255,255,255))
for i,t in enumerate(thumbs):
    r,c = divmod(i,2)
    grid.paste(t, (G + c*(W+G), G + r*(H+G)))

grid.save(OUT)
print(OUT)
