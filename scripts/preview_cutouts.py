#!/usr/bin/env python3
"""Build a grid preview of all transparent cutouts on checkerboard."""
from PIL import Image
from pathlib import Path

SRC = Path("public/images/transparent")
OUT = Path("/tmp/tg-cutouts-grid.png")

def checkerboard(size, sq=24):
    bg = Image.new("RGB", size, (235,235,235))
    px = bg.load()
    for y in range(size[1]):
        for x in range(size[0]):
            if ((x//sq)+(y//sq)) % 2 == 0:
                px[x,y] = (210,210,210)
    return bg

def main():
    files = sorted([p for p in SRC.iterdir() if p.suffix.lower() == ".png"])
    thumbs = []
    for f in files:
        im = Image.open(f).convert("RGBA")
        # scale to 300px wide max, preserve aspect
        ratio = 300 / im.width
        im = im.resize((300, int(im.height * ratio)))
        bg = checkerboard(im.size)
        bg.paste(im, (0,0), im)
        # add filename caption
        from PIL import ImageDraw
        d = ImageDraw.Draw(bg)
        d.rectangle([0, bg.height-22, bg.width, bg.height], fill=(40,40,40))
        d.text((6, bg.height-18), f.name[:30], fill=(255,255,255))
        thumbs.append(bg)
    # grid 3 columns
    cols = 3
    rows = (len(thumbs) + cols - 1) // cols
    cw = max(t.width for t in thumbs)
    ch = max(t.height for t in thumbs)
    gap = 10
    grid = Image.new("RGB", (cols*cw + (cols+1)*gap, rows*ch + (rows+1)*gap), (250,250,250))
    for i, t in enumerate(thumbs):
        r, c = i // cols, i % cols
        grid.paste(t, (gap + c*(cw+gap), gap + r*(ch+gap)))
    grid.save(OUT)
    print(f"grid saved: {OUT} size {grid.size}")

if __name__ == "__main__":
    main()
