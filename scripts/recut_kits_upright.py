#!/usr/bin/env python3
from pathlib import Path
from PIL import Image
from rembg import remove, new_session
root = Path('/Users/Rex/.openclaw/workspace/teragenix')
src = root / 'public/images/generated/medvi-style-v2/kits-hero.png'
dst = root / 'public/images/generated/lifestyle-v1-cutout/kits-1-hero.png'
img = Image.open(src).convert('RGBA')
out = remove(img, session=new_session('isnet-general-use'))
bbox = out.getbbox()
if bbox:
    l,t,r,b = bbox
    pad = 6
    out = out.crop((max(0,l-pad), max(0,t-pad), min(out.width,r+pad), min(out.height,b+pad)))
out.save(dst, 'PNG', optimize=True)
print(dst)
