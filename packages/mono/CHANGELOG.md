# @magusn/mono

## 0.1.5

### Patch Changes

- docs(changeset): full flow for publishing

## 0.1.4

### Patch Changes

- ec85183: docs for changeset flow

## 0.1.3

### Patch Changes

- release command

## 0.1.2

### Patch Changes

- make mono private, just for internal tracking
- changelog-git to avoid github token error when `yarn changeset version`
- commitlint allow any subject casing
- 8ab6e33: commitlint docs

## 0.1.1

### Patch Changes

- build(syncpack): format scripts

* docs: publish tags

- build(commitlint): +release type

## 0.1.0

### Minor Changes

- setup `@magusn/mono` to catch mono repo changes in changelog
- remove `commitizen` + `cz-conventional-changelog`
- setting up `husky` + `commitlint`, see [commitlintsetup guide](https://commitlint.js.org/#/guides-local-setup)

```
yarn add -DW husky
yarn add -DW @commitlint/{cli,config-conventional}
yarn husky install
yarn husky add .husky/commit-msg 'yarn commitlint --edit $1'
```

- confirm `git commit -m "blah"` prints errors due to `commitlint` `husky` hook
