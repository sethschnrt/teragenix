#!/usr/bin/env python3
"""Background-remove the 4 hero lifestyle photos so subjects sit on the halo circle."""
from pathlib import Path
from rembg import remove, new_session

src_dir = Path("public/images/generated/lifestyle-v1")
out_dir = Path("public/images/generated/lifestyle-v1-cutout")
out_dir.mkdir(parents=True, exist_ok=True)

heroes = [
    "metabolic-1-hero.png",
    "recovery-1-hero.png",
    "kits-1-hero.png",
    "quality-1-hero.png",
]

session = new_session("isnet-general-use")

for fname in heroes:
    src = src_dir / fname
    out = out_dir / fname
    if not src.exists():
        print(f"MISSING {src}")
        continue
    print(f"BG-REMOVE {fname}...")
    data = src.read_bytes()
    result = remove(data, session=session)
    out.write_bytes(result)
    print(f"  OK -> {out}")

print("Done.")
