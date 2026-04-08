#!/usr/bin/env python3
import json, base64, urllib.request
from pathlib import Path

MODEL = 'gemini-3-pro-image-preview'
OUT_DIR = Path('/Users/Rex/.openclaw/workspace/teragenix/public/images/generated/medvi-style-v2')
OUT_DIR.mkdir(parents=True, exist_ok=True)

BASE = (
    'Photorealistic premium commercial portrait. Tight centered composition. Chest-up or waist-up only. '
    'Single subject only. Clean silhouette for background removal. Soft flattering studio lighting. '
    'Pale seamless background. No props unless explicitly requested. No text, logos, watermarks.'
)

JOBS = [
    ('metabolic-hero', 'A healthy attractive woman in her early 30s, warm smile, cream knit top, polished wellness-commercial look. ' + BASE),
    ('recovery-hero', 'A fit athletic man in his mid-30s, confident relaxed expression, charcoal performance quarter-zip, polished wellness-commercial look. ' + BASE),
    ('quality-hero', 'A confident female scientist in her late 30s wearing a crisp white lab coat and glasses, holding one simple white sheet subtly, trustworthy premium look. ' + BASE),
    ('kits-hero', 'A premium kraft-brown research kit box as a single centered product hero, simple upright three-quarter view, with one small vial only. Clean luxury product photography on a pale seamless background. Tight centered composition. No extra clutter. No text, logos, watermarks.'),
]

with open('/Users/Rex/.openclaw/workspace/secrets.json') as f:
    key = json.load(f)['gemini_api_key']

for slug, prompt in JOBS:
    url = f'https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={key}'
    body = {
        'contents': [{'parts': [{'text': prompt}]}],
        'generationConfig': {'responseModalities': ['IMAGE'], 'imageConfig': {'aspectRatio': '4:5'}}
    }
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers={'Content-Type': 'application/json'}, method='POST')
    with urllib.request.urlopen(req, timeout=300) as resp:
        result = json.loads(resp.read())
    for part in result.get('candidates', [{}])[0].get('content', {}).get('parts', []):
        if 'inlineData' in part:
            (OUT_DIR / f'{slug}.png').write_bytes(base64.b64decode(part['inlineData']['data']))
            print(slug)
            break
