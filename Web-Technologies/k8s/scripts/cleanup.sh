#!/bin/bash
# Cleanup/teardown script for FHDW WTA Kubernetes exercises

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
K8S_DIR="$(dirname "$SCRIPT_DIR")"

EXERCISE="${1:-all}"

echo "=== Cleaning up Kubernetes resources ==="

# Check prerequisites
if ! command -v kubectl &> /dev/null; then
    echo "Error: kubectl not found"
    exit 1
fi

if ! kubectl cluster-info &> /dev/null; then
    echo "Error: Cannot connect to Kubernetes cluster"
    exit 1
fi

echo "Cluster: $(kubectl config current-context)"
echo ""

cleanup_exercise() {
    local exercise=$1
    echo "Cleaning up $exercise..."

    if [ -d "$K8S_DIR/overlays/$exercise" ]; then
        kubectl delete -k "$K8S_DIR/overlays/$exercise/" --ignore-not-found=true
        echo "$exercise cleaned up!"
    else
        echo "Warning: Overlay $exercise not found, skipping..."
    fi
}

if [ "$EXERCISE" = "all" ]; then
    echo "Cleaning up all exercises..."
    echo ""

    # Clean up uebung-12
    cleanup_exercise "uebung-12"
    echo ""

    # Clean up uebung-11
    cleanup_exercise "uebung-11"
    echo ""

    # Optionally delete the namespace (removes everything)
    read -p "Delete namespace 'fhdw-wta'? This removes ALL resources. [y/N] " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        kubectl delete namespace fhdw-wta --ignore-not-found=true
        echo "Namespace deleted!"
    fi
else
    cleanup_exercise "$EXERCISE"
fi

echo ""
echo "=== Cleanup complete! ==="

# Show remaining resources
echo ""
echo "Remaining resources in fhdw-wta namespace:"
kubectl -n fhdw-wta get all 2>/dev/null || echo "(namespace may be deleted)"
