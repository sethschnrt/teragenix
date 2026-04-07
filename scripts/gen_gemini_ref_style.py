#!/usr/bin/env python3
import json, base64, urllib.request
from pathlib import Path

MODEL = "gemini-2.5-flash-image"
OUT = Path("/tmp/gemini-ref-style-woman.png")
REF = Path("/tmp/medvi-cards-tight.png")

with open("/Users/Rex/.openclaw/workspace/secrets.json") as f:
    API_KEY = json.load(f)["gemini_api_key"]

img_b64 = base64.b64encode(REF.read_bytes()).decode()
prompt = (
    "Use the attached reference image only for style cues: premium, very realistic AI brand imagery, "
    "soft pastel studio lighting, believable skin texture, high-end wellness campaign quality, attractive adults, "
    "not stock-photo, not corporate, not uncanny. Generate a new square portrait of a beautiful adult woman age 27, "
    "waist-up, centered, ivory wardrobe, mint pastel background, subtle smile, natural asymmetry, luxury wellness brand aesthetic. "
    "No text, no logos, no pills, no capsules, no vials, no syringes, no medical devices. Original composition."
)

body = {
    "contents": [{
        "parts": [
            {"text": prompt},
            {"inlineData": {"mimeType": "image/png", "data": img_b64}},
        ]
    }],
    "generationConfig": {"responseModalities": ["TEXT", "IMAGE"]}
}
url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"
req = urllib.request.Request(url, data=json.dumps(body).encode(), headers={"x-goog-api-key": API_KEY, "Content-Type": "application/json"}, method="POST")
with urllib.request.urlopen(req, timeout=180) as resp:
    result = json.loads(resp.read())
parts = result["candidates"][0]["content"]["parts"]
for p in parts:
    if "inlineData" in p:
        OUT.write_bytes(base64.b64decode(p["inlineData"]["data"]))
        print(OUT)
        break
else:
    raise SystemExit(result)
