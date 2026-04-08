#!/usr/bin/env python3
"""Regenerate hero card objects with CRISP transparent backgrounds using Gemini 2.5 Flash Image."""
import json, base64, urllib.request
from pathlib import Path

MODEL = 'gemini-3-pro-image-preview'
OUT_DIR = Path('public/images/generated/life-benefits-v13-cutout')
OUT_DIR.mkdir(parents=True, exist_ok=True)

JOBS = [
    {
        'slug': 'active-life-pickleball',
        'prompt': (
            'Premium editorial commercial product photography on a PURE WHITE seamless studio background. '
            'A clean modern pickleball paddle with a matte light-blue face and a black wrapped grip, leaning upright against a small folded white cotton gym towel on the LEFT side. '
            'Two bright neon-yellow pickleballs resting on the floor in front of the paddle. '
            'A simple plain unbranded clear glass water bottle with a polished silver cap standing upright on the RIGHT side. '
            'All objects grouped tightly together as one cohesive athletic still life, professionally arranged, centered in the frame. '
            'Camera: slightly elevated front view (about 15 degrees), so you can see the tops of the balls and the cap of the bottle. '
            'Studio lighting with soft natural shadows on the white floor beneath each item. '
            'Ultra-sharp focus, high-end magazine quality, photorealistic, NO text, NO logos, NO brand markings of any kind, NO patterns, '
            'PURE WHITE seamless background ONLY — white wall + white floor with no visible horizon line. '
            'Square 1:1 composition. Realistic physical proportions and lighting.'
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
