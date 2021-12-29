# @magusn/mono

> global command to run commands from mono repo root

## Install

Run the commands below to install the `mono` CLI utility from within the `packages/mono` directory

```sh
cd packages/mono
yarn global add link:$PWD
```

## Usage

```sh
mono
mono changeset
mono test:deps:fix
mono ws magic dev
mono ws magic build -- -v --cli-flag=true
```

## License

MIT © [magus](https://github.com/magus)
