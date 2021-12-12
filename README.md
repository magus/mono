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

The overall flow is, make changes locally, commit them and also run `yarn changeset` to generate an incremental changeset describing the changes. Eventually we may want to combine `yarn changeset` and `git commit` (see [changesets cli documentation](https://github.com/changesets/changesets/blob/main/docs/command-line-options.md))

```
yarn changeset
# make changes to changeset md file
# when ready bump version of package.json and generate CHANGELOG.md
yarn changeset version
# finally create a commit with the changes and publish to npm
git commit -am "release(...): 🔖 publish"
yarn changeset publish
# push the git tags to github
git push --follow-tags
```

NOTE: `changeset publish` assumes that last commit is the release commit. You should not commit any changes between
calling `version` and `publish`. The commands are separate to allow you to validate the release changes are correct.


# todo
- migrate to yarn v2 (has nice stuff like yarn dlx)
  - yarn dlx npm-check-updates
  - https://yarnpkg.com/getting-started/migration

- setup husky to run on commit / push
  - lint
  - test
  - deps checks (synpack)

