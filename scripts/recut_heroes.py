#!/usr/bin/env python3
"""Recut hero cutouts using isnet-general-use for crisp edges."""
import sys
from pathlib import Path
from PIL import Image
from rembg import remove, new_session

ROOT = Path(__file__).resolve().parent.parent
SRC_DIR = ROOT / "public/images/generated/lifestyle-v1"
DST_DIR = ROOT / "public/images/generated/lifestyle-v1-cutout"

# (source_file, dest_file, alpha_matting)
JOBS = [
    ("quality-1-hero.png", "quality-1-hero.png", True),
]

def main():
    session = new_session("isnet-general-use")
    for src, dst, matting in JOBS:
        src_path = SRC_DIR / src
        dst_path = DST_DIR / dst
        print(f"Cutting {src} -> {dst}")
        img = Image.open(src_path).convert("RGBA")
        kwargs = dict(session=session)
        if matting:
            kwargs.update(
                alpha_matting=True,
                alpha_matting_foreground_threshold=270,
                alpha_matting_background_threshold=20,
                alpha_matting_erode_size=11,
            )
        out = remove(img, **kwargs)
        # Tight crop to non-transparent bbox with 12px margin
        bbox = out.getbbox()
        if bbox:
            l, t, r, b = bbox
            pad = 12
            l = max(0, l - pad); t = max(0, t - pad)
            r = min(out.width, r + pad); b = min(out.height, b + pad)
            out = out.crop((l, t, r, b))
        dst_path.parent.mkdir(parents=True, exist_ok=True)
        out.save(dst_path, "PNG", optimize=True)
        print(f"  saved {dst_path.relative_to(ROOT)} ({out.size[0]}x{out.size[1]})")

if __name__ == "__main__":
    main()
