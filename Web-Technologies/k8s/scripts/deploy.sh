#!/bin/bash
# Deploy FHDW WTA exercises to Kubernetes
# Usage: ./deploy.sh [exercise]
# Examples:
#   ./deploy.sh uebung-01    # Docker networking demo
#   ./deploy.sh uebung-04    # Simple Flask webserver
#   ./deploy.sh uebung-06    # HTML webserver
#   ./deploy.sh uebung-07-08 # Meta Playlist UI (static)
#   ./deploy.sh uebung-09    # REST API server
#   ./deploy.sh uebung-10    # Flask + CouchDB
#   ./deploy.sh uebung-11    # Hello World nginx
#   ./deploy.sh uebung-12    # Full Meta Playlist (production)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
K8S_DIR="$(dirname "$SCRIPT_DIR")"
APPS_DIR="$K8S_DIR/apps"

EXERCISE="${1:-uebung-12}"

echo "=== Deploying $EXERCISE to Kubernetes ==="

# Check prerequisites
if ! command -v kubectl &> /dev/null; then
    echo "Error: kubectl not found"
    exit 1
fi

if ! kubectl cluster-info &> /dev/null; then
    echo "Error: Cannot connect to Kubernetes cluster"
    echo "Make sure Docker Desktop Kubernetes is enabled or minikube is running"
    exit 1
fi

echo "Cluster: $(kubectl config current-context)"

# Build Docker images based on exercise
build_and_load_image() {
    local image_name=$1
    local build_dir=$2

    echo ""
    echo "Building Docker image: $image_name..."
    docker build -t "$image_name" "$build_dir"

    # Load image into kind cluster if using kind
    if kubectl config current-context 2>/dev/null | grep -q "kind"; then
        echo "Loading image into kind cluster..."
        kind load docker-image "$image_name" --name desktop 2>/dev/null || \
        kind load docker-image "$image_name" 2>/dev/null || true
    fi
}

case "$EXERCISE" in
    uebung-04)
        build_and_load_image "simple-webserver:latest" "$APPS_DIR/uebung-04"
        ;;
    uebung-06)
        build_and_load_image "html-webserver:latest" "$APPS_DIR/uebung-06"
        ;;
    uebung-09)
        build_and_load_image "rest-api-server:latest" "$APPS_DIR/uebung-09"
        ;;
    uebung-10|uebung-12)
        build_and_load_image "meta-playlist:latest" "$APPS_DIR/uebung-10"
        ;;
esac

# Apply manifests
echo ""
echo "Applying Kubernetes manifests..."
kubectl apply -k "$K8S_DIR/overlays/$EXERCISE/"

# Wait for deployments based on exercise
echo ""
echo "Waiting for deployments..."
case "$EXERCISE" in
    uebung-01)
        kubectl -n fhdw-wta rollout status deployment/container1 --timeout=120s
        kubectl -n fhdw-wta rollout status deployment/container2 --timeout=120s
        ;;
    uebung-04)
        kubectl -n fhdw-wta rollout status deployment/simple-webserver --timeout=60s
        ;;
    uebung-06)
        kubectl -n fhdw-wta rollout status deployment/html-webserver --timeout=60s
        ;;
    uebung-07-08)
        kubectl -n fhdw-wta rollout status deployment/meta-playlist-ui --timeout=60s
        ;;
    uebung-09)
        kubectl -n fhdw-wta rollout status deployment/rest-api-server --timeout=60s
        ;;
    uebung-10)
        kubectl -n fhdw-wta rollout status deployment/couchdb --timeout=120s
        kubectl -n fhdw-wta rollout status deployment/flask-webserver --timeout=120s
        ;;
    uebung-11)
        kubectl -n fhdw-wta rollout status deployment/hello-nginx --timeout=60s
        ;;
    uebung-12)
        kubectl -n fhdw-wta rollout status deployment/couchdb --timeout=120s
        kubectl -n fhdw-wta rollout status deployment/flask-webserver --timeout=120s
        ;;
esac

# Show status
echo ""
echo "=== Deployment complete! ==="
kubectl -n fhdw-wta get all

# Show access information
echo ""
echo "=== Access ==="
case "$EXERCISE" in
    uebung-01)
        echo "Network Demo: Use kubectl exec to access containers"
        echo ""
        echo "=== Try These Commands ==="
        echo "kubectl -n fhdw-wta exec -it deploy/container1 -- bash"
        echo "  > ping container2"
        echo "  > nslookup container2"
        echo "  > ifconfig"
        ;;
    uebung-04)
        echo "Simple Webserver: http://localhost:30004"
        ;;
    uebung-06)
        echo "HTML Webserver: http://localhost:30006"
        ;;
    uebung-07-08)
        echo "Meta Playlist UI: http://localhost:30078"
        echo "(Uses localStorage - client-side only)"
        ;;
    uebung-09)
        echo "REST API Server: http://localhost:30009"
        echo ""
        echo "=== API Endpoints ==="
        echo "GET    /api/playlists        - List all"
        echo "POST   /api/playlists        - Create"
        echo "GET    /api/playlists/{name} - Get one"
        echo "PUT    /api/playlists/{name} - Update"
        echo "DELETE /api/playlists/{name} - Delete"
        ;;
    uebung-10)
        echo "Meta Playlist (CouchDB): http://localhost:30010"
        echo ""
        echo "=== Useful Commands ==="
        echo "View logs:    kubectl -n fhdw-wta logs -l component=webserver"
        echo "CouchDB logs: kubectl -n fhdw-wta logs -l component=database"
        ;;
    uebung-11)
        echo "Hello World: http://localhost:30080"
        ;;
    uebung-12)
        echo "Meta Playlist App: http://localhost:30001"
        echo ""
        echo "=== Useful Commands ==="
        echo "View HPA status:  kubectl -n fhdw-wta get hpa"
        echo "View pod logs:    kubectl -n fhdw-wta logs -l component=webserver"
        echo "Scale manually:   kubectl -n fhdw-wta scale deployment/flask-webserver --replicas=3"
        ;;
esac
echo ""
echo "Cleanup: ./scripts/cleanup.sh $EXERCISE"
echo ""
