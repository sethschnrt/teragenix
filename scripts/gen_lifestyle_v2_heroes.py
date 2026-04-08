#!/usr/bin/env python3
"""Generate fresh hero source photos for recovery and kits.
Requirements:
- subject fully contained with margin (no limbs touching frame edges)
- clean simple backgrounds that cut out crisply
- unique from the twin-frame photos
"""
import json, base64, urllib.request, urllib.error
from pathlib import Path

MODEL = 'gemini-3-pro-image-preview'
OUT_DIR = Path('/Users/Rex/.openclaw/workspace/teragenix/public/images/generated/lifestyle-v2')
OUT_DIR.mkdir(parents=True, exist_ok=True)

STYLE = (
    " Photorealistic editorial photography. Natural soft lighting, warm authentic colors, "
    "magazine-quality. NO text, NO logos, NO brand names, NO watermarks. High resolution, sharp focus. "
    "CRITICAL: entire subject fully contained in frame with at least 15 percent margin on ALL sides. "
    "No body parts, objects, or limbs touching or cropped by any edge of the frame. "
    "Clean uncluttered simple background for easy subject isolation."
)

JOBS = [
    {
        'slug': 'recovery-1-hero',
        'aspect': '4:5',
        'prompt': (
            "A fit athletic man in his mid-30s standing upright and relaxed on a plain light neutral studio background, "
            "wearing a gray fitted performance tee and black athletic shorts, holding a rolled yoga mat under one arm, "
            "looking confidently slightly off-camera with a calm half-smile. Full body visible from head to feet with "
            "generous space all around him. Soft even studio lighting, plain pale gray seamless backdrop, minimal shadows."
            + STYLE
        )
    },
    {
        'slug': 'kits-1-hero',
        'aspect': '4:5',
        'prompt': (
            "Editorial product still life: a single premium sealed kraft-brown kit box standing upright (slightly "
            "angled three-quarter view) with a neatly folded white linen cloth beside it, a small clear unmarked glass "
            "vial standing to the right, and a subtle small green sprig for accent. Arranged centrally on a clean "
            "warm off-white seamless surface. Soft diffused studio lighting from the upper left. All objects well "
            "inside the frame with generous margins on all sides. Vertical composition."
            + STYLE
        )
    },
]

with open('/Users/Rex/.openclaw/workspace/secrets.json') as f:
    API_KEY = json.load(f)['gemini_api_key']

for job in JOBS:
    url = f'https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}'
    body = {
        'contents': [{'parts': [{'text': job['prompt']}]}],
        'generationConfig': {
            'responseModalities': ['IMAGE'],
            'imageConfig': {'aspectRatio': job['aspect']}
        }
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode(),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    out = OUT_DIR / f"{job['slug']}.png"
    print(f"GEN  {job['slug']} ({job['aspect']})...")
    try:
        with urllib.request.urlopen(req, timeout=300) as resp:
            result = json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print(f"  ERROR {e.code}: {e.read().decode()[:300]}")
        continue
    except Exception as e:
        print(f"  ERROR: {e}")
        continue

    parts = result.get('candidates', [{}])[0].get('content', {}).get('parts', [])
    for part in parts:
        if 'inlineData' in part:
            img_data = base64.b64decode(part['inlineData']['data'])
            out.write_bytes(img_data)
            print(f"  OK {len(img_data)} bytes -> {out.name}")
            break
    else:
        print(f"  ERROR: no image in response: {json.dumps(result)[:300]}")

print("\nDone.")
