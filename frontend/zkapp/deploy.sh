#!/usr/bin/env bash

# Push a Socialcap PROD
cp prod-config.ts ./src/lib/apis/config.ts

# first build it
npm run build

# deploy to QA
rsync -vh -az ./build/ socialcap:~/ui
