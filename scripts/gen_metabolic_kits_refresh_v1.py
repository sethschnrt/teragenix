#!/usr/bin/env python3
import json, base64, urllib.request, urllib.error
from pathlib import Path

MODEL = 'gemini-3-pro-image-preview'
ROOT = Path('/Users/Rex/.openclaw/workspace/teragenix')
OUT = ROOT / 'public/images/generated/refresh-v1'
OUT.mkdir(parents=True, exist_ok=True)

STYLE = (
    'Photorealistic premium commercial product photography. Single strong subject only. '
    'Centered and substantial in frame. Clean silhouette on a simple pale seamless studio background. '
    'No text, no logos, no watermarks, no labels, no hands, no people, no cropped objects touching the edges. '
    'High-end wellness brand aesthetic. Crisp focus, soft diffused light, realistic shadows.'
)

JOBS = [
    {
        'slug': 'metabolic-hero',
        'prompt': (
            'A premium metabolic research product hero: two small clear unlabeled peptide vials with silver caps, '
            'one sterile syringe in sealed packaging, and one minimalist glass vial of clear liquid arranged as one cohesive '
            'editorial still life on a soft pale blue background. The composition should feel elegant, expensive, and useful, '
            'with the main cluster filling most of the frame and no messy residue or floating fragments. ' + STYLE
        )
    },
    {
        'slug': 'kits-hero',
        'prompt': (
            'A premium kraft-brown research kit box opened neatly in three-quarter view with elegant visible contents: '
            'two clear unlabeled vials, one sealed sterile syringe pack, and two alcohol pad packets. The box and contents '
            'should feel clean, substantial, and visually interesting, like luxury skincare packaging photography. '
            'Warm pale cream studio background. Everything fully contained in frame. ' + STYLE
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
            'imageConfig': {'aspectRatio': '4:5'}
        }
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode(),
        headers={'Content-Type': 'application/json'},
        method='POST',
    )
    out = OUT / f"{job['slug']}.png"
    print(f'GEN {job["slug"]}...')
    try:
        with urllib.request.urlopen(req, timeout=300) as resp:
            result = json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print(f'ERROR {e.code}: {e.read().decode()[:500]}')
        continue

    for part in result.get('candidates', [{}])[0].get('content', {}).get('parts', []):
        if 'inlineData' in part:
            out.write_bytes(base64.b64decode(part['inlineData']['data']))
            print(out)
            break
    else:
        print('ERROR: no image data returned')
