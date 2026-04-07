#!/usr/bin/env python3
import json
import base64
import urllib.request
import urllib.error
from pathlib import Path

MODEL = "imagen-4.0-ultra-generate-001"
ASPECT = "1:1"
OUT_DIR = Path("public/images/generated/hero-cards-v2")
OUT_DIR.mkdir(parents=True, exist_ok=True)

PROMPTS = [
    {
        "slug": "fat-loss-woman-26",
        "prompt": (
            "Ultra-realistic premium healthcare lifestyle photography of an attractive confident adult woman, age 26, "
            "healthy fit appearance, subtle smile, elegant natural makeup, soft mint pastel studio background, "
            "clean ivory wardrobe, isolated subject, centered composition, commercial campaign photography, "
            "luxury wellness brand aesthetic, no pills, no vials, no medical devices, no text, no logos, sharp focus"
        ),
    },
    {
        "slug": "recovery-man-31",
        "prompt": (
            "Ultra-realistic premium healthcare lifestyle photography of an attractive athletic adult man, age 31, "
            "lean build, relaxed confident expression, soft pale blue pastel studio background, refined neutral athletic clothing, "
            "isolated subject, centered composition, commercial campaign photography, luxury wellness brand aesthetic, "
            "no pills, no vials, no medical devices, no text, no logos, sharp focus"
        ),
    },
    {
        "slug": "longevity-woman-43",
        "prompt": (
            "Ultra-realistic premium healthcare lifestyle photography of an attractive adult woman, age 43, "
            "glowing skin, polished natural look, sophisticated and healthy, soft warm cream-peach pastel studio background, "
            "clean elevated wardrobe, isolated subject, centered composition, commercial campaign photography, luxury wellness brand aesthetic, "
            "no pills, no vials, no medical devices, no text, no logos, sharp focus"
        ),
    },
    {
        "slug": "vitality-man-52",
        "prompt": (
            "Ultra-realistic premium healthcare lifestyle photography of an attractive adult man, age 52, "
            "fit, healthy, charismatic, premium wellness brand aesthetic, soft sage-teal pastel studio background, "
            "clean modern wardrobe, isolated subject, centered composition, commercial campaign photography, no pills, no vials, no medical devices, no text, no logos, sharp focus"
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
