#!/usr/bin/env python3
import json, urllib.request
with open('/Users/Rex/.openclaw/workspace/secrets.json') as f:
    API_KEY = json.load(f)['gemini_api_key']
url = f'https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-ultra-generate-001:predict?key={API_KEY}'
prompt = (
    "Ultra-realistic premium wellness campaign image of an attractive adult woman age 47. "
    "Honey-blonde shoulder-length hair, blue-green eyes, light freckles, elegant healthy appearance, believable skin texture. "
    "Show seated pose on a minimal white cube or stool, visible forearms and hands, torso angled slightly right, calm confident smile. "
    "Cream-peach pastel studio background, elevated ivory collared knit set, softly diffused editorial lighting, luxury brand campaign quality, square composition. "
    "Original image only. No resemblance to any real campaign. No text, logos, pills, capsules, vials, syringes, or medical devices. No stock-photo look."
)
body = {'instances':[{'prompt':prompt}],'parameters':{'sampleCount':1,'aspectRatio':'1:1','personGeneration':'allow_adult'}}
req = urllib.request.Request(url,data=json.dumps(body).encode(),headers={'Content-Type':'application/json'},method='POST')
with urllib.request.urlopen(req, timeout=180) as resp:
    result = json.loads(resp.read())
print(json.dumps(result)[:4000])
