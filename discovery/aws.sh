#!/usr/bin/env bash
# Orbiscale discovery — READ-ONLY. Copyright (C) 2026 Ernesto Athaualpa Rojas · SPDX-License-Identifier: AGPL-3.0-or-later
# Needs: AWS CLI v2 + python3. Identity: a role/user with the AWS managed policy "ReadOnlyAccess" (or "ViewOnlyAccess").
# Uses your current profile/SSO session (aws sso login). Nothing is created, changed or deleted. Secret VALUES are never read.
set -euo pipefail
OUT=${OUT:-orbiscale-discovery}; mkdir -p "$OUT"; RAW="$OUT/aws.raw.json"
REGIONS=${REGIONS:-$(aws ec2 describe-regions --query 'Regions[].RegionName' --output text)}   # ALTERE AQUI: REGIONS="us-east-1 sa-east-1"
python3 - "$RAW" $REGIONS <<'PY'
import json, subprocess, sys
def run(*a):
    try: return json.loads(subprocess.run(['aws', *a, '--output', 'json'], check=True, capture_output=True, text=True).stdout or '{}')
    except subprocess.CalledProcessError as e: sys.stderr.write(f"skip {' '.join(a[:2])}: {e.stderr.strip()[:120]}\n"); return {}
raw = {'s3': run('s3api', 'list-buckets')}
for r in sys.argv[2:]:
    R = ['--region', r]
    raw[r] = {'vpcs': run('ec2', 'describe-vpcs', *R), 'ec2': run('ec2', 'describe-instances', *R), 'rds': run('rds', 'describe-db-instances', *R),
              'eks': run('eks', 'list-clusters', *R).get('clusters', []), 'lambda': run('lambda', 'list-functions', *R),
              'elbv2': run('elbv2', 'describe-load-balancers', *R), 'secrets': run('secretsmanager', 'list-secrets', *R),
              'backup': run('backup', 'list-backup-vaults', *R)}
    print('region', r, 'ok', file=sys.stderr)
json.dump(raw, open(sys.argv[1], 'w'))
PY
python3 "$(dirname "$0")/normalize.py" aws "$RAW" > "$OUT/aws.orbiscale.json"
echo "Import $OUT/aws.orbiscale.json in Orbiscale → Settings → Discovery → Import file"
