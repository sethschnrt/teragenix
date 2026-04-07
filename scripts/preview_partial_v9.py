#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
files = [Path('public/images/generated/hero-cards-v9/woman-21-mint-lean.png'), Path('public/images/generated/hero-cards-v9/man-33-blue-halfturn.png')]
ims=[]
for f in files:
    im=Image.open(f).convert('RGB')
    im=ImageOps.fit(im,(420,420),method=Image.Resampling.LANCZOS)
    ims.append(im)
canvas=Image.new('RGB',(872,420),(255,255,255))
canvas.paste(ims[0],(0,0)); canvas.paste(ims[1],(452,0))
canvas.save('/tmp/partial-v9.png'); print('/tmp/partial-v9.png')
