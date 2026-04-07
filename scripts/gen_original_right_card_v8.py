#!/usr/bin/env python3
import json, base64, urllib.request
from pathlib import Path

MODEL = "imagen-4.0-ultra-generate-001"
OUT = Path("public/images/generated/hero-cards-v8/right-man-original.png")
OUT.parent.mkdir(parents=True, exist_ok=True)

PROMPT = (
    "Ultra-realistic premium wellness campaign portrait of an attractive adult man age 54, "
    "salt-and-pepper hair, light stubble, warm charismatic smile, medium-tan skin, "
    "soft sage pastel studio background, elevated light knit sweater, 3/4 torso crop, "
    "body slightly angled, centered composition, believable skin texture, natural facial asymmetry, "
    "luxury brand photography, softly diffused editorial lighting, square composition. "
    "Original image only. Do not resemble any real ad campaign, pharmaceutical brand, or existing marketing image. "
    "No text, no logos, no pills, no capsules, no vials, no syringes, no medical devices, no stock-photo look."
)

with open('/Users/Rex/.openclaw/workspace/secrets.json') as f:
    API_KEY = json.load(f)['gemini_api_key']

url = f'https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:predict?key={API_KEY}'
body = {
    'instances': [{'prompt': PROMPT}],
    'parameters': {
        'sampleCount': 1,
        'aspectRatio': '1:1',
        'personGeneration': 'allow_adult'
    }
}
req = urllib.request.Request(url, data=json.dumps(body).encode(), headers={'Content-Type': 'application/json'}, method='POST')
with urllib.request.urlopen(req, timeout=180) as resp:
    result = json.loads(resp.read())
img_b64 = result['predictions'][0]['bytesBase64Encoded']
OUT.write_bytes(base64.b64decode(img_b64))
print(OUT)
