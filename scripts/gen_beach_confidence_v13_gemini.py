#!/usr/bin/env python3
import json, base64, urllib.request
from pathlib import Path
MODEL = 'gemini-2.5-flash-image'
OUT = Path('public/images/generated/life-benefits-v13/beach-confidence-chair-setup.png')
OUT.parent.mkdir(parents=True, exist_ok=True)
PROMPT = (
    'Generate a new original premium editorial still-life image representing confidence at the beach. '
    'A minimal beach chair setup with a draped ivory towel, stylish sunglasses, and a clean drink glass, '
    'soft warm sand-and-sky pastel studio palette, luxury brand lighting, elegant aspirational composition, square image. '
    'High-end commercial photography feel. No text, no logos, no pills, no capsules, no vials, no syringes, no medical devices.'
)
with open('/Users/Rex/.openclaw/workspace/secrets.json') as f:
    API_KEY = json.load(f)['gemini_api_key']
body = {
    'contents': [{'parts': [{'text': PROMPT}]}],
    'generationConfig': {'responseModalities': ['TEXT','IMAGE']}
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
