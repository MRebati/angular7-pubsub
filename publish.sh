#!/usr/bin/env bash

# Build project
npm run build

DESTDIR=./dist
cd DESTDIR

echo "====== PUBLISHING: angular2-pubusb ====="

npm publish angular2-pubsub --access public
echo "====== PUBLISHED: angular2-pubusb ====="
