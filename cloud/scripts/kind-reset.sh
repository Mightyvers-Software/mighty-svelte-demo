#!/usr/bin/env bash

set -e

echo "Deleting deployment..."
kubectl delete deployment mighty-todo --ignore-not-found

echo "Deleting service..."
kubectl delete service mighty-todo --ignore-not-found

echo "Deleting PVC..."
kubectl delete pvc mighty-todo-pvc --ignore-not-found

echo "Recreating resources..."
kubectl apply -f cloud/kind/

echo "Waiting for deployment..."
kubectl rollout status deployment/mighty-todo

echo "Reset completed."