#!/usr/bin/env bash

CURRENT_DIR=$(dirname $(readlink -f "$0"))
BASE_DIR="$(dirname "$CURRENT_DIR")"

source $CURRENT_DIR/envvars.sh

cd $BASE_DIR && rm -rf dist .serverless && npm run deploy
