#!/usr/bin/env python3
import json
import base64
import urllib.request
import urllib.error
from pathlib import Path

MODEL = "imagen-4.0-ultra-generate-001"
ASPECT = "1:1"
OUT_DIR = Path("public/images/generated/hero-cards")
OUT_DIR.mkdir(parents=True, exist_ok=True)

PROMPTS = [
    {
        "slug": "weight-management-woman",
        "prompt": (
            "Ultra-realistic commercial lifestyle photography of a confident healthy woman in her late 20s, "
            "natural smile, premium wellness brand aesthetic, soft mint studio backdrop, clean wardrobe in cream and pale sage, "
            "isolated subject, centered composition, subtle shadow, high-end campaign photography, no text, no logos, no clutter, "
            "luxury healthcare website image, sharp focus, realistic skin, editorial lighting"
        ),
    },
    {
        "slug": "recovery-performance-man",
        "prompt": (
            "Ultra-realistic commercial lifestyle photography of a fit athletic man in his 30s, relaxed confident expression, "
            "premium wellness brand aesthetic, soft pale blue studio backdrop, clean neutral athletic clothing, isolated subject, "
            "centered composition, subtle shadow, high-end campaign photography, no text, no logos, no clutter, luxury healthcare website image"
        ),
    },
    {
        "slug": "longevity-capsule-dna",
        "prompt": (
            "Ultra-realistic premium product render of a single elegant silver-white capsule floating with a subtle translucent DNA ribbon behind it, "
            "soft cream studio backdrop, minimal luxury wellness brand aesthetic, isolated object, centered composition, subtle shadow, "
            "high-end commercial photography, no text, no logos, no clutter, photoreal, sharp focus"
        ),
    },
    {
        "slug": "energy-focus-woman",
        "prompt": (
            "Ultra-realistic commercial lifestyle photography of a bright confident woman in her 30s, clear skin, gentle smile, "
            "premium wellness brand aesthetic, soft peach-cream studio backdrop, clean ivory wardrobe, isolated subject, centered composition, "
            "subtle shadow, high-end campaign photography, no text, no logos, no clutter, luxury healthcare website image"
        ),
    },
]

with open("/Users/Rex/.openclaw/workspace/secrets.json") as f:
    API_KEY = json.load(f)["gemini_api_key"]


def generate(prompt: str) -> bytes:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:predict?key={API_KEY}"
    body = {
        "instances": [{"prompt": prompt}],
        "parameters": {
            "sampleCount": 1,
            "aspectRatio": ASPECT,
            "personGeneration": "allow_adult",
        },
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=180) as resp:
        result = json.loads(resp.read())
    predictions = result.get("predictions", [])
    if not predictions or not predictions[0].get("bytesBase64Encoded"):
        raise RuntimeError(f"No image bytes in response: {result}")
    return base64.b64decode(predictions[0]["bytesBase64Encoded"])


def main():
    for item in PROMPTS:
        slug = item["slug"]
        out = OUT_DIR / f"{slug}.png"
        print(f"Generating {slug}...")
        try:
            img = generate(item["prompt"])
            out.write_bytes(img)
            print(f"  saved {out}")
        except urllib.error.HTTPError as e:
            print(f"  HTTP {e.code}: {e.read().decode()}")
        except Exception as e:
            print(f"  FAIL: {e}")


if __name__ == "__main__":
    main()
