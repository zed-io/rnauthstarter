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

PLATFORM=""
ENV_NAME="dev"
RELEASE=false
SIMULATOR=""

while getopts 'a:p:e:s:r' flag; do
  case "${flag}" in
    p) PLATFORM="$OPTARG" ;;
    e) ENV_NAME="$OPTARG" ;;
    s) SIMULATOR="$OPTARG" ;;
    r) RELEASE=true ;;
    *) error "Unexpected option ${flag}" ;;
  esac
done

[ -z "$PLATFORM" ] && echo "Need to set the PLATFORM via the -p flag" && exit 1;

# Get machine type (needed later)
if [ -z "${MACHINE-}" ]; then
  unameOut="$(uname -s)"
  case "${unameOut}" in
    Linux*)     MACHINE=Linux;;
    Darwin*)    MACHINE=Mac;;
    CYGWIN*)    MACHINE=Cygwin;;
    MINGW*)     MACHINE=MinGw;;
    *)          MACHINE="UNKNOWN:${unameOut}"
  esac
fi

# Read values from the .env file and put them in env vars
ENV_FILENAME=".env.${ENV_NAME}"
# From https://stackoverflow.com/a/56229034/158525
# Supports vars with spaces and single or double quotes
eval "$(grep -v -e '^#' "$ENV_FILENAME" | xargs -I {} echo export \'{}\')"

echo "**************************"
echo "Current directory: $(pwd)"
echo "Machine type: $MACHINE"
echo "Environment: $ENV_FILENAME"
echo "Platform: $PLATFORM"
echo "**************************"

# Build the app and run it
if [ "$PLATFORM" = "android" ]; then
  yarn expo:android
elif [ "$PLATFORM" = "ios" ]; then
  yarn expo:ios
else
  echo "Invalid value for platform, must be 'android' or 'ios'"
  exit 1
fi

