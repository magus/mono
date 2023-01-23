# @magusn/vid

> cli helper for ffmpeg

## Install

```sh
yarn global add @magusn/vid
```

## Usage

```sh
vid ~/Desktop/recording.mov                                 # write recording.mp4 to ~/Desktop; unchanged by default
vid -s 4.3 ~/Downloads/youtube-crop.mp4 --an --pf           # speed up 4.3x, remove audio, preserve frames
vid ~/Downloads/youtube-crop.mp4 --crop                     # dynamic region cropping via still frame
vid ~/Downloads/youtube-crop.mp4 --get fps --get size       # output fps and size video metadata

vid https://twitter.com/magusnn/status/1458443583640334337  # output video downloaded from tweet
```

## Development

```sh
cd packages/vid
yarn unlink
yarn link
yarn link @magusn/vid
```

```sh
mono ws vid -- vid -v input.mp4
```

## Ideas

- publish like a node cli on npm for simple `npm i -g @magus/vid` install
  - https://dev.to/aadityasiva/make-and-publish-a-nodejs-cli-in-10-minutes-njj


## License

MIT © [magus](https://github.com/magus)
