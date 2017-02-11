#!/usr/bin/env bash

# Build project
npm run build

echo "====== PUBLISHING: angular2-pubusb ====="
npm publish ./dist --access public
echo "====== PUBLISHED: angular2-pubusb ====="
