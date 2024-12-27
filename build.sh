#!/bin/bash

build() {
  APP_NAME="entresano.app"
  APP_PATH="/Users/matteocarranza/Library/Developer/Xcode/Archives/$(date +%Y-%m-%d)/$1/Products/Applications/$APP_NAME"
  PAYLOAD_PATH="./bin/Payload"
  INSTALLER_NAME="entresano.ipa"

  echo "Creating the installer..."
  mkdir -p "$PAYLOAD_PATH"
  cp -R "$APP_PATH" "$PAYLOAD_PATH/$APP_NAME"
  cd "./bin" || exit
  zip -r "$INSTALLER_NAME" "Payload" >/dev/null
  rm -rf "./Payload"
  cd ..

  echo "Build succesful."
}

build "$1"
