#!/usr/bin/env bash
# Orbinoc — run locally (macOS / Linux). Static files only: no backend, no database, nothing leaves your machine.
# SPDX-License-Identifier: AGPL-3.0-or-later
set -euo pipefail
PORT=${PORT:-8080}          # ALTERE AQUI se a porta estiver ocupada
cd "$(dirname "$0")"
URL="http://localhost:$PORT/?nologin"
echo "Orbinoc → $URL   (Ctrl+C para parar)"
( sleep 1; command -v open >/dev/null && open "$URL" || xdg-open "$URL" >/dev/null 2>&1 || true ) &
exec python3 -m http.server "$PORT" --bind 127.0.0.1
