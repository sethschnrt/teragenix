#!/usr/bin/env python3
import json, base64, urllib.request
from pathlib import Path
MODEL = 'imagen-4.0-ultra-generate-001'
OUT = Path('public/images/generated/still-life-v11/vitality-still-life.png')
OUT.parent.mkdir(parents=True, exist_ok=True)
PROMPT = (
    'Ultra-realistic premium wellness editorial still-life photography. '
    'A folded ivory ribbed knit draped over a minimal white pedestal, beside a clear glass of water with light condensation, '
    'soft sage pastel studio background, luxury brand styling, softly diffused editorial lighting, elegant composition, square image. '
    'Clean, premium, believable, not abstract CGI art. No text, no logos, no pills, no capsules, no vials, no syringes, no medical devices.'
)
with open('/Users/Rex/.openclaw/workspace/secrets.json') as f:
    API_KEY = json.load(f)['gemini_api_key']
url = f'https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:predict?key={API_KEY}'
body = {'instances':[{'prompt':PROMPT}],'parameters':{'sampleCount':1,'aspectRatio':'1:1'}}
req = urllib.request.Request(url, data=json.dumps(body).encode(), headers={'Content-Type':'application/json'}, method='POST')
with urllib.request.urlopen(req, timeout=180) as resp:
    result = json.loads(resp.read())
OUT.write_bytes(base64.b64decode(result['predictions'][0]['bytesBase64Encoded']))
print(OUT)
