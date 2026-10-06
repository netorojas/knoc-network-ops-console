#!/usr/bin/env python3
# Orbinoc · Network Ops Console — discovery normalizer
# Copyright (C) 2026 Ernesto Athaualpa Rojas (Neto)
# SPDX-License-Identifier: AGPL-3.0-or-later
"""Turns the raw, READ-ONLY output of each platform CLI into one Orbinoc import file.

    python3 normalize.py <platform> <raw.json> [--site-country BR] > <platform>.orbinoc.json

platform: aws | azure | gcp | oci | ibm | proxmox | nutanix | kubernetes | docker | terraform | ansible | vsphere | hyperv
The output follows the schema "orbinoc-discovery/1": {schema, source, generatedAt, sites[], nodes[], links[]}.
Secrets are never read: only resource metadata (names, types, regions, private IPs, tags).
"""
import json, re, sys, datetime

# region -> (country, lat, lon, label). Unknown regions fall back to the "cloud" area of the map.
REGIONS = {
    'aws': {'us-east-1': ('US', 38.95, -77.45, 'N. Virginia'), 'us-east-2': ('US', 40.0, -83.0, 'Ohio'), 'us-west-2': ('US', 45.6, -121.2, 'Oregon'),
            'ca-central-1': ('CA', 45.5, -73.6, 'Montréal'), 'sa-east-1': ('BR', -23.5, -46.6, 'São Paulo'), 'eu-west-1': ('IE', 53.3, -6.3, 'Ireland'),
            'eu-west-2': ('GB', 51.5, -0.1, 'London'), 'eu-central-1': ('DE', 50.1, 8.7, 'Frankfurt'), 'eu-west-3': ('FR', 48.9, 2.4, 'Paris'),
            'ap-southeast-1': ('SG', 1.35, 103.8, 'Singapore'), 'ap-east-1': ('HK', 22.3, 114.2, 'Hong Kong'), 'ap-northeast-1': ('JP', 35.7, 139.7, 'Tokyo'),
            'ap-south-1': ('IN', 19.1, 72.9, 'Mumbai'), 'ap-southeast-2': ('AU', -33.9, 151.2, 'Sydney'), 'me-central-1': ('AE', 25.2, 55.3, 'UAE'),
            'af-south-1': ('ZA', -33.9, 18.4, 'Cape Town'), 'mx-central-1': ('MX', 20.6, -100.4, 'Querétaro')},
    'azure': {'eastus': ('US', 37.4, -79.0, 'Virginia'), 'eastus2': ('US', 36.7, -78.4, 'Virginia'), 'westus2': ('US', 47.2, -119.9, 'Washington'),
              'brazilsouth': ('BR', -23.5, -46.6, 'São Paulo'), 'canadacentral': ('CA', 43.7, -79.4, 'Toronto'), 'westeurope': ('NL', 52.4, 4.9, 'Amsterdam'),
              'northeurope': ('IE', 53.3, -6.3, 'Dublin'), 'uksouth': ('GB', 51.5, -0.1, 'London'), 'germanywestcentral': ('DE', 50.1, 8.7, 'Frankfurt'),
              'francecentral': ('FR', 46.3, 2.4, 'Paris'), 'southeastasia': ('SG', 1.3, 103.8, 'Singapore'), 'eastasia': ('HK', 22.3, 114.2, 'Hong Kong'),
              'japaneast': ('JP', 35.7, 139.8, 'Tokyo'), 'centralindia': ('IN', 18.6, 73.9, 'Pune'), 'australiaeast': ('AU', -33.9, 151.2, 'Sydney'),
              'uaenorth': ('AE', 25.3, 55.3, 'Dubai'), 'southafricanorth': ('ZA', -25.7, 28.2, 'Johannesburg'), 'mexicocentral': ('MX', 20.6, -100.4, 'Querétaro')},
    'gcp': {'us-east4': ('US', 39.0, -77.5, 'N. Virginia'), 'us-central1': ('US', 41.3, -95.9, 'Iowa'), 'southamerica-east1': ('BR', -23.5, -46.6, 'São Paulo'),
            'europe-west1': ('BE', 50.4, 3.8, 'Belgium'), 'europe-west2': ('GB', 51.5, -0.1, 'London'), 'europe-west3': ('DE', 50.1, 8.7, 'Frankfurt'),
            'europe-west4': ('NL', 53.4, 6.8, 'Netherlands'), 'asia-east2': ('HK', 22.3, 114.2, 'Hong Kong'), 'asia-southeast1': ('SG', 1.35, 103.8, 'Singapore'),
            'asia-northeast1': ('JP', 35.7, 139.7, 'Tokyo'), 'australia-southeast1': ('AU', -33.9, 151.2, 'Sydney'), 'me-central1': ('QA', 25.3, 51.5, 'Doha')},
    'oci': {'sa-saopaulo-1': ('BR', -23.5, -46.6, 'São Paulo'), 'sa-vinhedo-1': ('BR', -23.0, -46.97, 'Vinhedo'), 'us-ashburn-1': ('US', 39.0, -77.5, 'Ashburn'),
            'us-phoenix-1': ('US', 33.4, -112.1, 'Phoenix'), 'eu-frankfurt-1': ('DE', 50.1, 8.7, 'Frankfurt'), 'uk-london-1': ('GB', 51.5, -0.1, 'London'),
            'ap-singapore-1': ('SG', 1.35, 103.8, 'Singapore'), 'ap-tokyo-1': ('JP', 35.7, 139.7, 'Tokyo'), 'me-dubai-1': ('AE', 25.2, 55.3, 'Dubai'),
            'mx-queretaro-1': ('MX', 20.6, -100.4, 'Querétaro')},
    'ibm': {'us-south': ('US', 32.8, -96.8, 'Dallas'), 'us-east': ('US', 38.9, -77.0, 'Washington DC'), 'eu-de': ('DE', 50.1, 8.7, 'Frankfurt'),
            'eu-gb': ('GB', 51.5, -0.1, 'London'), 'eu-es': ('ES', 40.4, -3.7, 'Madrid'), 'br-sao': ('BR', -23.5, -46.6, 'São Paulo'),
            'jp-tok': ('JP', 35.7, 139.7, 'Tokyo'), 'au-syd': ('AU', -33.9, 151.2, 'Sydney'), 'ca-tor': ('CA', 43.7, -79.4, 'Toronto')},
}
PROVIDER = {'aws': 'AWS', 'azure': 'Microsoft Azure', 'gcp': 'Google Cloud', 'oci': 'Oracle Cloud', 'ibm': 'IBM Cloud'}

