#!/usr/bin/env python3
import json, base64, urllib.request
from pathlib import Path

MODEL = "imagen-4.0-ultra-generate-001"
OUT_DIR = Path("public/images/generated/hero-cards-v9")
OUT_DIR.mkdir(parents=True, exist_ok=True)

JOBS = [
    {
        "slug": "woman-21-mint-lean",
        "prompt": (
            "Ultra-realistic premium wellness campaign image of an attractive adult woman age 21. "
            "Fresh youthful energy, dark brown wavy shoulder-length hair, warm expressive eyes, healthy believable skin texture. "
            "Show upper torso and both arms, slight playful lean, body angled left, head turned toward camera, soft confident smile. "
            "Ivory ribbed knit top with subtle texture, mint pastel studio background, softly diffused editorial lighting, luxury brand campaign quality, square composition. "
            "Original image only. No resemblance to any real campaign. No text, logos, pills, capsules, vials, syringes, or medical devices. No stock-photo look."
        ),
    },
    {
        "slug": "man-33-blue-halfturn",
        "prompt": (
            "Ultra-realistic premium wellness campaign image of an attractive adult man age 33. "
            "Light olive skin, short dark hair, subtle stubble, relaxed confident expression, believable skin texture and natural asymmetry. "
            "Show upper torso and one hand partially visible, body turned three-quarters right, shoulders dynamic not square to camera. "
            "Soft pale blue studio background, refined cream overshirt over knit tee, softly diffused editorial lighting, luxury brand campaign quality, square composition. "
            "Original image only. No resemblance to any real campaign. No text, logos, pills, capsules, vials, syringes, or medical devices. No stock-photo look."
        ),
    },
    {
        "slug": "woman-47-cream-seated",
        "prompt": (
            "Ultra-realistic premium wellness campaign image of an attractive adult woman age 47. "
            "Honey-blonde shoulder-length hair, blue-green eyes, light freckles, elegant healthy appearance, believable skin texture. "
            "Show seated pose on a minimal white cube or stool, visible forearms and hands, torso angled slightly right, calm confident smile. "
            "Cream-peach pastel studio background, elevated ivory collared knit set, softly diffused editorial lighting, luxury brand campaign quality, square composition. "
            "Original image only. No resemblance to any real campaign. No text, logos, pills, capsules, vials, syringes, or medical devices. No stock-photo look."
        ),
    },
    {
        "slug": "man-58-sage-standing",
        "prompt": (
            "Ultra-realistic premium wellness campaign image of an attractive adult man age 58. "
            "Salt-and-pepper hair, light beard, medium tan skin, charismatic warm smile, believable skin texture. "
            "Show upper torso with one arm bent and hand near waist, body angled left, more fashion-editorial than headshot. "
            "Soft sage pastel studio background, lightweight sage knit sweater layered over white tee, softly diffused editorial lighting, luxury brand campaign quality, square composition. "
            "Original image only. No resemblance to any real campaign. No text, logos, pills, capsules, vials, syringes, or medical devices. No stock-photo look."
        ),
    },
]

with open('/Users/Rex/.openclaw/workspace/secrets.json') as f:
    API_KEY = json.load(f)['gemini_api_key']

for job in JOBS:
    url = f'https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:predict?key={API_KEY}'
    body = {
        'instances': [{'prompt': job['prompt']}],
        'parameters': {'sampleCount': 1, 'aspectRatio': '1:1', 'personGeneration': 'allow_adult'}
    }
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers={'Content-Type': 'application/json'}, method='POST')
    print(f"Generating {job['slug']}...")
    with urllib.request.urlopen(req, timeout=180) as resp:
        result = json.loads(resp.read())
    img = base64.b64decode(result['predictions'][0]['bytesBase64Encoded'])
    out = OUT_DIR / f"{job['slug']}.png"
    out.write_bytes(img)
    print(f"  saved {out}")
