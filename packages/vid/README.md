# @magusn/vid

> cli helper for ffmpeg

## Usage

```sh
vid ~/Desktop/recording.mov                       # outputs recording.mp4 to ~/Desktop; unchanged by default
vid -s 4.3 ~/Downloads/youtube-crop.mp4 --an --pf # speed up 4.3x, remove audio, preserve frames
```

## Ideas

- publish like a node cli on npm for simple `npm i -g @magus/vid` install
  - https://dev.to/aadityasiva/make-and-publish-a-nodejs-cli-in-10-minutes-njj
- resize
- get dimensions
  - `ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 ~/Downloads/youtube.mp4`
- crop
  - `ffmpeg -i in.mp4 -filter:v "crop=out_w:out_h:x:y" out.mp4`
  - binary search for crop? feedback ask for left/right/stop on width and height to continue search

## License

MIT © [magus](https://github.com/magus)
