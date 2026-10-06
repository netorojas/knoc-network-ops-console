#!/usr/bin/env bash
# Orbiscale discovery — READ-ONLY. Copyright (C) 2026 Ernesto Athaualpa Rojas · SPDX-License-Identifier: AGPL-3.0-or-later
# Needs: gcloud + python3, Cloud Asset API enabled. Identity: roles/cloudasset.viewer on the org, folder or project.
set -euo pipefail
OUT=${OUT:-orbiscale-discovery}; mkdir -p "$OUT"; RAW="$OUT/gcp.raw.json"
SCOPE=${SCOPE:-projects/$(gcloud config get-value project 2>/dev/null)}   # ALTERE AQUI: SCOPE=organizations/123456789
gcloud asset search-all-resources --scope="$SCOPE" --format=json > "$RAW"
python3 "$(dirname "$0")/normalize.py" gcp "$RAW" > "$OUT/gcp.orbiscale.json"
