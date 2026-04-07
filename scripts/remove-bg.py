#!/usr/bin/env python3
"""
Batch background removal using rembg (U²-Net model).

Usage:
  python3 scripts/remove-bg.py <input_path_or_dir> [output_dir]

Examples:
  # Single file -> public/images/transparent/
  python3 scripts/remove-bg.py public/images/product-bpc157.png

  # Entire folder
  python3 scripts/remove-bg.py ./raw-shots ./public/images/transparent

Defaults:
  - Output directory: public/images/transparent/
  - Keeps original filename (always writes as .png for transparency)
"""
import sys
import os
from pathlib import Path
from rembg import remove, new_session

DEFAULT_OUT = Path("public/images/transparent")
# u2net is general-purpose; alternatives: u2netp (smaller), isnet-general-use (higher quality)
MODEL = os.environ.get("REMBG_MODEL", "u2net")

IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".bmp", ".tiff"}


def process_file(session, src: Path, out_dir: Path) -> Path:
    out_dir.mkdir(parents=True, exist_ok=True)
    dst = out_dir / (src.stem + ".png")
    with open(src, "rb") as f:
        data = f.read()
    result = remove(data, session=session)
    with open(dst, "wb") as f:
        f.write(result)
    return dst


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    src_arg = Path(sys.argv[1])
    out_dir = Path(sys.argv[2]) if len(sys.argv) > 2 else DEFAULT_OUT

    if not src_arg.exists():
        print(f"error: {src_arg} not found", file=sys.stderr)
        sys.exit(1)

    session = new_session(MODEL)

    targets = []
    if src_arg.is_file():
        targets = [src_arg]
    else:
        targets = sorted(p for p in src_arg.rglob("*") if p.is_file() and p.suffix.lower() in IMAGE_EXTS)

    if not targets:
        print(f"no images found in {src_arg}")
        sys.exit(0)

    print(f"processing {len(targets)} file(s) with model '{MODEL}' -> {out_dir}")
    for i, src in enumerate(targets, 1):
        try:
            dst = process_file(session, src, out_dir)
            print(f"  [{i}/{len(targets)}] {src.name} -> {dst}")
        except Exception as e:
            print(f"  [{i}/{len(targets)}] FAIL {src.name}: {e}", file=sys.stderr)

    print("done.")


if __name__ == "__main__":
    main()
