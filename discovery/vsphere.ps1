# Orbinoc discovery — READ-ONLY. Copyright (C) 2026 Ernesto Athaualpa Rojas · SPDX-License-Identifier: AGPL-3.0-or-later
# Needs: VMware PowerCLI (Install-Module VMware.PowerCLI -Scope CurrentUser). Account: vCenter role "Read-only".
# The password is asked by Get-Credential and is never written anywhere.
param(
  [string]$VCenter = 'vcsa.contoso.example',   # ALTERE AQUI
  [string]$Site    = 'Frankfurt DC',           # ALTERE AQUI
  [string]$Country = 'DE',                     # ALTERE AQUI (ISO 3166)
  [string]$Out     = 'orbinoc-discovery'
)
$ErrorActionPreference = 'Stop'
New-Item -ItemType Directory -Force -Path $Out | Out-Null
Connect-VIServer -Server $VCenter -Credential (Get-Credential -Message "vCenter read-only account") | Out-Null
$slug = { param($s) (($s.ToLower() -replace '[^a-z0-9]+','-').Trim('-')) }
$sid = & $slug $Site
$nodes = @(); $links = @()
foreach ($h in Get-VMHost) {
  $nodes += [ordered]@{ id = "esx-$(& $slug $h.Name)"; name = $h.Name; type = 'hyp'; site = $sid; country = $Country; vendor = 'VMware'
    role = "ESXi $($h.Version) · $($h.ConnectionState)"; model = "$($h.Manufacturer) $($h.Model)" }
}
foreach ($v in Get-VM) {
  $id = "vm-$(& $slug $v.Name)"
  $nodes += [ordered]@{ id = $id; name = $v.Name; type = 'vm'; site = $sid; country = $Country; vendor = 'VMware'
    role = "VM · $($v.PowerState) · $($v.NumCpu) vCPU / $($v.MemoryGB) GB"; ip = ($v.Guest.IPAddress | Where-Object { $_ -match '^\d+\.' } | Select-Object -First 1)
    os = $v.Guest.OSFullName }
  if ($v.VMHost) { $links += [ordered]@{ a = $id; b = "esx-$(& $slug $v.VMHost.Name)"; kind = 'host'; label = '' } }
}
foreach ($d in Get-Datastore) {
  $nodes += [ordered]@{ id = "ds-$(& $slug $d.Name)"; name = $d.Name; type = 'stor'; site = $sid; country = $Country; vendor = 'VMware'
    role = "Datastore $($d.Type) · $([math]::Round($d.FreeSpaceGB)) GB free of $([math]::Round($d.CapacityGB))" }
}
Disconnect-VIServer -Confirm:$false
[ordered]@{ schema = 'orbinoc-discovery/1'; source = 'vsphere'; generatedAt = (Get-Date).ToUniversalTime().ToString('o')
  sites = @([ordered]@{ id = $sid; name = $Site; kind = 'cpd'; country = $Country }); nodes = $nodes; links = $links } |
  ConvertTo-Json -Depth 6 | Set-Content -Encoding utf8 "$Out/vsphere.orbinoc.json"
Write-Host "OK: $($nodes.Count) resources -> $Out/vsphere.orbinoc.json"
