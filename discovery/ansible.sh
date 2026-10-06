#!/usr/bin/env bash
# Orbiscale discovery — READ-ONLY. Copyright (C) 2026 Ernesto Athaualpa Rojas · SPDX-License-Identifier: AGPL-3.0-or-later
# Reads an Ansible inventory (static or dynamic). Optional host vars: orbiscale_type (fw, sw, srv, vm…) and orbiscale_country (ISO code).
set -euo pipefail
OUT=${OUT:-orbiscale-discovery}; mkdir -p "$OUT"
INV=${INV:-inventory}   # ALTERE AQUI
ansible-inventory -i "$INV" --list > "$OUT/ansible.raw.json"
python3 "$(dirname "$0")/normalize.py" ansible "$OUT/ansible.raw.json" > "$OUT/ansible.orbiscale.json"
