#!/usr/bin/env python3
from pathlib import Path
from rembg import remove, new_session

SRC = Path("public/images/generated/hero-cards-v4")
OUT = Path("public/images/generated/hero-cards-v4-cutout")
OUT.mkdir(parents=True, exist_ok=True)
session = new_session("u2net")

files = sorted(SRC.glob("*.png"))
for i, src in enumerate(files, 1):
    dst = OUT / src.name
    dst.write_bytes(remove(src.read_bytes(), session=session))
    print(f"[{i}/{len(files)}] {src.name} -> {dst}")
print('done')
