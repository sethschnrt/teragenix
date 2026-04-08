#!/usr/bin/env python3
"""Generate 12 lifestyle/lab/athletic photos for editorial sections."""
import json, base64, urllib.request, urllib.error
from pathlib import Path

MODEL = 'gemini-3-pro-image-preview'
OUT_DIR = Path('public/images/generated/lifestyle-v1')
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Common style suffix for cohesion
STYLE = (
    " Photorealistic editorial photography. Natural soft lighting, shallow depth of field where appropriate, "
    "warm authentic colors, real candid feel, magazine-quality. Clean uncluttered composition. "
    "NO text, NO logos, NO brand names visible anywhere. NO watermarks. High resolution, sharp focus on subject."
)

JOBS = [
    # === SECTION 1 — METABOLIC ===
    {
        'slug': 'metabolic-1-hero',
        'aspect': '4:5',
        'prompt': (
            "A confident fit woman in her early 30s with shoulder-length brown hair, wearing simple cream-colored "
            "athletic loungewear, mid-laugh in a bright modern bathroom with morning sunlight streaming through "
            "frosted windows. She is barefoot, just stepped off a sleek minimalist bathroom scale. Her expression "
            "is genuinely happy and relieved, head slightly tilted back with a real laugh. Soft warm morning light, "
            "white tile bathroom, hint of green plant in background. Three-quarter body shot, vertical composition."
            + STYLE
        )
    },
    {
        'slug': 'metabolic-2-couple-walking',
        'aspect': '1:1',
        'prompt': (
            "A happy couple in their 30s walking a small fluffy dog in a sunlit suburban park during golden hour. "
            "They are holding hands and smiling at each other, wearing casual fall clothes (light jackets, jeans). "
            "Trees with golden autumn leaves in the background, dappled sunlight through the leaves. "
            "Natural relaxed body language, real candid moment. Square composition." + STYLE
        )
    },
    {
        'slug': 'metabolic-3-family-dinner',
        'aspect': '1:1',
        'prompt': (
            "A multigenerational family of 4-5 people (parents in their 40s, two kids around 10, and a grandparent) "
            "sharing a colorful healthy dinner at a sunlit wooden dining table. Plates of roasted vegetables, grilled "
            "salmon, fresh salad, bright lemons. Everyone is laughing and passing food. Warm golden afternoon light "
            "from a window on the left. Real authentic family moment, not posed. Square composition." + STYLE
        )
    },

    # === SECTION 2 — RECOVERY ===
    {
        'slug': 'recovery-1-hero',
        'aspect': '4:5',
        'prompt': (
            "An athletic man in his mid-30s with a fit muscular build, doing a deep cobra stretch / upward dog yoga "
            "pose on a charcoal yoga mat in a minimalist sunlit home gym. He is shirtless wearing dark gray athletic "
            "shorts, eyes closed in focus. Large window behind him with soft morning light, plants in the corner, "
            "exposed brick wall. Vertical composition, side angle showing his form. Calm peaceful mood." + STYLE
        )
    },
    {
        'slug': 'recovery-2-trail-run',
        'aspect': '1:1',
        'prompt': (
            "An athletic woman in her early 40s running on a forest trail, mid-stride, smiling with effort and joy. "
            "She wears a teal long-sleeve running top and black shorts, hair in a ponytail. Sunlight filters through "
            "tall pine trees creating beams of light. Mossy forest floor. Action shot with slight motion blur on her "
            "trailing leg, sharp focus on her face and torso. Square composition." + STYLE
        )
    },
    {
        'slug': 'recovery-3-foam-roll',
        'aspect': '1:1',
        'prompt': (
            "A fit man in his 30s lying on his back on a soft beige rug in a clean modern bedroom, foam rolling his "
            "upper back on a black foam roller. Eyes closed in focused recovery. He wears a plain white t-shirt and "
            "navy athletic shorts. Soft morning light from a large window. Minimalist scandinavian bedroom aesthetic, "
            "potted plant in corner, white linen bedding visible. Overhead three-quarter angle. Square composition."
            + STYLE
        )
    },

    # === SECTION 3 — COMPLETE KITS ===
    {
        'slug': 'kits-1-hero',
        'aspect': '4:5',
        'prompt': (
            "A scientific researcher (gloved hands and white lab coat sleeves visible) carefully opening a sealed "
            "premium product kit box on an immaculate white lab bench. Inside the box: small unmarked glass vials "
            "in foam padding, a sealed reconstitution card, and small accessories. Bright clean lab lighting, "
            "stainless steel surfaces in the background blurred. Hands and box are the focal point. No faces visible. "
            "Vertical composition, slightly overhead angle." + STYLE
        )
    },
    {
        'slug': 'kits-2-pipette',
        'aspect': '1:1',
        'prompt': (
            "Close-up macro photograph of a gloved hand using a precision micropipette over a rack of small clear "
            "unlabeled glass laboratory vials. Shallow depth of field with the pipette tip and vial in sharp focus, "
            "background softly blurred. Clean blue-tinted scientific lighting, cool color temperature. Stainless "
            "steel lab surface beneath. Square composition." + STYLE
        )
    },
    {
        'slug': 'kits-3-coa-paper',
        'aspect': '1:1',
        'prompt': (
            "Overhead flat-lay photograph of a sealed premium kraft cardboard kit box next to a stack of "
            "professionally formatted certificate-of-analysis paperwork (clean blank documents, no actual readable "
            "text), a fountain pen, and a small unmarked clear glass vial. All arranged on a clean light gray "
            "minimalist desk surface. Soft even studio lighting, slight shadow under each object. Magazine flat-lay "
            "aesthetic. Square composition." + STYLE
        )
    },

    # === SECTION 4 — QUALITY STANDARDS ===
    {
        'slug': 'quality-1-hero',
        'aspect': '4:5',
        'prompt': (
            "A confident scientist (woman in her late 30s with glasses, dark hair pulled back, wearing a crisp white "
            "lab coat) examining a printout of HPLC chromatogram data with a slight focused smile. She is in a modern "
            "well-lit research lab with stainless steel equipment softly blurred in the background. Clean professional "
            "natural lighting. Three-quarter portrait, vertical composition. Calm expert energy." + STYLE
        )
    },
    {
        'slug': 'quality-2-glassware',
        'aspect': '1:1',
        'prompt': (
            "Beautiful close-up of laboratory glassware — an Erlenmeyer flask and graduated cylinder containing a "
            "translucent pale blue liquid — arranged on a clean white surface with soft natural light from the side. "
            "Glass refractions and clean shadows visible. Sharp macro focus on the glassware curves. Editorial "
            "scientific aesthetic. Square composition." + STYLE
        )
    },
    {
        'slug': 'quality-3-yoga-couple',
        'aspect': '1:1',
        'prompt': (
            "A happy fit couple in their early 50s practicing yoga together in a sunlit modern living room. They are "
            "doing a gentle warrior pose facing each other, smiling and laughing. The man has gray-flecked hair and "
            "a gray t-shirt, the woman has shoulder-length silver-blonde hair and a soft pink athletic top. Large "
            "windows with soft morning light, hardwood floor, plants in the background. Real joyful candid moment, "
            "showing vitality and active aging. Square composition." + STYLE
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
            'imageConfig': {'aspectRatio': job['aspect']}
        }
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode(),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    out = OUT_DIR / f"{job['slug']}.png"
    if out.exists():
        print(f"SKIP {job['slug']} (exists)")
        continue
    print(f"GEN  {job['slug']} ({job['aspect']})...")
    try:
        with urllib.request.urlopen(req, timeout=240) as resp:
            result = json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print(f"  ERROR {e.code}: {e.read().decode()[:300]}")
        continue
    except Exception as e:
        print(f"  ERROR: {e}")
        continue

    parts = result.get('candidates', [{}])[0].get('content', {}).get('parts', [])
    for part in parts:
        if 'inlineData' in part:
            img_data = base64.b64decode(part['inlineData']['data'])
            out.write_bytes(img_data)
            print(f"  OK {len(img_data)} bytes -> {out.name}")
            break
    else:
        print(f"  ERROR: no image in response: {json.dumps(result)[:300]}")

print("\nDone.")
