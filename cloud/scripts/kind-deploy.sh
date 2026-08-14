#!/usr/bin/env bash

set -e

echo "Deploying Kubernetes resources..."
kubectl apply -f cloud/kind/

echo "Waiting for deployment..."
kubectl rollout status deployment/mighty-todo

echo "Deployment completed."