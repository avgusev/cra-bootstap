#!/usr/bin/env bash

# rm -rf dist
# rm -rf skdf-gis-component.tgz
# cp ../../skdf-gis-component/skdf-gis-component.tgz .
# npm i ./skdf-gis-component.tgz
# npm update skdf-gis-component
npm i
yarn link skdf-gis-component
npm run build
# rsync -av build/ root@dev.skdf:/var/www/skdf-bootstrap/ --delete
rsync -av dist/ root@dev.skdf:/var/www/skdf-bootstrap/ --delete
