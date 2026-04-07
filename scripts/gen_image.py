#!/usr/bin/env python3
"""Generate a single image with Imagen 4 Ultra via Gemini API.

Usage:
  python3 scripts/gen_image.py
  (edit PROMPT and OUTPUT below)
"""
import json
import base64
import urllib.request
import sys

PROMPT = (
    "Ultra-realistic studio product photography of a single tall white peptide vial "
    "with a glossy navy blue cap, sitting on a soft cream-white seamless backdrop. "
    "Soft top-down lighting with gentle shadow underneath. Clean, minimal, "
    "premium pharmaceutical packaging aesthetic. Centered subject. "
    "Square 1:1 composition. Commercial photography. 8K, sharp focus, no text on label."
)
OUTPUT = "/tmp/imagen-test.png"
MODEL = "imagen-4.0-ultra-generate-001"
ASPECT = "1:1"

with open("/Users/Rex/.openclaw/workspace/secrets.json") as f:
    api_key = json.load(f)["gemini_api_key"]

url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:predict?key={api_key}"
body = {
    "instances": [{"prompt": PROMPT}],
    "parameters": {
        "sampleCount": 1,
        "aspectRatio": ASPECT,
        "personGeneration": "allow_all",
    },
}

req = urllib.request.Request(
    url,
    data=json.dumps(body).encode(),
    headers={"Content-Type": "application/json"},
    method="POST",
)
try:
    with urllib.request.urlopen(req, timeout=120) as resp:
        result = json.loads(resp.read())
except urllib.error.HTTPError as e:
    print(f"HTTP {e.code}: {e.read().decode()}", file=sys.stderr)
    sys.exit(1)

predictions = result.get("predictions", [])
if not predictions:
    print(f"no predictions: {result}", file=sys.stderr)
    sys.exit(1)

img_b64 = predictions[0].get("bytesBase64Encoded")
if not img_b64:
    print(f"no image bytes: {predictions[0]}", file=sys.stderr)
    sys.exit(1)

with open(OUTPUT, "wb") as f:
    f.write(base64.b64decode(img_b64))

print(f"saved: {OUTPUT}")
