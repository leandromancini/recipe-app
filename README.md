## Install

```bash
$ npm install
```

## Running the app

- Configure .env
```
ENTRESANO_API_BASE_URL
```

- Run expo
```bash
# with expo
$ npx expo start
```

## How to use

### With a device
```
 · Install Expo Go App on device.
 · Scan QR code.
```

### With iOS simulator
```
 · Install Xcode.
 · Run the application again.
 · Press the i option.
```

## Build

### For iOS

- Build expo
```bash
$ npx expo prebuild --platform ios
```

- Build Xcode
```
 · Install Xcode.
 · Open project in Xcode from file /ios/entresano.xcworkspace.
 · Right-click on the project and set account in Signing and Capabilities > Team.
 · Build from > Product > Archive.
```

- Run script
```bash
$ ./build.sh archive-name
```

- Install Xcode
```
 · Select device from > Window > Devices and Simulators.
 · Add the installer from directory /bin.
```
- For the device, the developer must be trusted.
