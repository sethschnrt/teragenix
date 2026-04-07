#!/usr/bin/env python3
"""Remove backgrounds from all images in public/images/ -> public/images/transparent/"""
from pathlib import Path
from rembg import remove, new_session

SRC_DIR = Path("public/images")
OUT_DIR = Path("public/images/transparent")
SKIP_FILES = {
    "teragenix-logo.png", "teragenix-logo-raw.png",
    "teragenix-logo-dark.png", "teragenix-logo-light.png",
}
EXTS = {".png", ".jpg", ".jpeg", ".webp"}

def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    session = new_session("u2net")
    files = [p for p in SRC_DIR.iterdir()
             if p.is_file() and p.suffix.lower() in EXTS and p.name not in SKIP_FILES]
    print(f"processing {len(files)} files")
    for i, src in enumerate(files, 1):
        dst = OUT_DIR / (src.stem + ".png")
        with open(src, "rb") as f:
            data = f.read()
        out = remove(data, session=session)
        with open(dst, "wb") as f:
            f.write(out)
        print(f"  [{i}/{len(files)}] {src.name} -> {dst}")
    print("done")

if __name__ == "__main__":
    main()
