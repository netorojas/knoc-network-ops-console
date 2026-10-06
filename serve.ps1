# Orbinoc — run locally (Windows PowerShell 5.1 / 7). Needs Python 3 (winget install Python.Python.3.12).
# SPDX-License-Identifier: AGPL-3.0-or-later
param([int]$Port = 8080)   # ALTERE AQUI se a porta estiver ocupada
Set-Location -Path $PSScriptRoot
$url = "http://localhost:$Port/?nologin"
Write-Host "Orbinoc -> $url   (Ctrl+C para parar)"
Start-Process $url
python -m http.server $Port --bind 127.0.0.1
