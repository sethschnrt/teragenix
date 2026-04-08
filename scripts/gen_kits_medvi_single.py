#!/usr/bin/env python3
import json, base64, urllib.request, urllib.error
from pathlib import Path

MODEL = 'gemini-3-pro-image-preview'
out = Path('/Users/Rex/.openclaw/workspace/teragenix/public/images/generated/medvi-style-v1/kits-hero-v2.png')

prompt = (
    "A premium kraft-brown research kit box standing upright as a single hero product, slightly angled three-quarter view, "
    "with one small clear unlabeled vial placed beside it and one sealed sterile syringe package in front. Minimal elegant "
    "composition, substantial and centered, luxury product photography feel, pale cool gray seamless background, soft diffused "
    "studio lighting, clean shadows. All objects fully contained with generous margins. No paper cards, no text, no labels, no logos, no watermarks."
)

with open('/Users/Rex/.openclaw/workspace/secrets.json') as f:
    API_KEY = json.load(f)['gemini_api_key']
url = f'https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}'
body = {
    'contents': [{'parts': [{'text': prompt}]}],
    'generationConfig': {'responseModalities': ['IMAGE'], 'imageConfig': {'aspectRatio': '4:5'}}
}
req = urllib.request.Request(url, data=json.dumps(body).encode(), headers={'Content-Type': 'application/json'}, method='POST')
with urllib.request.urlopen(req, timeout=300) as resp:
    result = json.loads(resp.read())
for part in result.get('candidates', [{}])[0].get('content', {}).get('parts', []):
    if 'inlineData' in part:
        out.write_bytes(base64.b64decode(part['inlineData']['data']))
        print(out)
        break
