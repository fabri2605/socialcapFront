#!/usr/bin/env bash

# Push a Socialcap PROD
cp prod-config.ts ./src/lib/apis/config.ts

# first build it
npm run build

# deploy to Socialcap server
rsync -vh -az ./build/ socialcap:~/ui/build
rsync -vh -az ./docker/ socialcap:~/ui/docker
scp ./package.json socialcap:~/ui/package.json

