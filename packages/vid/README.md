# @magusn/vid

> cli helper for ffmpeg

## Usage

```sh
vid ~/Desktop/recording.mov                           # write recording.mp4 to ~/Desktop; unchanged by default
vid -s 4.3 ~/Downloads/youtube-crop.mp4 --an --pf     # speed up 4.3x, remove audio, preserve frames
vid ~/Downloads/youtube-crop.mp4 --get fps --get size # output fps and size video metadata
```

## Ideas

- crop
  - `ffmpeg -i in.mp4 -filter:v "crop=out_w:out_h:x:y" out.mp4`
  - binary search for crop? feedback ask for left/right/stop on width and height to continue search

- publish like a node cli on npm for simple `npm i -g @magus/vid` install
  - https://dev.to/aadityasiva/make-and-publish-a-nodejs-cli-in-10-minutes-njj


## License

MIT © [magus](https://github.com/magus)
