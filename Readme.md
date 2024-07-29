# Assets-Fit

**Please note that this project is in the early development stage and may not work as expected.**

_Assets-Fit_ is a CLI tool designed to help reduce the weight of assets in your project.
It scans your project directories to find unused assets, duplicated files under different names,
images that could be compressed, etc., and provides options to manage them efficiently.

## Features

- **Scan for Unused Assets**: Quickly identify unused assets in your project.
- **Flexible Configuration**: Configure assets and files directories through a configuration file.
- **Easy to Use**: Simple commands and clear output make it easy to manage your assets.

## Installation

To install _Assets-Fit_, you need to have Node.js installed on your machine.

```bash
npm i -D assets-fit
```

This will install the `af` command to your project.

## Configuration

Assets-Fit can be configured using a configuration file
`.af.json`
that can be created manually or using the `init` command:

```bash
af init
```

This will create a `.af.json` file in the root of your project.

Here is an example of a configuration file:

```json
{
  "assets": {
    "include": "src/assets/",
    "exclude": [
      ".DS_Store",
      "src/assets/fonts"
    ]
  },
  "files": {
    "include": [
      "src/"
    ],
    "exclude": "src/assets"
  }
}
```

## Usage

**To scan your project for unused assets**, run the following command:

```bash
af unused
```

or with short variant:

```bash
af u
```

Running this command will recursively scan directories specified in the
`files.include`
configuration option, excluding directories specified in the
`files.exclude`
option, and will search for imports or usage of assets from directories specified in the
`assets.include`
configuration option, excluding directories specified in the
`assets.exclude`
option.

**To scan your project for duplicate assets**, run the following command:

```bash
af duplicate
``` 

or with short variant:

```bash
af d
```

`duplicate` command will compare all files by content and will output all duplicates, which may have different names.
It can be useful to find images that were imported multiple times under different names.

Running this command will recursively scan directories specified in the
`assets.include`
configuration option, excluding directories specified in the
`assets.exclude`
option.

## Contributing

Contributions are welcome!

Please feel free to submit a pull request or open an issue if you have feedback, suggestions, or want to contribute new
features.

## License

_Assets-Fit_ is ISC licensed.
