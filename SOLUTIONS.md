# Solutions

## `yarn bootstrap`

> Problem

```
error /Users/noah/github/mono/sites/magic.iamnoah.com/node_modules/geo-from-ip: Command failed.
Exit code: 1
Command: node lib/update.js
Arguments:
```

`sites/magic.iamnoah.com` has a dependency on [geo-from-ip]((https://www.npmjs.com/package/geo-from-ip)) which requires `MAXMIND_LICENSE_KEY` to be set as an environmental variable

Ensure `MAXMIND_LICENSE_KEY` is set in `sites/magic.iamnoah.com/.env.local` which is loaded during `yarn bootstrap`

> Solution

```sh
# you may need to delete the root node_modules folder
rm -rf node_modules
# this will print setup instructions for all packages
yarn setup
```
