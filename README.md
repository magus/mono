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
mono ws @magusn/react test:lint
mono ws magic build -- -v --cli-flag=true
```

## Manage changesets for CHANGELOG and good history

see [changesets cli documentation](https://github.com/changesets/changesets/blob/main/docs/command-line-options.md)

The overall flow is, make changes locally, commit them and also run `yarn changeset` to generate an incremental changeset describing the changes. Eventually we may want to combine `yarn changeset` and `git commit`. Maybe a script that collects commit *message* first then copies to clipboard (`pbcopy`) then runs `yarn changeset` ... *paste* ... `git commit -m [message]`.

After committing all changes, in order to consume the incremental changeset files you can run `yarn changeset version`. This will calculate the correct semantic version bump, update all `package.json` references and generate `CHANGELOG.md` entries based on the changeset files.

To publish changes, particularly to public modules such as `@magusn/react` or `@magusn/eslint-config-magusn` you should follow up with `yarn publish` which will tag and publish the releases to npm. This is required for deploys through CI.

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

Finally publish the changes to npm and push the git tags to github

```sh
mono changeset publish
git push --follow-tags
```

NOTE: `changeset publish` assumes that last commit is the release commit. You should not commit any changes between
calling `version` and `publish`. The commands are separate to allow you to validate the release changes are correct.


# todo
- cleanup all usages of css modules (CMD+Shift+F for `.css'`)
  - verify `yarn analyze` no longer shows `styled-jsx` in `static/chunks/main-[guid].js` bundle
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

