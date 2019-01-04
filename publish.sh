#!/usr/bin/env bash

# Build project
npm run build

echo "====== PUBLISHING: angular7-pubsub ====="
npm publish ./dist --access public
echo "====== PUBLISHED: angular7-pubsub ====="
