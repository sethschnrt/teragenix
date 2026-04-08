#!/usr/bin/env python3
from pathlib import Path
from PIL import Image
from rembg import remove, new_session

ROOT = Path('/Users/Rex/.openclaw/workspace/teragenix')
SRC = ROOT / 'public/images/generated/refresh-v1'
DST = ROOT / 'public/images/generated/lifestyle-v1-cutout'
DST.mkdir(parents=True, exist_ok=True)

session = new_session('isnet-general-use')

for name in ['metabolic-hero', 'kits-hero']:
    src = SRC / f'{name}.png'
    dst = DST / f"{'metabolic-1-hero' if name == 'metabolic-hero' else 'kits-1-hero'}.png"
    img = Image.open(src).convert('RGBA')
    out = remove(img, session=session, alpha_matting=True, alpha_matting_foreground_threshold=240, alpha_matting_background_threshold=15, alpha_matting_erode_size=5)
    bbox = out.getbbox()
    if bbox:
        l, t, r, b = bbox
        pad = 12
        out = out.crop((max(0, l - pad), max(0, t - pad), min(out.width, r + pad), min(out.height, b + pad)))
    out.save(dst, 'PNG', optimize=True)
    print(dst)
