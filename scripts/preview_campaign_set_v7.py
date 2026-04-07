#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
SRC = Path('public/images/generated/hero-cards-v7')
OUT = Path('/tmp/campaign-set-v7-grid.png')
files = sorted(SRC.glob('*.png'))
thumbs=[]
for f in files:
    im=Image.open(f).convert('RGB')
    im=ImageOps.fit(im,(420,420),method=Image.Resampling.LANCZOS)
    c=Image.new('RGB',(420,460),(248,248,248)); c.paste(im,(0,0))
    d=ImageDraw.Draw(c); d.rectangle([0,420,420,460], fill=(28,28,28)); d.text((14,434), f.stem, fill=(255,255,255))
    thumbs.append(c)
cols=2; W=420; H=460; G=16; rows=(len(thumbs)+1)//2
grid=Image.new('RGB',(cols*W+(cols+1)*G, rows*H+(rows+1)*G),(255,255,255))
for i,t in enumerate(thumbs):
    r,c=divmod(i,2); grid.paste(t,(G+c*(W+G), G+r*(H+G)))
grid.save(OUT); print(OUT)
