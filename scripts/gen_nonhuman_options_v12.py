#!/usr/bin/env python3
import json, base64, urllib.request
from pathlib import Path

MODEL = 'imagen-4.0-ultra-generate-001'
OUT_DIR = Path('public/images/generated/nonhuman-v12')
OUT_DIR.mkdir(parents=True, exist_ok=True)

JOBS = [
    {
        'slug': 'option-1-knit-water-sage',
        'prompt': (
            'Ultra-realistic premium wellness editorial still-life photography. '
            'Folded ivory ribbed knit draped over a minimal white pedestal beside a clear glass of water with condensation, '
            'soft sage pastel studio background, luxury brand styling, softly diffused editorial lighting, elegant composition, square image. '
            'Clean, premium, believable, not abstract CGI art. No text, no logos, no pills, no capsules, no vials, no syringes, no medical devices.'
        )
    },
    {
        'slug': 'option-2-stone-water-cream',
        'prompt': (
            'Ultra-realistic premium wellness editorial still-life photography. '
            'A smooth cream stone pedestal, a modern clear water glass, and a softly folded ivory towel, '
            'warm cream-peach pastel studio background, elevated spa-luxury styling, premium commercial lighting, square image. '
            'Original image only, clean and believable. No text, no logos, no pills, no capsules, no vials, no syringes, no medical devices.'
        )
    },
    {
        'slug': 'option-3-white-chair-knit-mint',
        'prompt': (
            'Ultra-realistic premium wellness editorial still-life photography. '
            'A sculptural white chair with a soft ivory knit sweater draped over the back, on a mint pastel seamless studio backdrop, '
            'luxury brand campaign styling, softly diffused editorial lighting, clean minimal composition, square image. '
            'Original image only. No text, no logos, no pills, no capsules, no vials, no syringes, no medical devices.'
        )
    },
    {
        'slug': 'option-4-ceramic-bowl-water-blue',
        'prompt': (
            'Ultra-realistic premium wellness editorial still-life photography. '
            'A matte white ceramic bowl, a crystal-clear tumbler of water, and a folded ivory cloth on a pale blue pastel studio set, '
            'high-end wellness brand styling, softly diffused editorial lighting, elegant minimal composition, square image. '
            'Original image only, clean and believable. No text, no logos, no pills, no capsules, no vials, no syringes, no medical devices.'
        )
    },
    {
        'slug': 'option-5-linen-pedestal-cream',
        'prompt': (
            'Ultra-realistic premium wellness editorial still-life photography. '
            'Soft ivory linen folded on a rounded white pedestal with subtle shadows and airy cream-peach pastel studio background, '
            'luxury skincare and wellness brand styling, softly diffused editorial lighting, elegant minimal composition, square image. '
            'Original image only. No text, no logos, no pills, no capsules, no vials, no syringes, no medical devices.'
        )
    },
    {
        'slug': 'option-6-water-carafe-sage',
        'prompt': (
            'Ultra-realistic premium wellness editorial still-life photography. '
            'A small elegant clear water carafe and tumbler on a white pedestal with soft ivory fabric, sage pastel studio background, '
            'premium brand campaign styling, softly diffused editorial lighting, clean minimal composition, square image. '
            'Original image only, believable and premium. No text, no logos, no pills, no capsules, no vials, no syringes, no medical devices.'
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
