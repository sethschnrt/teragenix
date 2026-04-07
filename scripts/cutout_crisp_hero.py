#!/usr/bin/env python3
"""Remove white background from crisp generated images and center in square canvas."""
from PIL import Image, ImageFilter
import numpy as np
from rembg import remove, new_session
from pathlib import Path
import io

session = new_session("isnet-general-use")

JOBS = [
    ("confidence-jeans-belt-crisp.png", "confidence-jeans-belt.png"),
    ("active-life-pickleball-crisp.png", "active-life-pickleball.png"),
]

for src_name, dst_name in JOBS:
    src = Path("public/images/generated/life-benefits-v13") / src_name
    dst = Path("public/images/generated/life-benefits-v13-cutout") / dst_name
    print(f"Processing {src_name}...")

    with open(src, "rb") as f:
        data = f.read()

    # Alpha matting for sharp edges (works great on white backgrounds)
    # Use simpler removal (no alpha matting) — avoids eating into white towels / light subjects
    result = remove(data, session=session)

    img = Image.open(io.BytesIO(result)).convert("RGBA")

    # Remove any isolated fragments (keep only biggest connected component)
    arr = np.array(img)
    alpha = arr[..., 3]
    from scipy import ndimage
    binary = alpha > 64
    labels, num = ndimage.label(binary)
    if num > 1:
        sizes = ndimage.sum(binary, labels, range(1, num + 1))
        biggest = np.argmax(sizes) + 1
        # Keep components larger than 1% of main component
        threshold = sizes[biggest - 1] * 0.01
        keep = np.where(sizes >= threshold)[0] + 1
        mask = np.isin(labels, keep)
        arr[~mask, 3] = 0
        img = Image.fromarray(arr)
        print(f"  {num} components, kept {len(keep)}")

    # Crop to content and center in square canvas
    bbox = img.getbbox()
    if not bbox:
        print(f"  WARN: empty bbox")
        continue
    cropped = img.crop(bbox)
    cw, ch = cropped.size
    max_dim = max(cw, ch)
    pad = int(max_dim * 0.08)
    canvas_size = max_dim + 2 * pad
    canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    px = (canvas_size - cw) // 2
    py = (canvas_size - ch) // 2
    canvas.paste(cropped, (px, py), cropped)
    canvas = canvas.resize((1024, 1024), Image.LANCZOS)
    canvas.save(dst)

    final = Image.open(dst).convert("RGBA")
    fbbox = final.getbbox()
    if fbbox:
        cx = (fbbox[0] + fbbox[2]) / 2
        cy = (fbbox[1] + fbbox[3]) / 2
        print(f"  saved {dst}, center=({cx:.0f},{cy:.0f})")
