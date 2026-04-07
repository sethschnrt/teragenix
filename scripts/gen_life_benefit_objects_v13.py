#!/usr/bin/env python3
import json, base64, urllib.request
from pathlib import Path

MODEL = 'imagen-4.0-ultra-generate-001'
OUT_DIR = Path('public/images/generated/life-benefits-v13')
OUT_DIR.mkdir(parents=True, exist_ok=True)

JOBS = [
    {
        'slug': 'confidence-jeans-belt',
        'prompt': (
            'Ultra-realistic premium editorial still-life photography representing clothing confidence. '
            'Beautifully folded premium blue jeans with a tan leather belt styled on a minimal white pedestal, '
            'soft mint pastel studio background, luxury wellness brand lighting, clean elegant composition, square image. '
            'High-end commercial photography, original image only. No text, no logos, no pills, no capsules, no vials, no syringes, no medical devices.'
        )
    },
    {
        'slug': 'active-life-pickleball',
        'prompt': (
            'Ultra-realistic premium editorial still-life photography representing an active life. '
            'A clean premium pickleball paddle, two balls, a folded white towel, and a clear water bottle arranged beautifully on a pale blue pastel studio set, '
            'luxury brand lighting, elegant athletic lifestyle composition, square image. '
            'High-end commercial photography, original image only. No text, no logos, no pills, no capsules, no vials, no syringes, no medical devices.'
        )
    },
    {
        'slug': 'healthy-routine-breakfast',
        'prompt': (
            'Ultra-realistic premium editorial still-life photography representing a healthy morning routine. '
            'A sunlit breakfast setup with clear water, coffee, berries, citrus, and a clean linen napkin on a minimal cream pastel studio set, '
            'luxury wellness brand styling, warm morning light, elegant composition, square image. '
            'High-end commercial photography, original image only. No text, no logos, no pills, no capsules, no vials, no syringes, no medical devices.'
        )
    },
    {
        'slug': 'beach-confidence-chair-setup',
        'prompt': (
            'Ultra-realistic premium editorial still-life photography representing confidence at the beach. '
            'A minimal beach chair setup with a draped ivory towel, a stylish pair of sunglasses, and a clean drink glass, '
            'soft warm sand-and-sky pastel studio palette, luxury brand lighting, elegant aspirational composition, square image. '
            'High-end commercial photography, original image only. No text, no logos, no pills, no capsules, no vials, no syringes, no medical devices.'
        )
    },
]

with open('/Users/Rex/.openclaw/workspace/secrets.json') as f:
    API_KEY = json.load(f)['gemini_api_key']

for job in JOBS:
    url = f'https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:predict?key={API_KEY}'
    body = {
        'instances': [{'prompt': job['prompt']}],
        'parameters': {'sampleCount': 1, 'aspectRatio': '1:1'}
    }
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers={'Content-Type': 'application/json'}, method='POST')
    print(f"Generating {job['slug']}...")
    with urllib.request.urlopen(req, timeout=180) as resp:
        result = json.loads(resp.read())
    img = base64.b64decode(result['predictions'][0]['bytesBase64Encoded'])
    out = OUT_DIR / f"{job['slug']}.png"
    out.write_bytes(img)
    print(f"  saved {out}")