def slug(x):
    return re.sub(r'[^a-z0-9]+', '-', str(x).lower()).strip('-')[:60] or 'x'

class Out:
    def __init__(self, source):
        self.source, self.sites, self.nodes, self.links = source, {}, {}, []
    def region(self, prov, region):
        if not region:
            sid = f'{prov}-global'
            self.sites.setdefault(sid, {'id': sid, 'name': f'{PROVIDER.get(prov, prov)} · global', 'kind': 'cloud', 'country': 'CLD', 'short': PROVIDER.get(prov, prov), 'provider': PROVIDER.get(prov, prov)})
            return sid, 'CLD'
        cc, lat, lon, label = REGIONS.get(prov, {}).get(region, ('CLD', None, None, region))
        sid = f'{prov}-{slug(region)}'
        site = {'id': sid, 'name': f'{PROVIDER.get(prov, prov)} · {region} ({label})', 'kind': 'cloud', 'country': cc,
                'short': f'{PROVIDER.get(prov, prov).split()[0]} {region}', 'provider': PROVIDER.get(prov, prov)}
        if lat is not None: site.update(lat=lat, lon=lon)
        self.sites.setdefault(sid, site)
        return sid, cc
    def node(self, nid, name, type_, site, country, vendor, role='', ip=None, fqdn=None, tags=None, **kw):
        d = {'id': slug(nid), 'name': str(name)[:80], 'type': type_, 'site': site, 'country': country, 'vendor': vendor, 'provider': vendor, 'role': role}
        if ip: d['ip'] = ip
        if fqdn: d['fqdn'] = fqdn
        if tags: d['tags'] = tags if isinstance(tags, str) else ','.join(f'{k}={v}' for k, v in list(tags.items())[:8])
        d.update({k: v for k, v in kw.items() if v not in (None, '')})
        self.nodes[d['id']] = d
        return d['id']
    def link(self, a, b, kind='host', label=''):
        self.links.append({'a': slug(a), 'b': slug(b), 'kind': kind, 'label': label})
    def dump(self):
        known = set(self.nodes)
        return {'schema': 'orbinoc-discovery/1', 'source': self.source, 'generatedAt': datetime.datetime.now(datetime.timezone.utc).isoformat(timespec='seconds'),
                'sites': list(self.sites.values()), 'nodes': list(self.nodes.values()),
                'links': [l for l in self.links if l['a'] in known and l['b'] in known]}

