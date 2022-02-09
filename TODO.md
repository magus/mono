# TODO

## 2022-01-29

- install script (e.g. mono ws add react)
  - If we find a workspace package that matches, then parse peerDependencies to build mono command below
  - For command above it would match packages/react (@magusn/react)
  - Otherwise, it should fallback to default `mono_exec` (yarn add)
