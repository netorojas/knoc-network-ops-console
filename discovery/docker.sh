#!/usr/bin/env bash
# Orbiscale discovery — READ-ONLY. Copyright (C) 2026 Ernesto Athaualpa Rojas · SPDX-License-Identifier: AGPL-3.0-or-later
# Run on the Docker host. Only lists containers (docker ps); nothing is started or stopped.
set -euo pipefail
OUT=${OUT:-orbiscale-discovery}; mkdir -p "$OUT"
HOST=${HOST_NAME:-$(hostname)}; COUNTRY=${COUNTRY:-CLD}   # ALTERE AQUI
docker ps -a --format '{{json .}}' | python3 -c 'import sys,json; print(json.dumps([json.loads(l) for l in sys.stdin if l.strip()]))' > "$OUT/docker.raw.json"
python3 "$(dirname "$0")/normalize.py" docker "$OUT/docker.raw.json" --site "$HOST" --site-country "$COUNTRY" > "$OUT/docker.orbiscale.json"
