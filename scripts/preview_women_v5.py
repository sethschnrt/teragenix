#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageOps

files = [
    Path('public/images/generated/hero-cards-v5/woman-26-olive-mint.png'),
    Path('public/images/generated/hero-cards-v5/woman-43-auburn-cream.png'),
]
ims=[]
for f in files:
    im=Image.open(f).convert('RGB')
    im=ImageOps.fit(im,(420,420),method=Image.Resampling.LANCZOS)
    ims.append(im)
canvas=Image.new('RGB',(872,420),(255,255,255))
canvas.paste(ims[0],(0,0))
canvas.paste(ims[1],(452,0))
canvas.save('/tmp/women-v5-side-by-side.png')
print('/tmp/women-v5-side-by-side.png')
