#!/usr/bin/env bash
# Orbiscale discovery — READ-ONLY. Copyright (C) 2026 Ernesto Athaualpa Rojas · SPDX-License-Identifier: AGPL-3.0-or-later
# Prism Central v3 API, user with the "Viewer" role. The password is asked interactively (curl -u user) and never stored.
set -euo pipefail
OUT=${OUT:-orbiscale-discovery}; mkdir -p "$OUT"
PC=${PC:-prism.contoso.example}; USER_RO=${USER_RO:-orbiscale-viewer}; SITE=${SITE:-"Nutanix cluster"}; COUNTRY=${COUNTRY:-SG}   # ALTERE AQUI
curl -sS -u "$USER_RO" -H 'Content-Type: application/json' -X POST "https://$PC:9440/api/nutanix/v3/vms/list" -d '{"kind":"vm","length":500}' > "$OUT/nutanix.raw.json"
python3 "$(dirname "$0")/normalize.py" nutanix "$OUT/nutanix.raw.json" --site "$SITE" --site-country "$COUNTRY" > "$OUT/nutanix.orbiscale.json"
# The POST above is the list endpoint of the v3 API (a read). It does not change anything.