def first(*vals):
    for v in vals:
        if v: return v
    return None

# ---------------------------------------------------------------- clouds
def aws(raw, o):
    """raw = {"<region>": {"ec2": describe-instances, "rds": ..., "eks": [...], "lambda": ..., "elbv2": ..., "vpcs": ..., "secrets": ..., "backup": ...}, "s3": list-buckets}"""
    for region, r in raw.items():
        if region == 's3': continue
        sid, cc = o.region('aws', region)
        for v in (r.get('vpcs') or {}).get('Vpcs', []):
            o.node(v['VpcId'], tagname(v.get('Tags')) or v['VpcId'], 'vnet', sid, cc, 'AWS', 'VPC', cidr=v.get('CidrBlock'))
        for res in (r.get('ec2') or {}).get('Reservations', []):
            for i in res.get('Instances', []):
                n = o.node(i['InstanceId'], tagname(i.get('Tags')) or i['InstanceId'], 'vm', sid, cc, 'AWS', f"EC2 {i.get('InstanceType', '')} · {i.get('State', {}).get('Name', '')}",
                           ip=i.get('PrivateIpAddress'))
                if i.get('VpcId'): o.link(n, i['VpcId'])
        for d in (r.get('rds') or {}).get('DBInstances', []):
            o.node(d['DBInstanceIdentifier'], d['DBInstanceIdentifier'], 'db', sid, cc, 'AWS', f"RDS {d.get('Engine', '')} {d.get('EngineVersion', '')}",
                   fqdn=(d.get('Endpoint') or {}).get('Address'))
        for c in r.get('eks') or []:
            name = c.get('name') if isinstance(c, dict) else c
            o.node(f'eks-{region}-{name}', name, 'k8s', sid, cc, 'AWS', 'Amazon EKS')
        for f in (r.get('lambda') or {}).get('Functions', []):
            o.node(f['FunctionArn'], f['FunctionName'], 'fn', sid, cc, 'AWS', f"Lambda · {f.get('Runtime', '')}")
        for lb in (r.get('elbv2') or {}).get('LoadBalancers', []):
            o.node(lb['LoadBalancerArn'], lb['LoadBalancerName'], 'lb', sid, cc, 'AWS', f"ELB {lb.get('Type', '')}", fqdn=lb.get('DNSName'))
        for s in (r.get('secrets') or {}).get('SecretList', []):
            o.node(s['ARN'], s['Name'], 'kv', sid, cc, 'AWS', 'Secrets Manager (metadata only)')
        for b in (r.get('backup') or {}).get('BackupVaultList', []):
            o.node(b['BackupVaultArn'], b['BackupVaultName'], 'bkp', sid, cc, 'AWS', f"AWS Backup · {b.get('NumberOfRecoveryPoints', 0)} recovery points")
    gsid, _ = o.region('aws', None)
    for b in (raw.get('s3') or {}).get('Buckets', []):
        o.node(f"s3-{b['Name']}", f"s3://{b['Name']}", 'obj', gsid, 'CLD', 'AWS', 'Amazon S3 bucket')

def tagname(tags):
    for t in tags or []:
        if t.get('Key') == 'Name': return t.get('Value')

AZ = {'microsoft.compute/virtualmachines': 'vm', 'microsoft.network/virtualnetworks': 'vnet', 'microsoft.containerservice/managedclusters': 'k8s',
      'microsoft.web/sites': 'app', 'microsoft.sql/servers': 'db', 'microsoft.sql/servers/databases': 'db', 'microsoft.dbforpostgresql/flexibleservers': 'db',
      'microsoft.documentdb/databaseaccounts': 'db', 'microsoft.storage/storageaccounts': 'obj', 'microsoft.keyvault/vaults': 'kv',
      'microsoft.recoveryservices/vaults': 'bkp', 'microsoft.dataprotection/backupvaults': 'bkp', 'microsoft.botservice/botservices': 'bot',
      'microsoft.cognitiveservices/accounts': 'bot', 'microsoft.network/loadbalancers': 'lb', 'microsoft.network/applicationgateways': 'lb',
      'microsoft.network/azurefirewalls': 'fw', 'microsoft.network/frontdoors': 'cdn', 'microsoft.cdn/profiles': 'cdn', 'microsoft.apimanagement/service': 'apigw',
      'microsoft.network/virtualnetworkgateways': 'vpngw', 'microsoft.hybridcompute/machines': 'srv', 'microsoft.app/containerapps': 'ctr',
      'microsoft.containerinstance/containergroups': 'ctr', 'microsoft.web/serverfarms': None}

