#!/usr/bin/env python3
"""Background-remove the life-benefits-v13 images into a cutout folder."""
from pathlib import Path
from rembg import remove, new_session

SRC = Path("public/images/generated/life-benefits-v13")
OUT = Path("public/images/generated/life-benefits-v13-cutout")
OUT.mkdir(parents=True, exist_ok=True)

# u2net is best general-purpose. For humans, u2net_human_seg. For mixed,
# isnet-general-use gives the cleanest alpha.
session = new_session("isnet-general-use")

for src in sorted(SRC.glob("*.png")):
    dst = OUT / src.name
    dst.write_bytes(remove(src.read_bytes(), session=session))
    print(dst)
