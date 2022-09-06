# @magusn/react

## 0.7.0

### Minor Changes

- d486780: throw errors when /api/auth/complete fails
- 9c4fdc8: debug hooks
- 863ae8b: respect disableAuth flag to prevent race conditions

## 0.6.0

### Minor Changes

- abd2120: include files for published npm package

## 0.5.0

### Minor Changes

- 5d7968c: @magusn/react/src/styles export for easy migration between css-in-js providers
  - Easily switch between styled-components and @emotion for example
- 7f94483: Use specific folder imports from @magusn/react, e.g. @magusn/react/magic-auth
- 3f5079b: remove styled-jsx reducing bundle size by ~5kb

### Patch Changes

- f1eea8a: export babelrc function to mutate babel config for styles
- 6341346: Spacer
- c55e93b: remove src folder and move exports to top level

## 0.4.4

### Patch Changes

- 722891a: build: sideEffects: false to allow tree shaking
- 2a5441e: build(deps): move magusn/react deps to peerDeps
- af388bd: build(deps): rearrange MagicAuth for bundle size
- 05505cd: yarn test:deps:fix + syncpack order
- e79b000: docs: README install and description

## 0.4.3

### Patch Changes

- magic-auth Modal

* Button

- Cleanup MagicAuth API

## 0.4.2

### Patch Changes

- MagicAuthProvider + useMagicAuth

## 0.4.1

### Patch Changes

- build(react): run all test

* build(eslint): use @magusn/eslint-config-magusn
