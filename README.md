# Hashvive

Hashvive is a password generator. It helps in not using the same password on different platforms.
It uses the "common" password to create a random hash (MD5, actually) for each site you'd like to have a strong password for.

Passwords generated that way are less likely to crack when brute forcing. However, you could manually edit them to create an even more random password.

## Installation
There are two ways to install - download app binary, or build from source.

#### Download Binary

You can download the binary from the [latest Github release](https://github.com/roshnet/hashvive/releases/download/v1.0.0/hashvive-1.0.0.apk).

#### Building from source

You'll need Node.js, Git and npm (or yarn) on your machine.

1. Get the code
```bash
$ git clone https://github.com/roshnet/hashvive && cd hashvive
```

2. Install all dependencies
```sh
$ npm install
// or
$ yarn
```

> The `expo` command should now be available. If not, run `$ npm install -g expo-cli`.

3. Meanwhile, [create an Expo account](https://expo.io/signup).
4. Once depedencies are installed, run (from the app directory)
```shell
$ expo build:android
```

5. Follow the prompt. A build should be queued on Expo servers. When the build finishes, you can download the APK (build artifact) from your Expo dashboard.

## Contributing

This project is written in React Native (TypeScript). If you'd like to add features or something, go ahead and send a PR.
