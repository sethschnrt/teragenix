#!/usr/bin/env python3
import json, base64, urllib.request, urllib.error
from pathlib import Path

MODEL = 'gemini-3-pro-image-preview'
OUT_DIR = Path('/Users/Rex/.openclaw/workspace/teragenix/public/images/generated/lifestyle-v2')
OUT_DIR.mkdir(parents=True, exist_ok=True)

STYLE = (
    " Photorealistic editorial product photography. Premium, clean, modern, magazine-quality. "
    "NO text, NO logos, NO brand names, NO watermarks. High resolution, sharp focus. "
    "All objects fully contained with generous margins. Plain simple background for easy isolation."
)

JOBS = [
    {
        'slug': 'kits-1-hero-alt-a',
        'aspect': '4:5',
        'prompt': (
            "Premium laboratory kit still life on a warm off-white seamless studio background: one open kraft-brown "
            "kit box facing slightly toward camera, with neatly arranged contents visible inside, including two small "
            "clear unmarked glass vials, a sealed reconstitution card, two alcohol pads, and one precision syringe in "
            "sterile packaging beside the box. Composition centered and substantial, filling most of the frame without "
            "touching edges. Soft diffused studio light, elegant shadows, upscale minimalist aesthetic."
            + STYLE
        )
    },
    {
        'slug': 'kits-1-hero-alt-b',
        'aspect': '4:5',
        'prompt': (
            "Editorial product composition on a pale neutral seamless background: two premium kraft-brown kit boxes, "
            "one standing upright and one laid flat, with a small clear vial, a folded white insert card, and a sealed "
            "precision syringe package arranged around them. The arrangement should feel high-end and substantial, like "
            "luxury skincare packaging photography, but for a lab kit. All objects fully visible with clean margins. "
            "Soft warm studio lighting, crisp edges, minimal clutter."
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
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers={'Content-Type': 'application/json'}, method='POST')
    out = OUT_DIR / f"{job['slug']}.png"
    print(f"GEN {job['slug']}...")
    try:
        with urllib.request.urlopen(req, timeout=300) as resp:
            result = json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print(f"ERROR {e.code}: {e.read().decode()[:300]}")
        continue
    parts = result.get('candidates', [{}])[0].get('content', {}).get('parts', [])
    for part in parts:
        if 'inlineData' in part:
            out.write_bytes(base64.b64decode(part['inlineData']['data']))
            print(f"OK -> {out.name}")
            break
    else:
        print(f"ERROR no image")
