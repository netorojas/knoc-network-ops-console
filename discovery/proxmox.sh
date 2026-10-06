#!/usr/bin/env bash
# Orbiscale discovery — READ-ONLY. Copyright (C) 2026 Ernesto Athaualpa Rojas · SPDX-License-Identifier: AGPL-3.0-or-later
# Run ON a Proxmox VE node (pvesh is local) as a user with the "PVEAuditor" role. Copy the JSON out and normalize anywhere.
set -euo pipefail
OUT=${OUT:-orbiscale-discovery}; mkdir -p "$OUT"
SITE=${SITE:-"Proxmox cluster"}; COUNTRY=${COUNTRY:-BR}   # ALTERE AQUI
pvesh get /cluster/resources --output-format json > "$OUT/proxmox.raw.json"
python3 "$(dirname "$0")/normalize.py" proxmox "$OUT/proxmox.raw.json" --site "$SITE" --site-country "$COUNTRY" > "$OUT/proxmox.orbiscale.json"
