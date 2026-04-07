#!/usr/bin/env python3
import json, base64, urllib.request
from pathlib import Path

MODEL = "gemini-2.5-flash-image"
OUT_DIR = Path("public/images/generated/hero-cards-v7")
OUT_DIR.mkdir(parents=True, exist_ok=True)

JOBS = [
    {
        "slug": "woman-25-mint-3q",
        "ref": "/tmp/medvi-refs/card-womens.png",
        "prompt": (
            "Use the attached reference image only for realism level, softness, and premium wellness brand style. Generate a NEW original image, not a copy. "
            "Create a very realistic premium AI campaign portrait of an attractive adult woman age 25 with olive skin, dark brown wavy bob, warm brown eyes, and a soft confident smile. "
            "3/4 torso crop, not a straight-on passport headshot, body angled slightly left while eyes face camera, centered subject, soft mint pastel background, ivory knit top, believable skin texture, natural asymmetry, softly diffused editorial lighting, luxury wellness brand quality, square composition. "
            "No text, no logos, no pills, no capsules, no vials, no syringes, no medical devices, no stock-photo look, no corporate headshot look."
        ),
    },
    {
        "slug": "man-31-blue-3q",
        "ref": "/tmp/medvi-refs/card-mens.png",
        "prompt": (
            "Use the attached reference image only for realism level, softness, and premium wellness brand style. Generate a NEW original image, not a copy. "
            "Create a very realistic premium AI campaign portrait of an attractive adult man age 31 with light olive skin, short dark hair, light stubble, expressive brown eyes, and a relaxed confident expression. "
            "3/4 torso crop, body angled slightly right while eyes face camera, centered subject, soft pale blue pastel background, premium cream knit shirt, believable skin texture, natural asymmetry, softly diffused editorial lighting, luxury wellness brand quality, square composition. "
            "No text, no logos, no pills, no capsules, no vials, no syringes, no medical devices, no stock-photo look, no corporate headshot look."
        ),
    },
    {
        "slug": "woman-44-cream-3q",
        "ref": "/tmp/medvi-refs/card-womens.png",
        "prompt": (
            "Use the attached reference image only for realism level, softness, and premium wellness brand style. Generate a NEW original image, not a copy. "
            "Create a very realistic premium AI campaign portrait of an attractive adult woman age 44 with fair warm skin, blue-green eyes, light freckles, honey-blonde shoulder-length hair, and an understated confident smile. "
            "3/4 torso crop, body angled slightly right, centered subject, warm cream-peach pastel background, elegant ivory collared knit top, believable skin texture, natural asymmetry, softly diffused editorial lighting, luxury wellness brand quality, square composition. "
            "No text, no logos, no pills, no capsules, no vials, no syringes, no medical devices, no stock-photo look, no corporate headshot look."
        ),
    },
    {
        "slug": "man-52-sage-3q",
        "ref": "/tmp/medvi-refs/card-mens.png",
        "prompt": (
            "Use the attached reference image only for realism level, softness, and premium wellness brand style. Generate a NEW original image, not a copy. "
            "Create a very realistic premium AI campaign portrait of an attractive adult man age 52 with medium skin, salt-and-pepper hair, subtle beard, bright eyes, and a warm charismatic smile. "
            "3/4 torso crop, body angled slightly left, centered subject, soft sage pastel background, elevated light cashmere sweater, believable skin texture, natural asymmetry, softly diffused editorial lighting, luxury wellness brand quality, square composition. "
            "No text, no logos, no pills, no capsules, no vials, no syringes, no medical devices, no stock-photo look, no corporate headshot look."
        ),
    },
]

with open('/Users/Rex/.openclaw/workspace/secrets.json') as f:
    API_KEY = json.load(f)['gemini_api_key']

def gen(ref_path: str, prompt: str) -> bytes:
    img_b64 = base64.b64encode(Path(ref_path).read_bytes()).decode()
    body = {
        'contents': [{'parts': [
            {'text': prompt},
            {'inlineData': {'mimeType': 'image/png', 'data': img_b64}}
        ]}],
        'generationConfig': {'responseModalities': ['TEXT', 'IMAGE']}
    }
    url = f'https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent'
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers={'x-goog-api-key': API_KEY, 'Content-Type': 'application/json'}, method='POST')
    with urllib.request.urlopen(req, timeout=180) as resp:
        result = json.loads(resp.read())
    for p in result['candidates'][0]['content']['parts']:
        if 'inlineData' in p:
            return base64.b64decode(p['inlineData']['data'])
    raise RuntimeError(result)

for job in JOBS:
    print(f"Generating {job['slug']}...")
    data = gen(job['ref'], job['prompt'])
    out = OUT_DIR / f"{job['slug']}.png"
    out.write_bytes(data)
    print(f"  saved {out}")
