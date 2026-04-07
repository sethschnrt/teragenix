#!/usr/bin/env python3
from pathlib import Path
from rembg import remove, new_session
src = Path('public/images/generated/hero-cards-v8/right-man-original.png')
out = Path('public/images/generated/hero-cards-v8-cutout/right-man-original.png')
out.parent.mkdir(parents=True, exist_ok=True)
out.write_bytes(remove(src.read_bytes(), session=new_session('u2net')))
print(out)
