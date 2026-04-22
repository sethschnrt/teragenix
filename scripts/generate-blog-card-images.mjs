#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');
const secrets = JSON.parse(readFileSync(join(repoRoot, '..', 'secrets.json'), 'utf8'));
const GEMINI_KEY = process.env.GEMINI_API_KEY || secrets.gemini_api_key;
const MODEL = 'nano-banana-pro-preview';
const manifestPath = join(repoRoot, 'docs', 'blog-card-image-manifest.json');
const outputDir = join(repoRoot, 'public', 'images', 'blog');
const referencePath = join(repoRoot, 'public', 'images', 'vials', 'approved', 'retatrutide.png');

if (!GEMINI_KEY) {
  throw new Error('Missing Gemini API key');
}

mkdirSync(outputDir, { recursive: true });

const requestedSlugs = process.argv.slice(2);
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')).filter((entry) => {
  return requestedSlugs.length === 0 || requestedSlugs.includes(entry.slug);
});
const referenceData = existsSync(referencePath)
  ? readFileSync(referencePath).toString('base64')
  : null;

async function generateOne(entry) {
  const parts = [];

  if (referenceData) {
    parts.push({
      inlineData: {
        mimeType: 'image/png',
        data: referenceData,
      },
    });
  }

  parts.push({
    text: `${entry.prompt}\n\nHard rules: use the reference vial only as a material and lighting cue, do not copy any readable label text. Keep the final image text-free. Landscape blog card composition, premium, photoreal, and clean.`
  });

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`Gemini error ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  const responseParts = data?.candidates?.[0]?.content?.parts || [];
  const imagePart = responseParts.find((part) => part.inlineData?.data);
  if (!imagePart) {
    throw new Error(`No image returned for ${entry.slug}`);
  }

  const pngPath = join(outputDir, `${entry.slug}.png`);
  const webpPath = join(outputDir, `${entry.slug}.webp`);
  writeFileSync(pngPath, Buffer.from(imagePart.inlineData.data, 'base64'));

  let converted = false;
  try {
    execFileSync('cwebp', ['-q', '88', pngPath, '-o', webpPath], { stdio: 'ignore' });
    converted = true;
  } catch {
    try {
      execFileSync('ffmpeg', ['-y', '-i', pngPath, webpPath], { stdio: 'ignore' });
      converted = true;
    } catch {
      try {
        execFileSync('sips', ['-s', 'format', 'webp', pngPath, '--out', webpPath], { stdio: 'ignore' });
        converted = true;
      } catch {}
    }
  }

  const finalPath = converted ? webpPath : pngPath;
  return {
    ...entry,
    model: MODEL,
    output: finalPath,
    converted,
  };
}

const results = [];
for (const entry of manifest) {
  console.log(`Generating ${entry.slug} with ${MODEL}...`);
  results.push(await generateOne(entry));
}

writeFileSync(join(outputDir, 'manifest.generated.json'), JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
