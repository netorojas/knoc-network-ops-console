#!/usr/bin/env bash
# Orbinoc discovery — READ-ONLY. Copyright (C) 2026 Ernesto Athaualpa Rojas · SPDX-License-Identifier: AGPL-3.0-or-later
# Run inside a Terraform working directory that already has state access. "terraform show -json" only READS the state:
# no plan, no apply, no refresh. Great for teams that keep everything as code.
set -euo pipefail
OUT=${OUT:-orbinoc-discovery}; mkdir -p "$OUT"
terraform show -json > "$OUT/terraform.raw.json"
python3 "$(dirname "$0")/normalize.py" terraform "$OUT/terraform.raw.json" > "$OUT/terraform.orbinoc.json"
