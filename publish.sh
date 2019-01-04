#!/usr/bin/env bash

# Build project
npm run build

echo "====== PUBLISHING: ngx-pubsub ====="
npm publish ./dist --access public
echo "====== PUBLISHED: ngx-pubsub ====="
