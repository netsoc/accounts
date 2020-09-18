#!/bin/bash
git clean -Xfd
npm install
npx @openapitools/openapi-generator-cli generate -i ./../iam/static/api.yaml -g javascript -o ./../client/api/
cd ../client/api/
npm install
npm link
cd ../../server
npm link ../client/api/
cd ../client/api/
npm run build
cd ../../server
npm install -g browserify
browserify main.js > bundle.js