def azure(raw, o):
    """raw = az graph query output: {"data": [{id,name,type,location,resourceGroup,subscriptionId,tags}]} or a plain list"""
    rows = raw.get('data', raw) if isinstance(raw, dict) else raw
    for r in rows:
        t = AZ.get(str(r.get('type', '')).lower(), 'cloud')
        if t is None: continue
        sid, cc = o.region('azure', r.get('location'))
        o.node(r['id'], r['name'], t, sid, cc, 'Microsoft Azure', f"{r.get('type', '').split('/')[-1]} · rg {r.get('resourceGroup', '')}", tags=r.get('tags'))

GCP = {'compute.googleapis.com/Instance': 'vm', 'compute.googleapis.com/Network': 'vnet', 'container.googleapis.com/Cluster': 'k8s',
       'sqladmin.googleapis.com/Instance': 'db', 'bigquery.googleapis.com/Dataset': 'db', 'storage.googleapis.com/Bucket': 'obj',
       'run.googleapis.com/Service': 'app', 'cloudfunctions.googleapis.com/Function': 'fn', 'secretmanager.googleapis.com/Secret': 'kv',
       'aiplatform.googleapis.com/Endpoint': 'bot', 'compute.googleapis.com/ForwardingRule': 'lb', 'compute.googleapis.com/VpnGateway': 'vpngw'}

def gcp(raw, o):
    """raw = gcloud asset search-all-resources --format=json (list)"""
    for r in raw:
        t = GCP.get(r.get('assetType'))
        if not t: continue
        loc = r.get('location') or ''
        region = re.sub(r'-[a-z]$', '', loc) if loc not in ('global', '') else None
        sid, cc = o.region('gcp', region)
        o.node(r['name'], r.get('displayName') or r['name'].split('/')[-1], t, sid, cc, 'Google Cloud', r['assetType'].split('/')[-1], tags=r.get('labels'))

OCI = {'Instance': 'vm', 'Vcn': 'vnet', 'AutonomousDatabase': 'db', 'DbSystem': 'db', 'Bucket': 'obj', 'Vault': 'kv', 'ClusterCluster': 'k8s',
       'LoadBalancer': 'lb', 'FunctionsFunction': 'fn', 'Drg': 'vpngw', 'BootVolumeBackup': 'bkp', 'VolumeBackup': 'bkp'}

def oci(raw, o, region=None):
    """raw = oci search resource structured-search --query-text "query all resources" (data.items[])"""
    items = ((raw.get('data') or {}).get('items')) if isinstance(raw, dict) else raw
    for r in items or []:
        t = OCI.get(r.get('resource-type'))
        if not t or r.get('lifecycle-state') in ('TERMINATED', 'DELETED'): continue
        reg = region or (re.search(r'oc1\.([a-z0-9-]+)\.', r.get('identifier', '')) or [None, None])[1]
        reg = {'sa-saopaulo-1': 'sa-saopaulo-1', 'iad': 'us-ashburn-1', 'gru': 'sa-saopaulo-1', 'fra': 'eu-frankfurt-1'}.get(reg, reg)
        sid, cc = o.region('oci', reg)
        o.node(r['identifier'], r.get('display-name') or r['identifier'][-12:], t, sid, cc, 'Oracle Cloud', r['resource-type'])

def ibm(raw, o):
    """raw = {"instances": ibmcloud is instances --output json, "services": ibmcloud resource service-instances --output json}"""
    for i in raw.get('instances') or []:
        reg = re.sub(r'-\d$', '', (i.get('zone') or {}).get('name', '')) or None
        sid, cc = o.region('ibm', reg)
        ip = ((i.get('primary_network_interface') or {}).get('primary_ip') or {}).get('address')
        o.node(i['id'], i['name'], 'vm', sid, cc, 'IBM Cloud', f"VSI {(i.get('profile') or {}).get('name', '')}", ip=ip)
    m = {'cloud-object-storage': 'obj', 'kms': 'kv', 'hs-crypto': 'kv', 'databases-for-postgresql': 'db', 'conversation': 'bot', 'containers-kubernetes': 'k8s',
         'openshift': 'k8s', 'secrets-manager': 'kv', 'logdna': 'mon', 'sysdig-monitor': 'mon'}
    for s in raw.get('services') or []:
        t = next((v for k, v in m.items() if k in json.dumps(s)), 'cloud')
        sid, cc = o.region('ibm', s.get('region_id'))
        o.node(s.get('guid') or s['id'], s['name'], t, sid, cc, 'IBM Cloud', 'IBM Cloud service')

