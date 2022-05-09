# @magusn/vid

> cli helper for ffmpeg

## Usage

```sh
vid "Screen Recording 2022-05-08 at 6.55.35 PM.mov" # outputs Screen Recording 2022-05-08 at 6.55.35 PM.mp4 unchanged by default
```

## Ideas

- publish like a node cli on npm for simple `npm i -g @magus/vid` install
  - https://dev.to/aadityasiva/make-and-publish-a-nodejs-cli-in-10-minutes-njj
- handle params w help
- resize
- get dimensions
  - `ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 ~/Downloads/youtube.mp4`
- crop
  - `ffmpeg -i in.mp4 -filter:v "crop=out_w:out_h:x:y" out.mp4`
  - binary search for crop? feedback ask for left/right/stop on width and height to continue search
- speed up / slow down
  - 16x slow down: `ffmpeg -i ~/Desktop/youtube.mp4 -an -filter:v "setpts=16.0*PTS" ~/Desktop/youtube-16x.mp4`
  - 2x speed up: `ffmpeg -i input.mkv -filter:v "setpts=0.5*PTS" output.mkv`
  - preserve frames by multiplying fps by same factor, e.g. 4fps input 4x speed up: `ffmpeg -i input.mkv -r 16 -filter:v "setpts=0.25*PTS" output.mkv` (16fps via `-r 16`)
  - slow down and speed up audio factor by 2 until equal or below 2 then round?
    - eg 16/2 = 8/2 = 4/2 = 2/2 = 1
    - `ffmpeg -i input.mkv -filter:a "atempo=2.0,atempo=2.0,atempo=2.0,atempo=2.0" -vn output.mkv`
  - complex filter graph to do audio and video same time
    - `ffmpeg -i input.mkv -filter_complex "[0:v]setpts=0.5*PTS[v];[0:a]atempo=2.0[a]" -map "[v]" -map "[a]" output.mkv`
- no video / no audio (`-vn -an`)
- output to same directory with generated file name
  - file name based on options eg speed-up-2x


## License

MIT © [magus](https://github.com/magus)
