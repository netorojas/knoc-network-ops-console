#!/usr/bin/env bash
# Orbiscale discovery — READ-ONLY. Copyright (C) 2026 Ernesto Athaualpa Rojas · SPDX-License-Identifier: AGPL-3.0-or-later
# Needs: ibmcloud CLI (+ plugin vpc-infrastructure) + python3. Identity: platform role "Viewer" + service role "Reader".
set -euo pipefail
OUT=${OUT:-orbiscale-discovery}; mkdir -p "$OUT"; RAW="$OUT/ibm.raw.json"
INST=$(ibmcloud is instances --output json 2>/dev/null || echo '[]')
SVC=$(ibmcloud resource service-instances --output json 2>/dev/null || echo '[]')
printf '{"instances": %s, "services": %s}' "$INST" "$SVC" > "$RAW"
python3 "$(dirname "$0")/normalize.py" ibm "$RAW" > "$OUT/ibm.orbiscale.json"