# ---------------------------------------------------------------- on-prem / containers / IaC
def onprem_site(o, site, country):
    sid = slug(site or 'onprem')
    o.sites.setdefault(sid, {'id': sid, 'name': site or 'On-premise', 'kind': 'cpd', 'country': country})
    return sid

def proxmox(raw, o, site=None, country='CLD'):
    """raw = pvesh get /cluster/resources --output-format json"""
    sid = onprem_site(o, site or 'Proxmox cluster', country)
    for r in raw:
        t = {'node': 'hyp', 'qemu': 'vm', 'lxc': 'ctr', 'storage': 'stor'}.get(r.get('type'))
        if not t: continue
        name = r.get('name') or r.get('node') or r.get('storage') or r['id']
        n = o.node('pve-' + r['id'], name, t, sid, country, 'Proxmox', f"{r.get('type')} · {r.get('status', '')} · node {r.get('node', '')}")
        if t in ('vm', 'ctr') and r.get('node'): o.link(n, 'pve-node/' + r['node'])

def nutanix(raw, o, site=None, country='CLD'):
    """raw = Prism Central POST /api/nutanix/v3/vms/list response"""
    sid = onprem_site(o, site or 'Nutanix cluster', country)
    for e in raw.get('entities', []):
        spec = e.get('spec', {}); st = e.get('status', {})
        ips = [ip.get('ip') for nic in (st.get('resources') or {}).get('nic_list', []) for ip in nic.get('ip_endpoint_list', [])]
        o.node('ntnx-' + e['metadata']['uuid'], spec.get('name', 'vm'), 'vm', sid, country, 'Nutanix', f"AHV VM · {(spec.get('cluster_reference') or {}).get('name', '')}", ip=first(*ips))

def kubernetes(raw, o, site=None, country='CLD'):
    """raw = kubectl get nodes,deployments,statefulsets,services -A -o json"""
    sid = onprem_site(o, site or 'Kubernetes cluster', country)
    cl = o.node('k8s-' + slug(site or 'cluster'), site or 'kubernetes', 'k8s', sid, country, 'Kubernetes', 'Cluster')
    for it in raw.get('items', []):
        k, md = it.get('kind'), it.get('metadata', {})
        if k == 'Node':
            ip = next((a['address'] for a in it.get('status', {}).get('addresses', []) if a.get('type') == 'InternalIP'), None)
            n = o.node('k8n-' + md['name'], md['name'], 'srv', sid, country, 'Kubernetes', 'Node · ' + it.get('status', {}).get('nodeInfo', {}).get('kubeletVersion', ''), ip=ip)
        elif k in ('Deployment', 'StatefulSet'):
            n = o.node(f"k8w-{md.get('namespace')}-{md['name']}", f"{md.get('namespace')}/{md['name']}", 'ctr', sid, country, 'Kubernetes', f"{k} · {it.get('spec', {}).get('replicas', '?')} replicas")
        elif k == 'Service' and it.get('spec', {}).get('type') == 'LoadBalancer':
            n = o.node(f"k8s-svc-{md.get('namespace')}-{md['name']}", f"svc {md['name']}", 'lb', sid, country, 'Kubernetes', 'Service LoadBalancer')
        else:
            continue
        o.link(n, cl)

def docker(raw, o, site=None, country='CLD'):
    """raw = list of `docker ps -a --format '{{json .}}'` objects"""
    sid = onprem_site(o, site or 'Docker host', country)
    h = o.node('dkr-' + slug(site or 'host'), site or 'docker-host', 'ctr', sid, country, 'Docker', 'Docker host')
    for c in raw:
        n = o.node('dkc-' + c.get('ID', c.get('Names')), c.get('Names'), 'ctr', sid, country, 'Docker', f"{c.get('Image')} · {c.get('State', c.get('Status', ''))}")
        o.link(n, h)

