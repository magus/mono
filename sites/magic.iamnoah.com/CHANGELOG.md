# magic.iamnoah.com

## 0.6.1

### Patch Changes

- cc14de5: use vercel cli

## 0.6.0

### Minor Changes

- 863ae8b: respect disableAuth flag to prevent race conditions

### Patch Changes

- 2e83057: /api/auth/confirm validates login request secret
- 7393deb: race condition calling `/api/auth/complete`
- Updated dependencies [d486780]
- Updated dependencies [9c4fdc8]
- Updated dependencies [863ae8b]
  - @magusn/react@0.7.0

## 0.5.2

### Patch Changes

- 4a222ab: run eslint directly (next lint requires config to lint all folders)

## 0.5.1

### Patch Changes

- Updated dependencies [abd2120]
  - @magusn/react@0.6.0

## 0.5.0

### Minor Changes

- 195cdb7: server/handler for method check (force POST only)
- 6dbe9b3: rearrange dynamic loading for bundle size
- 5d7968c: @magusn/react/src/styles export for easy migration between css-in-js providers
  - Easily switch between styled-components and @emotion for example
- 7f94483: Use specific folder imports from @magusn/react, e.g. @magusn/react/magic-auth
- 3f5079b: remove styled-jsx reducing bundle size by ~5kb

### Patch Changes

- 75bc5c1: FORCE=true for ignoring eslint in build
- f1eea8a: export babelrc function to mutate babel config for styles
- fd83f3a: vercel geo from headers
- Updated dependencies [f1eea8a]
- Updated dependencies [5d7968c]
- Updated dependencies [7f94483]
- Updated dependencies [3f5079b]
- Updated dependencies [6341346]
- Updated dependencies [c55e93b]
  - @magusn/react@0.5.0

## 0.4.5

### Patch Changes

- eaf1a9b: build(import): name dynamic chunks
- 1c492a5: build: set NODE_ENV for analyze
- 2a5441e: build(deps): move magusn/react deps to peerDeps
- 69c581b: build: remove superfluous analyze scripts
- af388bd: build(deps): rearrange MagicAuth for bundle size
- 05505cd: yarn test:deps:fix + syncpack order
- 1303be8: refactor(styles): move global styles to styled-components
- Updated dependencies [722891a]
- Updated dependencies [2a5441e]
- Updated dependencies [af388bd]
- Updated dependencies [05505cd]
- Updated dependencies [e79b000]
  - @magusn/react@0.4.4

## 0.4.4

### Patch Changes

- use magusn/react eslint
- disable no-console eslint
- resolve eslint errors to run build

## 0.4.3

### Patch Changes

- magic-auth Modal

* Button

- Cleanup MagicAuth API

- Updated dependencies []:
  - @magusn/react@0.4.3

## 0.4.2

### Patch Changes

- MagicAuthProvider + useMagicAuth

- Updated dependencies []:
  - @magusn/react@0.4.2

## 0.4.1

### Patch Changes

- build(eslint): use @magusn/eslint-config-magusn

- Updated dependencies []:
  - @magusn/react@0.4.1
