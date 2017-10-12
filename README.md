# Re:🔄 - ReLoop (React Loops Player)

## Basic

This project is a sound loop player built on React and Tone.js.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on customization of `jest` or `react` in "Create React App Guide".

Still, I'll describe basic steps here.

## Installation

Run `yarn`

## Start

Run `yarn start`. This will start a web server and open it's front-page in your browser. Changes will be delivered to your browser automatically.

## Testing

Run `yarn test`. For coverage report `yarn test -- --coverage`

## Media / Audio

Audio files can be found in `public/media/`.

It's recommended to use OGG file format. To convert WAV you can use following command in `public/media/`:

`for i in $(ls *.wav); do sox $i $i.ogg norm -3; done`

This will normalize files to -3dB and save them as OGG.
