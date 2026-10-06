#!/usr/bin/env bash
# Orbinoc discovery — READ-ONLY. Copyright (C) 2026 Ernesto Athaualpa Rojas · SPDX-License-Identifier: AGPL-3.0-or-later
# Needs: OCI CLI + python3. Identity: a group with the policy "Allow group OrbinocReaders to inspect all-resources in tenancy".
set -euo pipefail
OUT=${OUT:-orbinoc-discovery}; mkdir -p "$OUT"; RAW="$OUT/oci.raw.json"
REGION=${REGION:-sa-saopaulo-1}   # ALTERE AQUI
oci search resource structured-search --region "$REGION" --query-text "query all resources" --limit 1000 > "$RAW"
python3 "$(dirname "$0")/normalize.py" oci "$RAW" > "$OUT/oci.orbinoc.json"
