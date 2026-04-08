#!/usr/bin/env python3
import json, base64, urllib.request
from pathlib import Path

MODEL = 'gemini-3-pro-image-preview'
OUT_DIR = Path('/Users/Rex/.openclaw/workspace/teragenix/public/images/generated/medvi-style-v3')
OUT_DIR.mkdir(parents=True, exist_ok=True)

COMMON = (
    'Photorealistic premium commercial hero image. Single subject only. Tight centered composition. '
    'Subject should fill roughly 75 to 85 percent of the frame width and 80 to 90 percent of the frame height. '
    'Very little empty background. Clean silhouette for background removal. Soft flattering studio lighting. '
    'Pale seamless background. No text, no logos, no watermarks.'
)

JOBS = [
    ('metabolic-hero', 'Attractive healthy woman in her early 30s, warm smile, cream knit top, polished wellness-commercial look. Framed from upper thighs to just above head, large in frame. ' + COMMON),
    ('recovery-hero', 'Fit athletic man in his mid-30s, confident relaxed expression, charcoal performance quarter-zip or fitted tee, polished wellness-commercial look. Framed from upper thighs to just above head, broad and substantial in frame. ' + COMMON),
    ('quality-hero', 'Confident female scientist in her late 30s wearing a crisp white lab coat and glasses, subtly holding one clean white report sheet. Framed from upper thighs to just above head, substantial in frame. ' + COMMON),
    ('kits-hero', 'Premium kraft-brown research kit box with one small clear vial, luxury product photography. The box should fill most of the frame and feel substantial, centered, tight composition with very little empty background. Pale seamless background. No text, no logos, no watermarks.'),
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
