#!/usr/bin/env python3
from pathlib import Path
from rembg import remove, new_session
SRC = Path('public/images/generated/hero-cards-v9')
OUT = Path('public/images/generated/hero-cards-v9-cutout')
OUT.mkdir(parents=True, exist_ok=True)
session = new_session('u2net')
for src in sorted(SRC.glob('*.png')):
    dst = OUT / src.name
    dst.write_bytes(remove(src.read_bytes(), session=session))
    print(dst)
