#!/bin/bash
git clean -Xfd
npm install
npx @openapitools/openapi-generator-cli generate -i ./../iam/static/api.yaml -g javascript -o ./../client/api/
cd ../client/api/
npm install
npm link
mkdir -p ../javascript/api
cd ../javascript/api
npm run build
