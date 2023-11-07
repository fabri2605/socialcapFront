#!/usr/bin/env bash

# Push a Socialcap PROD
cp env.dev.ts ./src/lib/apis/config.ts

npm run dev

