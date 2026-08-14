#!/usr/bin/env bash

set -e

IMAGE_NAME="mighty-todo:local"
CLUSTER_NAME="mighty-todo"

echo "Building Docker image..."
docker build -t ${IMAGE_NAME} .

echo "Loading image into Kind cluster..."
kind load docker-image ${IMAGE_NAME} --name ${CLUSTER_NAME}

echo "Image loaded successfully."