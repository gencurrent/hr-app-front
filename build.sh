#!/bin/sh

DESTINATION_DIR=$1
npm run build
mkdir -p $DESTINATION_DIR
cp -r build/* $DESTINATION_DIR