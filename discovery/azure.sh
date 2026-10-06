#!/usr/bin/env bash
# Orbinoc discovery — READ-ONLY. Copyright (C) 2026 Ernesto Athaualpa Rojas · SPDX-License-Identifier: AGPL-3.0-or-later
# Needs: Azure CLI + extension resource-graph (az extension add --name resource-graph) + python3.
# Identity: "Reader" on the subscriptions or management group. Uses: az login (or a managed identity).
set -euo pipefail
OUT=${OUT:-orbinoc-discovery}; mkdir -p "$OUT"; RAW="$OUT/azure.raw.json"
SCOPE=${SCOPE:-}   # ALTERE AQUI (optional): SCOPE="--management-groups <mg-id>"  or  "--subscriptions <id1> <id2>"
az graph query -q "Resources | project id, name, type, location, resourceGroup, subscriptionId, tags | order by type asc" --first 1000 $SCOPE -o json > "$RAW"
python3 "$(dirname "$0")/normalize.py" azure "$RAW" > "$OUT/azure.orbinoc.json"
echo "Import $OUT/azure.orbinoc.json in Orbinoc → Settings → Discovery"
# More than 1000 resources? Page with --skip-token (see: az graph query --help).
