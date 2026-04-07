#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
files = [
    Path('public/images/generated/life-benefits-v13/confidence-jeans-belt.png'),
    Path('public/images/generated/life-benefits-v13/active-life-pickleball.png'),
    Path('public/images/generated/life-benefits-v13/healthy-routine-breakfast.png'),
    Path('public/images/generated/life-benefits-v13/beach-confidence-chair-setup.png'),
]
OUT = Path('/tmp/life-benefits-full-v13.png')
thumbs=[]
for f in files:
    im=Image.open(f).convert('RGB')
    im=ImageOps.fit(im,(360,360),method=Image.Resampling.LANCZOS)
    c=Image.new('RGB',(360,402),(248,248,248)); c.paste(im,(0,0))
    d=ImageDraw.Draw(c); d.rectangle([0,360,360,402], fill=(28,28,28)); d.text((10,374), f.stem[:34], fill=(255,255,255))
    thumbs.append(c)
cols=2; W=360; H=402; G=16; rows=2
grid=Image.new('RGB',(cols*W+(cols+1)*G, rows*H+(rows+1)*G),(255,255,255))
for i,t in enumerate(thumbs):
    r,c=divmod(i,2); grid.paste(t,(G+c*(W+G), G+r*(H+G)))
grid.save(OUT); print(OUT)
