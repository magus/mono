# @magusn/vid

## 0.6.1

### Patch Changes

- a2b950e: default crop to middle and clamp to duration

## 0.6.0

### Minor Changes

- 4fbc0ab: feat: allow mp3 output for --no-video

### Patch Changes

- a4d21e5: fix: type safety when throwing errors
- 948ea3a: docs: correct command to setup dev vid

## 0.5.0

### Minor Changes

- f1e4768: twitter: support multiple video tweets
- e9786d3: setup main module export for shared fetch_video_list and parse_filename

### Patch Changes

- 2ebba39: fix: remove cli font colors from VidError message
- 91932d3: fix: downgrade node-fetch for nextjs compatability

## 0.4.0

### Minor Changes

- 6e370f3: feat: twitter video downloads

## 0.3.1

### Patch Changes

- e0fadcd: refactor: ffprobe
- 5923b96: docs: development command

## 0.3.0

### Minor Changes

- 558bcf3: quotify input and safer complex filter when no audio etc

### Patch Changes

- a01216b: install instructions
- 4973ea7: input_video_file required positional

## 0.2.2

### Patch Changes

- 92703ea: set publishConfig for package.json

## 0.2.1

### Patch Changes

- fd123ea: updating repository path

## 0.2.0

### Minor Changes

- mvp for vid cli

  - a38959e: (origin/master) fix(vid): better error handling and ora spinner
  - 6b79d7c: feat(vid): dynamic crop region
  - c16886c: fix(eslint prettier): ignore node_modules
  - 48f7d0d: refactor(vid): cli folder
  - e5f2109: fix(vid): use correct eslint version
  - ec4af95: fix(mono): remove space in verbose error messaging
  - 6b746df: feat(vid): dimension scale output
  - ffac981: fix(vid): filter when both audio+video
  - 972a42a: feat(vid): get video metadata
  - 1e0bfa6: feat(vid): implement speed etc
  - 97d914f: docs(vid): changelog init
  - 0cc124d: feat(vid): new package vid

## 0.1.1

### Patch Changes

- initial creation of vid package
