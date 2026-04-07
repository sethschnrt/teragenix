#!/usr/bin/env python3
"""List available Gemini models for the configured API key."""
import json
import urllib.request

with open("/Users/Rex/.openclaw/workspace/secrets.json") as f:
    api_key = json.load(f)["gemini_api_key"]

url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"
req = urllib.request.Request(url)
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read())

for m in data.get("models", []):
    name = m.get("name", "")
    methods = m.get("supportedGenerationMethods", [])
    if any(x in name.lower() for x in ["imagen", "image", "flash", "nano"]):
        print(f"{name}")
        print(f"  methods: {methods}")
