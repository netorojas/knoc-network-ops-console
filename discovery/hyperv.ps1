# Orbiscale discovery — READ-ONLY. Copyright (C) 2026 Ernesto Athaualpa Rojas · SPDX-License-Identifier: AGPL-3.0-or-later
# Run on a Hyper-V host or management server with the Hyper-V module (Get-VM needs the "Hyper-V Administrators" group).
# Only Get-* cmdlets are used.
param(
  [string[]]$Hosts  = @($env:COMPUTERNAME),   # ALTERE AQUI: 'hv01','hv02'
  [string]$Site     = 'London Office',        # ALTERE AQUI
  [string]$Country  = 'GB',                   # ALTERE AQUI
  [string]$Out      = 'orbiscale-discovery'
)
$ErrorActionPreference = 'Stop'
New-Item -ItemType Directory -Force -Path $Out | Out-Null
$slug = { param($s) (($s.ToLower() -replace '[^a-z0-9]+','-').Trim('-')) }
$sid = & $slug $Site; $nodes = @(); $links = @()
foreach ($h in $Hosts) {
  $hid = "hv-$(& $slug $h)"
  $nodes += [ordered]@{ id = $hid; name = $h; type = 'hyp'; site = $sid; country = $Country; vendor = 'Microsoft'; role = 'Hyper-V host' }
  foreach ($v in Get-VM -ComputerName $h) {
    $ip = (Get-VMNetworkAdapter -VM $v | Select-Object -ExpandProperty IPAddresses | Where-Object { $_ -match '^\d+\.' } | Select-Object -First 1)
    $id = "hvm-$(& $slug $v.Name)"
    $nodes += [ordered]@{ id = $id; name = $v.Name; type = 'vm'; site = $sid; country = $Country; vendor = 'Microsoft'
      role = "Hyper-V VM · $($v.State) · Gen $($v.Generation)"; ip = $ip }
    $links += [ordered]@{ a = $id; b = $hid; kind = 'host'; label = '' }
  }
}
[ordered]@{ schema = 'orbiscale-discovery/1'; source = 'hyperv'; generatedAt = (Get-Date).ToUniversalTime().ToString('o')
  sites = @([ordered]@{ id = $sid; name = $Site; kind = 'cpd'; country = $Country }); nodes = $nodes; links = $links } |
  ConvertTo-Json -Depth 6 | Set-Content -Encoding utf8 "$Out/hyperv.orbiscale.json"
Write-Host "OK: $($nodes.Count) resources -> $Out/hyperv.orbiscale.json"
