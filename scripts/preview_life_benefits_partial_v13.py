#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
files = [
    Path('public/images/generated/life-benefits-v13/confidence-jeans-belt.png'),
    Path('public/images/generated/life-benefits-v13/active-life-pickleball.png'),
    Path('public/images/generated/life-benefits-v13/healthy-routine-breakfast.png'),
]
OUT = Path('/tmp/life-benefits-partial-v13.png')
thumbs=[]
for f in files:
    im=Image.open(f).convert('RGB')
    im=ImageOps.fit(im,(360,360),method=Image.Resampling.LANCZOS)
    c=Image.new('RGB',(360,402),(248,248,248)); c.paste(im,(0,0))
    d=ImageDraw.Draw(c); d.rectangle([0,360,360,402], fill=(28,28,28)); d.text((10,374), f.stem[:34], fill=(255,255,255))
    thumbs.append(c)
W=360; H=402; G=16
grid=Image.new('RGB',(3*W+4*G,H+2*G),(255,255,255))
for i,t in enumerate(thumbs):
    grid.paste(t,(G+i*(W+G),G))
grid.save(OUT); print(OUT)
