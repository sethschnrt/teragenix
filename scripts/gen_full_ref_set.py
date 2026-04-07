#!/usr/bin/env python3
import json, base64, urllib.request
from pathlib import Path

MODEL = "gemini-2.5-flash-image"
OUT_DIR = Path("public/images/generated/hero-cards-v4")
OUT_DIR.mkdir(parents=True, exist_ok=True)
ROOT = Path("/Users/Rex/.openclaw/workspace/teragenix")

JOBS = [
    {
        "slug": "woman-27-mint",
        "ref": "/tmp/medvi-refs/card-womens.png",
        "prompt": (
            "Use the attached reference image only for style cues and realism level. Generate a NEW original image, not a copy. "
            "Create a very realistic premium AI brand portrait of an attractive adult woman age 27. "
            "Head-and-shoulders close crop filling most of the frame, centered, soft mint pastel background, ivory wardrobe, subtle smile, "
            "believable skin texture, slight natural asymmetry, editorial wellness campaign quality, softly diffused studio lighting, square composition. "
            "No text, no logos, no pills, no capsules, no vials, no syringes, no medical devices, no corporate headshot look, no stock photo look."
        ),
    },
    {
        "slug": "man-32-blue",
        "ref": "/tmp/medvi-refs/card-mens.png",
        "prompt": (
            "Use the attached reference image only for style cues and realism level. Generate a NEW original image, not a copy. "
            "Create a very realistic premium AI brand portrait of an attractive adult man age 32. "
            "Head-and-shoulders close crop filling most of the frame, centered, soft pale blue pastel background, refined light neutral wardrobe, relaxed confident expression, "
            "believable skin texture, slight natural asymmetry, editorial wellness campaign quality, softly diffused studio lighting, square composition. "
            "No text, no logos, no pills, no capsules, no vials, no syringes, no medical devices, no corporate headshot look, no stock photo look."
        ),
    },
    {
        "slug": "woman-41-cream",
        "ref": "/tmp/medvi-refs/card-womens.png",
        "prompt": (
            "Use the attached reference image only for style cues and realism level. Generate a NEW original image, not a copy. "
            "Create a very realistic premium AI brand portrait of an attractive adult woman age 41. "
            "Head-and-shoulders close crop filling most of the frame, centered, warm cream-peach pastel background, elegant white wardrobe, subtle confident smile, "
            "believable skin texture, slight natural asymmetry, editorial wellness campaign quality, softly diffused studio lighting, square composition. "
            "No text, no logos, no pills, no capsules, no vials, no syringes, no medical devices, no corporate headshot look, no stock photo look."
        ),
    },
    {
        "slug": "man-49-sage",
        "ref": "/tmp/medvi-refs/card-mens.png",
        "prompt": (
            "Use the attached reference image only for style cues and realism level. Generate a NEW original image, not a copy. "
            "Create a very realistic premium AI brand portrait of an attractive adult man age 49. "
            "Head-and-shoulders close crop filling most of the frame, centered, soft sage-teal pastel background, refined light wardrobe, warm charismatic expression, "
            "believable skin texture, slight natural asymmetry, editorial wellness campaign quality, softly diffused studio lighting, square composition. "
            "No text, no logos, no pills, no capsules, no vials, no syringes, no medical devices, no corporate headshot look, no stock photo look."
        ),
    },
]

with open("/Users/Rex/.openclaw/workspace/secrets.json") as f:
    API_KEY = json.load(f)["gemini_api_key"]

def gen(ref_path: str, prompt: str) -> bytes:
    img_b64 = base64.b64encode(Path(ref_path).read_bytes()).decode()
    body = {
        "contents": [{"parts": [
            {"text": prompt},
            {"inlineData": {"mimeType": "image/png", "data": img_b64}}
        ]}],
        "generationConfig": {"responseModalities": ["TEXT", "IMAGE"]}
    }
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode(),
        headers={"x-goog-api-key": API_KEY, "Content-Type": "application/json"},
        method="POST"
    )
    with urllib.request.urlopen(req, timeout=180) as resp:
        result = json.loads(resp.read())
    parts = result["candidates"][0]["content"]["parts"]
    for p in parts:
        if "inlineData" in p:
            return base64.b64decode(p["inlineData"]["data"])
    raise RuntimeError(result)

for job in JOBS:
    print(f"Generating {job['slug']}...")
    data = gen(job['ref'], job['prompt'])
    out = OUT_DIR / f"{job['slug']}.png"
    out.write_bytes(data)
    print(f"  saved {out}")
