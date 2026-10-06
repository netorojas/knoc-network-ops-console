#!/usr/bin/env bash
# Orbinoc discovery — READ-ONLY. Copyright (C) 2026 Ernesto Athaualpa Rojas · SPDX-License-Identifier: AGPL-3.0-or-later
# Needs kubectl with a context bound to the built-in ClusterRole "view" (read-only). Works for EKS, AKS, GKE, OpenShift, RKE2, k3s…
set -euo pipefail
OUT=${OUT:-orbinoc-discovery}; mkdir -p "$OUT"
CLUSTER=${CLUSTER:-$(kubectl config current-context)}; COUNTRY=${COUNTRY:-CLD}   # ALTERE AQUI
kubectl get nodes,deployments,statefulsets,services -A -o json > "$OUT/k8s.raw.json"
python3 "$(dirname "$0")/normalize.py" kubernetes "$OUT/k8s.raw.json" --site "$CLUSTER" --site-country "$COUNTRY" > "$OUT/k8s.orbinoc.json"
