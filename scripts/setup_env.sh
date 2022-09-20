#!/usr/bin/env bash
set -euo pipefail

# ========================================
# Configure, build, and run the mobile app
# ========================================

# Flags:
# -p: Platform (android or ios)
# -e (Optional): Name of the env to run
# -r (Optional): Use release build (by default uses debug). Note: on Android the release keystore needs to be present and the password in the env variable for this to work.
# -s (Optional): Name of the simulator to run (iOS only)

ENV_NAME="dev"

while getopts 'e' flag; do
  case "${flag}" in
    e) ENV_NAME="$OPTARG" ;;
    *) error "Unexpected option ${flag}" ;;
  esac
done

[ -z "$ENV_NAME" ] && echo "Need to set the PLATFORM via the -p flag" && exit 1;

ENV_FILENAME=".env.${ENV_NAME}"
eval "$(grep -v -e '^#' "$ENV_FILENAME" | xargs -I {} echo export \'{}\')"

echo "**************************"
echo "Current directory: $(pwd)"
echo "Environment: $ENV_FILENAME"
echo "**************************"