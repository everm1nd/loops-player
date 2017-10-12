# Re:🔄 - ReLoop (React Loops Player)

## Basic

This project is a sound loop player built on React and Tone.js.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on customization of `jest` or `react` in "Create React App Guide".

Still, I'll describe basic steps here.

## Installation

Run `yarn`

## Start

Run `yarn start`. This will start a web server and open it's front-page in your browser. Changes will be delivered to your browser automatically.

## Build

You can build a production version running `yarn build`. Output will be in `build/`. You can open `index.html` in your browser, but you need to use Firefox or Chrome with `--allow-file-access-from-files`, because by default reading files from local filesystem with AJAX is not allowed (AJAX is used to fetch media files).

Normally, you just need to put this files on any web-server and then they will be served correctly. AJAX will be working, as media files will be accessed over HTTP/S protocol. You can try it locally in 30 seconds, running:
```bash
  npm install -g http-server
  http-server ./build
```

## Testing

Run `yarn test`. For coverage report `yarn test -- --coverage`

## Media / Audio

Audio files can be found in `public/media/`.

It's recommended to use OGG file format. To convert WAV you can use following command in `public/media/`:

`for i in $(ls *.wav); do sox $i $i.ogg norm -3; done`

This will normalize files to -3dB and save them as OGG.
