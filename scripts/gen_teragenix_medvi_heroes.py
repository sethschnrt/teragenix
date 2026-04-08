#!/usr/bin/env python3
import json, base64, urllib.request, urllib.error
from pathlib import Path

MODEL = 'gemini-3-pro-image-preview'
OUT_DIR = Path('/Users/Rex/.openclaw/workspace/teragenix/public/images/generated/medvi-style-v1')
OUT_DIR.mkdir(parents=True, exist_ok=True)

STYLE = (
    " Photorealistic premium editorial photography. Medvi-style hero asset: one strong central subject only, "
    "clean silhouette, upscale wellness-commercial feel, soft diffused studio lighting, refined minimal styling, "
    "simple pale seamless background, no clutter. Subject large in frame but fully contained with generous margins. "
    "No body parts or objects touching frame edges. No text, no logos, no watermarks. High resolution."
)

JOBS = [
    {
        'slug': 'metabolic-hero',
        'aspect': '4:5',
        'prompt': (
            "A confident healthy woman in her early 30s standing in a relaxed natural pose, wearing elegant cream and beige "
            "athleisure, holding a clear water bottle at her side. Warm genuine expression, subtle luxury wellness feel. "
            "Full body visible. Pale soft blue-gray seamless studio background."
            + STYLE
        )
    },
    {
        'slug': 'recovery-hero',
        'aspect': '4:5',
        'prompt': (
            "A fit athletic man in his mid-30s standing casually with a rolled yoga mat under one arm, wearing a charcoal "
            "performance shirt and black shorts. Calm confident expression, premium recovery-and-performance feel. "
            "Full body visible. Pale cool blue seamless studio background."
            + STYLE
        )
    },
    {
        'slug': 'kits-hero',
        'aspect': '4:5',
        'prompt': (
            "A premium open kraft research kit box arranged as a single hero object with elegant visible contents: two small "
            "clear unlabeled vials, sealed sterile syringe package, alcohol pads, and a folded insert card. Clean balanced "
            "composition, like luxury skincare packaging photography but scientific. Pale warm cream seamless background."
            + STYLE
        )
    },
    {
        'slug': 'quality-hero',
        'aspect': '4:5',
        'prompt': (
            "A confident female scientist in her late 30s wearing a crisp white lab coat and glasses, standing three-quarter "
            "view and holding a clean lab report sheet at chest level. Calm expert expression, polished and trustworthy. "
            "Full body visible. Pale lavender-gray seamless studio background."
            + STYLE
        )
    },
]

with open('/Users/Rex/.openclaw/workspace/secrets.json') as f:
    API_KEY = json.load(f)['gemini_api_key']

for job in JOBS:
    url = f'https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}'
    body = {
        'contents': [{'parts': [{'text': job['prompt']}]}],
        'generationConfig': {
            'responseModalities': ['IMAGE'],
            'imageConfig': {'aspectRatio': job['aspect']}
        }
    }
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers={'Content-Type': 'application/json'}, method='POST')
    out = OUT_DIR / f"{job['slug']}.png"
    print(f"GEN {job['slug']}...")
    try:
        with urllib.request.urlopen(req, timeout=300) as resp:
            result = json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print(f"ERROR {e.code}: {e.read().decode()[:300]}")
        continue
    parts = result.get('candidates', [{}])[0].get('content', {}).get('parts', [])
    for part in parts:
        if 'inlineData' in part:
            out.write_bytes(base64.b64decode(part['inlineData']['data']))
            print(f"OK -> {out.name}")
            break
    else:
        print('ERROR no image')
