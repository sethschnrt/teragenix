#!/usr/bin/env python3
"""Regenerate hero card objects with CRISP transparent backgrounds using Gemini 2.5 Flash Image."""
import json, base64, urllib.request
from pathlib import Path

MODEL = 'gemini-3-pro-image-preview'
OUT_DIR = Path('public/images/generated/life-benefits-v13-cutout')
OUT_DIR.mkdir(parents=True, exist_ok=True)

JOBS = [
    {
        'slug': 'confidence-jeans-belt',
        'prompt': (
            'Luxury e-commerce product photography on a PURE WHITE seamless background. '
            'A single pair of premium dark-blue denim jeans, folded ONCE flat (like on a retail display shelf) so you see the hem and the clean rectangular folded shape. '
            'A tan leather belt coiled into a neat circle sits centered on top of the folded jeans. '
            'The jeans rest on top of a clean minimalist square white cube pedestal (NOT a ramp, NOT a slanted block — a PERFECT upright cube-shaped white display plinth). '
            'Camera: eye-level front view, NOT from above, so the cube pedestal clearly shows as a 3D cube. '
            'Nothing else in frame. Studio lighting with a soft shadow beneath the cube on the white floor. '
            'Ultra-sharp commercial product shot. NO text, NO logos, NO branding, NO patterns, PURE WHITE BACKGROUND ONLY. '
            'Square 1:1 composition, subject centered, realistic physical proportions.'
        )
    },
    {
        'slug': 'active-life-pickleball',
        'prompt': (
            'Luxury e-commerce product photography on a PURE WHITE seamless background. '
            'A SOLID BLACK pickleball paddle (completely plain matte black surface, NO logos, NO text, NO markings, NO graphics whatsoever) standing upright, '
            'two bright neon-yellow pickleballs resting in front of it, '
            'a neatly folded white cotton gym towel lying flat to the left, '
            'and a simple clear glass water bottle (plain, unbranded) standing upright to the right. '
            'All four objects arranged as a cohesive centered product group. '
            'Camera: eye-level front view. Studio lighting with soft shadows on the white floor. '
            'Ultra-sharp commercial product shot. Absolutely NO text, NO logos, NO branding, NO markings — PURE WHITE BACKGROUND ONLY. '
            'Square 1:1 composition, subject centered, realistic physical proportions.'
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
            'imageConfig': {'aspectRatio': '1:1'}
        }
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode(),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    print(f"Generating {job['slug']}...")
    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            result = json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print(f"  ERROR {e.code}: {e.read().decode()[:500]}")
        continue

    # Extract image from response
    parts = result.get('candidates', [{}])[0].get('content', {}).get('parts', [])
    for part in parts:
        if 'inlineData' in part:
            img_data = base64.b64decode(part['inlineData']['data'])
            out = Path('public/images/generated/life-benefits-v13') / f"{job['slug']}-crisp.png"
            out.write_bytes(img_data)
            print(f"  saved {out} ({len(img_data)} bytes)")
            break
    else:
        print(f"  ERROR: no image in response: {json.dumps(result)[:500]}")
