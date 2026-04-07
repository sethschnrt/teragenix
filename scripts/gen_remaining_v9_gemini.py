#!/usr/bin/env python3
import json, base64, urllib.request
from pathlib import Path

MODEL = 'gemini-2.5-flash-image'
OUT_DIR = Path('public/images/generated/hero-cards-v9')
OUT_DIR.mkdir(parents=True, exist_ok=True)

JOBS = [
    {
        'slug': 'woman-47-cream-seated',
        'prompt': (
            'Generate a new original premium wellness campaign image of an attractive adult woman age 47. '
            'Honey-blonde shoulder-length hair, blue-green eyes, light freckles, elegant healthy appearance, believable skin texture. '
            'Show a seated pose with visible forearms and hands, torso angled slightly right, calm confident smile. '
            'Cream-peach pastel studio background, elevated ivory collared knit set, softly diffused editorial lighting, luxury brand campaign quality, square composition. '
            'Not a headshot. No text, no logos, no pills, no capsules, no vials, no syringes, no medical devices, no stock-photo look.'
        )
    },
    {
        'slug': 'man-58-sage-standing',
        'prompt': (
            'Generate a new original premium wellness campaign image of an attractive adult man age 58. '
            'Salt-and-pepper hair, light beard, medium tan skin, charismatic warm smile, believable skin texture. '
            'Show upper torso with one arm bent and one hand visible, body angled left, more fashion-editorial than headshot. '
            'Soft sage pastel studio background, lightweight sage knit sweater layered over white tee, softly diffused editorial lighting, luxury brand campaign quality, square composition. '
            'No text, no logos, no pills, no capsules, no vials, no syringes, no medical devices, no stock-photo look.'
        )
    }
]

with open('/Users/Rex/.openclaw/workspace/secrets.json') as f:
    API_KEY = json.load(f)['gemini_api_key']

for job in JOBS:
    body = {
        'contents': [{'parts': [{'text': job['prompt']}]}],
        'generationConfig': {'responseModalities': ['TEXT','IMAGE']}
    }
    url = f'https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent'
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers={'x-goog-api-key': API_KEY, 'Content-Type': 'application/json'}, method='POST')
    print('Generating', job['slug'])
    with urllib.request.urlopen(req, timeout=180) as resp:
        result = json.loads(resp.read())
    for p in result['candidates'][0]['content']['parts']:
        if 'inlineData' in p:
            out = OUT_DIR / f"{job['slug']}.png"
            out.write_bytes(base64.b64decode(p['inlineData']['data']))
            print(' saved', out)
            break
