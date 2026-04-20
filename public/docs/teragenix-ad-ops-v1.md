# Teragenix Ad Ops V1

## Goal
Add an internal ad management layer to the existing Teragenix project so hooks, scripts, creative outputs, test results, and winners live in the same system as orders, CRM, and expenses.

## Core idea
Do not treat ad production as a one-off creative task.
Treat it like an operating system:

1. choose product or offer
2. generate many angles
3. turn strong angles into short scripts
4. generate multiple creative variants
5. distribute to owned surfaces and test channels
6. log results daily
7. kill losers fast and duplicate winners

## Recommended stack inside Teragenix
- Claude / OpenAI for angles, hooks, scripts, CTAs
- Seedance / Runway for creative generation
- Teragenix admin for tracking and review
- OpenClaw cron for daily summaries, queue nudges, and housekeeping

## V1 data model
### ad_projects
High-level campaign buckets.

Suggested fields:
- id
- name
- product_slug
- objective
- status
- target_channel
- offer
- notes
- created_at
- updated_at

### ad_angles
The concept layer.

Suggested fields:
- id
- project_id
- title
- hook
- pain_point
- transformation
- objection
- awareness_stage
- score
- status
- created_at

### ad_scripts
The execution layer.

Suggested fields:
- id
- angle_id
- title
- duration_seconds
- script_text
- cta
- style_notes
- narrator_notes
- status
- created_at

### ad_creatives
The generated asset layer.

Suggested fields:
- id
- script_id
- provider
- model
- aspect_ratio
- duration_seconds
- prompt_text
- reference_assets
- output_url
- thumbnail_url
- version_label
- status
- created_at

### ad_variants
Used when the same core script gets multiple hooks, intros, captions, or endings.

Suggested fields:
- id
- creative_id
- variant_type
- variant_label
- hook_text
- cta_text
- caption_text
- status
- created_at

### ad_channels
Where the asset is being used.

Suggested fields:
- id
- variant_id
- platform
- placement
- url
- launched_at
- status

### ad_performance_snapshots
Metrics over time.

Suggested fields:
- id
- channel_id
- snapshot_date
- spend
- impressions
- clicks
- ctr
- hold_rate
- hook_rate
- cpc
- cpa
- add_to_cart
- checkout_started
- purchases
- revenue
- winner_flag
- notes

## V1 UI inside admin
Add `/admin/ads` with these sections:
- overview
- active projects
- angle backlog
- script queue
- creative library
- results table
- winners board

## V1 operating cadence
### Daily
- review yesterday’s metrics
- pause weak variants
- duplicate winners
- queue next batch
- write one short summary

### Weekly
- identify best hooks
- identify best CTAs
- compare landing page match by angle
- decide what to scale, cut, or refilm

## Rules
- one angle per script
- one script can have multiple variants
- do not keep vague “pretty” assets without a testing purpose
- owned media first, then organic/creator distribution
- only scale what actually wins

## Best next build order
1. add Prisma models
2. seed one Teragenix campaign
3. add `/admin/ads`
4. add input forms for angles and scripts
5. add creative asset logging
6. add results table
7. add daily summary cron
