#!/bin/sh
set -e

ln -sf ../node_modules node_modules
exec yarn run serve "$@"
