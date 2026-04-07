#!/usr/bin/env python3
import json, base64, urllib.request
from pathlib import Path

MODEL = "imagen-4.0-ultra-generate-001"
OUT_DIR = Path("public/images/generated/nonhuman-v10")
OUT_DIR.mkdir(parents=True, exist_ok=True)

JOBS = [
    {
        "slug": "longevity-dna-ribbon",
        "prompt": (
            "Ultra-realistic premium wellness campaign object image of an elegant translucent DNA ribbon sculpture, "
            "soft cream-peach studio backdrop, premium editorial lighting, luxury biotech aesthetic, centered composition, "
            "beautiful glass-like material with subtle pearl highlights, original image only, no text, no logos, no pills, no capsules, no vials, no syringes."
        ),
    },
    {
        "slug": "vitality-glass-orb",
        "prompt": (
            "Ultra-realistic premium wellness campaign object image of a sculptural glowing glass orb with fluid energy swirls inside, "
            "soft sage pastel studio backdrop, luxury editorial lighting, premium brand object photography, centered composition, "
            "beautiful translucent material and subtle reflections, original image only, no text, no logos, no pills, no capsules, no vials, no syringes."
        ),
    },
    {
        "slug": "recovery-peptide-chain",
        "prompt": (
            "Ultra-realistic premium wellness campaign object image of a sculptural peptide-chain form, elegant curved biomorphic structure, "
            "soft pale blue studio backdrop, editorial luxury lighting, premium biotech aesthetic, centered composition, "
            "original image only, high-end brand photography, no text, no logos, no pills, no capsules, no vials, no syringes."
        ),
    },
    {
        "slug": "fatloss-fluid-form",
        "prompt": (
            "Ultra-realistic premium wellness campaign object image of a sleek abstract fluid form suggesting lightness and movement, "
            "soft mint pastel studio backdrop, luxury editorial lighting, premium wellness brand aesthetic, centered composition, "
            "translucent sculptural material, original image only, no text, no logos, no pills, no capsules, no vials, no syringes."
        ),
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
