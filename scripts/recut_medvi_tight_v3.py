#!/usr/bin/env python3
from pathlib import Path
from PIL import Image
from rembg import remove, new_session

root = Path('/Users/Rex/.openclaw/workspace/teragenix')
src_dir = root / 'public/images/generated/medvi-style-v3'
dst_dir = root / 'public/images/generated/lifestyle-v1-cutout'
session = new_session('isnet-general-use')

jobs = [
    ('metabolic-hero.png', 'metabolic-1-hero.png'),
    ('recovery-hero.png', 'recovery-1-hero.png'),
    ('quality-hero.png', 'quality-1-hero.png'),
    ('kits-hero.png', 'kits-1-hero.png'),
]

for src_name, dst_name in jobs:
    img = Image.open(src_dir / src_name).convert('RGBA')
    out = remove(img, session=session)
    bbox = out.getbbox()
    if bbox:
        l, t, r, b = bbox
        pad = 4
        out = out.crop((max(0, l - pad), max(0, t - pad), min(out.width, r + pad), min(out.height, b + pad)))
    out.save(dst_dir / dst_name, 'PNG', optimize=True)
    print(dst_name, out.size)
