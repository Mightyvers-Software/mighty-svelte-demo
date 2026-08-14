#!/usr/bin/env bash

set -e

echo "Starting port-forward..."
kubectl port-forward service/mighty-todo 3000:3000