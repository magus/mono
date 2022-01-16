# @magusn/mono

> global command to run commands from mono repo root

## Install

Run the commands below to install the `mono` CLI utility from within the `packages/mono` directory

```sh
cd packages/mono
ln -s "$PWD/mono" "$(yarn global bin)/mono"
```

## Usage

```sh
mono
mono changeset
mono test:deps:fix

mono ws magic dev
mono ws magic build -- -v --cli-flag=true

mono ws @magusn/react test:lint
mono ws react add emotion
```

## License

MIT © [magus](https://github.com/magus)
