#!/usr/bin/env python3
import json, base64, urllib.request
from pathlib import Path

MODEL = "gemini-2.5-flash-image"
OUT = Path("public/images/generated/hero-cards-v6/woman-44-blonde-cream.png")
OUT.parent.mkdir(parents=True, exist_ok=True)
REF = Path('/tmp/medvi-refs/card-womens.png')

with open('/Users/Rex/.openclaw/workspace/secrets.json') as f:
    API_KEY = json.load(f)['gemini_api_key']

prompt = (
    "Use the attached reference image only for realism level, softness, and premium wellness brand style. Generate a NEW original image, not a copy. "
    "Create a very realistic premium AI brand portrait of an attractive adult woman age 44 with fair skin, clear light freckles, blue-green eyes, defined cheekbones, and shoulder-length honey-blonde hair with soft volume and a side part. "
    "She should look distinctly different from a dark-haired brunette woman. Head-and-shoulders close crop filling most of the frame, centered, warm cream-peach pastel background, elegant ivory knit polo top, confident understated smile, believable skin texture, slight natural asymmetry, editorial wellness campaign quality, softly diffused studio lighting, square composition. "
    "No text, no logos, no pills, no capsules, no vials, no syringes, no medical devices, no stock-photo look, no corporate headshot look."
)
img_b64 = base64.b64encode(REF.read_bytes()).decode()
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
        OUT.write_bytes(base64.b64decode(p['inlineData']['data']))
        print(OUT)
        break
else:
    raise RuntimeError(result)
