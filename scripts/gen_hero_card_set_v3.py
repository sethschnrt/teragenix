#!/usr/bin/env python3
import json, base64, urllib.request, urllib.error
from pathlib import Path

MODEL = "imagen-4.0-ultra-generate-001"
ASPECT = "1:1"
OUT_DIR = Path("public/images/generated/hero-cards-v3")
OUT_DIR.mkdir(parents=True, exist_ok=True)

COMMON_NEG = (
    "no pills, no capsules, no vials, no syringes, no medical devices, no text, no logos, "
    "no corporate headshot, no stock photo look, no gym ad look, no uncanny symmetry, "
    "no plastic skin, no over-smoothed face, no exaggerated beauty filters"
)

PROMPTS = [
    {
        "slug": "woman-24-editorial-mint",
        "prompt": (
            "Ultra-realistic premium beauty-editorial campaign portrait of a very attractive adult woman age 24, "
            "healthy and aspirational, subtle natural smile, refined bone structure, realistic skin texture and pores, "
            "slight natural facial asymmetry, luxury wellness brand image, soft mint pastel studio background, "
            "elevated ivory wardrobe, 3/4 crop from chest up, centered subject, soft diffused editorial lighting, "
            "high-end brand photography, fashion-retouched but believable, sharp eyes, commercial campaign quality. " + COMMON_NEG
        ),
    },
    {
        "slug": "man-29-editorial-blue",
        "prompt": (
            "Ultra-realistic premium editorial campaign portrait of a very attractive adult man age 29, "
            "fit and charismatic, believable skin texture, slight natural asymmetry, relaxed confident expression, "
            "luxury wellness brand image, soft pale blue studio background, clean premium neutral wardrobe, "
            "3/4 crop from waist up, centered subject, soft diffused editorial lighting, high-end commercial photography. " + COMMON_NEG
        ),
    },
    {
        "slug": "woman-38-editorial-cream",
        "prompt": (
            "Ultra-realistic premium editorial campaign portrait of a very attractive adult woman age 38, "
            "polished, healthy, elegant, believable skin texture, subtle natural smile, slight natural asymmetry, "
            "luxury wellness brand image, warm cream pastel studio background, elevated white wardrobe, "
            "3/4 crop from chest up, centered subject, soft beauty lighting, high-end commercial photography, "
            "aspirational but realistic, brand campaign quality. " + COMMON_NEG
        ),
    },
    {
        "slug": "man-47-editorial-sage",
        "prompt": (
            "Ultra-realistic premium editorial campaign portrait of a very attractive adult man age 47, "
            "healthy, stylish, distinguished, believable skin texture, slight natural asymmetry, warm expression, "
            "luxury wellness brand image, soft sage-teal pastel studio background, refined light wardrobe, "
            "3/4 crop from chest up, centered subject, soft diffused editorial lighting, high-end brand photography. " + COMMON_NEG
        ),
    },
]

with open("/Users/Rex/.openclaw/workspace/secrets.json") as f:
    API_KEY = json.load(f)["gemini_api_key"]

def generate(prompt: str) -> bytes:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:predict?key={API_KEY}"
    body = {
        "instances": [{"prompt": prompt}],
        "parameters": {"sampleCount": 1, "aspectRatio": ASPECT, "personGeneration": "allow_adult"},
    }
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers={"Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(req, timeout=180) as resp:
        result = json.loads(resp.read())
    preds = result.get("predictions", [])
    if not preds or not preds[0].get("bytesBase64Encoded"):
        raise RuntimeError(result)
    return base64.b64decode(preds[0]["bytesBase64Encoded"])

for item in PROMPTS:
    slug = item['slug']
    print(f"Generating {slug}...")
    try:
        data = generate(item['prompt'])
        out = OUT_DIR / f"{slug}.png"
        out.write_bytes(data)
        print(f"  saved {out}")
    except urllib.error.HTTPError as e:
        print(f"  HTTP {e.code}: {e.read().decode()}")
    except Exception as e:
        print(f"  FAIL: {e}")
