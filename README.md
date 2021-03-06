# 📦 mono

- @magusn/eslint-config-magusn
- @magusn/mono
- @magusn/react
- magic.iamnoah.com
- dcss.now.sh

# setup

```
yarn setup
yarn bootstrap
```

# commands

## Run mono repo script from anywhere

See [packages/mono](packages/mono)

```sh
mono changeset
mono test:deps:fix
```

## Run a script for a package

```
mono ws <workspace> <script>

mono ws magic dev
mono ws magic build -- -v --cli-flag=true

mono ws @magusn/react test:lint
mono ws react add emotion
```

## Manage changesets for CHANGELOG and good history

see [changesets cli documentation](https://github.com/changesets/changesets/blob/main/docs/command-line-options.md)

The overall flow is, make changes locally, commit them and also run `mono changeset` to generate an incremental changeset describing the changes. Eventually we may want to combine `mono changeset` and `git commit`. Maybe a script that collects commit *message* first then copies to clipboard (`pbcopy`) then runs `mono changeset` ... *paste* ... `git commit -m [message]`.

```sh
mono changeset
```

Select relevant packages and semantic version bumps. Input a commit message or description of changes as summary which will be included in `CHANGELOG.md`. Then commit the changes along with the `.changeset` file.

```sh
git commit
```

Repeat above as many times as needed for any number of changes. The command below will consume `.changeset` entries to properly increment semantic versions and bump version of all `package.json` files and generate `CHANGELOG.md` entries.

```sh
mono changeset version
```

Verify things look okay (package.json, CHANGELOG.md, etc.) and commit changes with command below

```sh
mono release
```

Finally to publish changes, particularly to public modules such as `@magusn/react` or `@magusn/eslint-config-magusn` you should follow up with `mono changeset publish` which will tag and publish the releases to npm. This is required for deploys since they require pulling public dependencies from public NPM repository.

NOTE: `changeset publish` assumes that last commit is the release commit. You should not commit any changes between
calling `version` and `publish`. The commands are separate to allow you to validate the release changes are correct.

```sh
mono changeset publish
git push --follow-tags
```

IMPORTANT: This publish command may fail with a `402 Payment Required` error, you must be sure to set `publishConfig` in the `package.json`

```
🦋  info Publishing "@magusn/vid" at "0.2.1"
🦋  error an error occurred while publishing @magusn/vid: E402 402 Payment Required - PUT https://registry.npmjs.org/@magusn%2fvid - You must sign up for private packages
🦋  error <Buffer 6e 70 6d 20 45 52 52 21 20 63 6f 64 65 20 45 34 30 32 0a 6e 70 6d 20 45 52 52 21 20 34 30 32 20 50 61 79 6d 65 6e 74 20 52 65 71 75 69 72 65 64 20 2d ... 395 more bytes>
🦋  error packages failed to publish:
🦋  @magusn/vid@0.2.1
error Command failed with exit code 1.
```

```
"publishConfig": {
  "access": "public"
},
```


# todo
- remove indirection of `src/pages` and just push pages under `pages/`
- consider removing absolute and special paths (e.g. `@components`) they break vscode cmd click
- use `MagicAuth` on a test site
  - can we hit `magic.iamnoah.com/auth` routes?
  - configure as needed etc.
  - styles? how can we define and share theme values
  - can put style constants under `@magusn/react` for now?

- migrate to yarn v2 (has nice stuff like yarn dlx)
  - yarn dlx npm-check-updates
  - https://yarnpkg.com/getting-started/migration

- setup husky to run on commit / push
  - lint
  - test
  - deps checks (synpack)