TF = {'aws_instance': 'vm', 'aws_vpc': 'vnet', 'aws_db_instance': 'db', 'aws_s3_bucket': 'obj', 'aws_eks_cluster': 'k8s', 'aws_lambda_function': 'fn',
      'azurerm_linux_virtual_machine': 'vm', 'azurerm_windows_virtual_machine': 'vm', 'azurerm_virtual_network': 'vnet', 'azurerm_kubernetes_cluster': 'k8s',
      'azurerm_key_vault': 'kv', 'azurerm_storage_account': 'obj', 'azurerm_mssql_database': 'db', 'google_compute_instance': 'vm',
      'google_container_cluster': 'k8s', 'google_storage_bucket': 'obj', 'google_sql_database_instance': 'db', 'oci_core_instance': 'vm',
      'ibm_is_instance': 'vm', 'vsphere_virtual_machine': 'vm', 'proxmox_vm_qemu': 'vm', 'kubernetes_deployment': 'ctr', 'fortios_firewall_policy': None}

def terraform(raw, o):
    """raw = terraform show -json (state)"""
    def walk(mod):
        for r in mod.get('resources', []):
            t = TF.get(r.get('type'))
            if not t: continue
            v = r.get('values') or {}
            prov = r['type'].split('_')[0]
            pmap = {'aws': 'aws', 'azurerm': 'azure', 'google': 'gcp', 'oci': 'oci', 'ibm': 'ibm'}
            if prov in pmap:
                sid, cc = o.region(pmap[prov], v.get('region') or v.get('location') or (v.get('zone') or '')[:-2] or None)
                vend = PROVIDER[pmap[prov]]
            else:
                sid, cc = onprem_site(o, 'Terraform-managed', 'CLD'), 'CLD'; vend = prov
            o.node('tf-' + r['address'], v.get('name') or r['name'], t, sid, cc, vend, 'Terraform · ' + r['address'], ip=v.get('private_ip') or v.get('default_ip_address'), iac='terraform')
        for c in mod.get('child_modules', []): walk(c)
    walk(((raw.get('values') or {}).get('root_module')) or {})

def ansible(raw, o):
    """raw = ansible-inventory -i <inv> --list"""
    hv = (raw.get('_meta') or {}).get('hostvars', {})
    for g, d in raw.items():
        if g in ('_meta', 'all', 'ungrouped') or not isinstance(d, dict): continue
        sid = onprem_site(o, f'Ansible group {g}', 'CLD')
        for h in d.get('hosts', []):
            v = hv.get(h, {})
            o.node('ans-' + h, h, v.get('orbinoc_type', 'srv'), sid, v.get('orbinoc_country', 'CLD'), v.get('vendor', 'Ansible inventory'), 'group ' + g, ip=v.get('ansible_host'))

def passthrough(raw, o):
    """vsphere.ps1 / hyperv.ps1 already emit orbinoc-discovery/1"""
    for s in raw.get('sites', []): o.sites[s['id']] = s
    for n in raw.get('nodes', []): o.nodes[n['id']] = n
    o.links.extend(raw.get('links', []))

FN = {'aws': aws, 'azure': azure, 'gcp': gcp, 'oci': oci, 'ibm': ibm, 'proxmox': proxmox, 'nutanix': nutanix, 'kubernetes': kubernetes,
      'docker': docker, 'terraform': terraform, 'ansible': ansible, 'vsphere': passthrough, 'hyperv': passthrough}

def main(argv):
    if len(argv) < 3 or argv[1] not in FN:
        sys.stderr.write(__doc__); return 2
    plat, path = argv[1], argv[2]
    kw = {}
    if '--site' in argv: kw['site'] = argv[argv.index('--site') + 1]
    if '--site-country' in argv: kw['country'] = argv[argv.index('--site-country') + 1].upper()
    raw = json.load(open(path)) if path != '-' else json.load(sys.stdin)
    o = Out(plat)
    f = FN[plat]
    f(raw, o, **kw) if plat in ('proxmox', 'nutanix', 'kubernetes', 'docker') else f(raw, o)
    json.dump(o.dump(), sys.stdout, ensure_ascii=False, indent=1)
    sys.stderr.write(f'[orbinoc] {plat}: {len(o.nodes)} resources, {len(o.sites)} sites/regions\n')
    return 0

if __name__ == '__main__':
    sys.exit(main(sys.argv))
