# 📦 mono

- @magusn/react
- @magusn/eslint-config-magusn
- magic.iamnoah.com
- dcss.now.sh

# setup

```
yarn setup
yarn bootstrap
```

# commands

## Run a script for a package

```
yarn workspace <workspace> <script>
yarn workspace magic.iamnoah.com dev
yarn workspace @magusn/react test:lint
```

## Manage changesets for CHANGELOG and good history

see [changesets cli documentation](https://github.com/changesets/changesets/blob/main/docs/command-line-options.md)

The overall flow is, make changes locally, commit them and also run `yarn changeset` to generate an incremental changeset describing the changes. Eventually we may want to combine `yarn changeset` and `git commit`. Maybe a script that collects commit *message* first then copies to clipboard (`pbcopy`) then runs `yarn changeset` ... *paste* ... `git commit -m [message]`.

After committing all changes, in order to consume the incremental changeset files you can run `yarn changeset version`. This will calculate the correct semantic version bump, update all `package.json` references and generate `CHANGELOG.md` entries based on the changeset files.

To publish changes, particularly to public modules such as `@magusn/react` or `@magusn/eslint-config-magusn` you should follow up with `yarn publish` which will tag and publish the releases to npm. This is required for deploys through CI.

```
yarn changeset
# select relevant packages and semantic version bumps
# input commit message or description of changes as summary
# commit the changes to git
git commit

# repeat above as many times as needed

# when ready bump version of package.json and generate CHANGELOG.md
yarn changeset version
# verify things look okay (package.json, CHANGELOG.md, etc.) then commit the changes
yarn release
# finally publish the changes to npm
yarn changeset publish
# push the git tags to github
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

