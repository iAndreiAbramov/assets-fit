# Assets-Fit

**Please note that this project is in the early development stage and may not work as expected.**

_Assets-Fit_ is a CLI tool designed to help reduce the weight of assets in your project.
It scans your project directories to find unused assets, duplicated files under different names,
images that could be compressed, etc., and provides options to manage them efficiently.

## Features

- **Scan for Unused Assets**: Quickly identify unused assets in your project.
- **Flexible Configuration**: Configure assets and files directories through CLI arguments, a configuration file, or
  the `config` command.
- **Easy to Use**: Simple commands and clear output make it easy to manage your assets.

## Installation

To install _Assets-Fit_, you need to have Node.js installed on your machine.

```bash
npm i -D assets-fit
```

This will install the `af` command to your project.

## Usage

To scan your project for unused assets, run the following command:

```bash
af unused --assets <path-to-assets> --files <path-to-files>
```

or with short flags:

```bash
af u -a <path-to-assets> -f <path-to-files>
```

**Options**

- `-a, --assets <string>`: Specify the path to the assets directory.
- `-f, --files <string>`: Specify the path to the project files directory.
- `--help`: Display help for the command.

## Configuration

It can be a little bit annoying to specify the assets and files directories every time you run the command.
To make it easier, you can configure the directories once and then run the command without specifying it.

The first step to configure _Assets-Fit_ is to manually create a ".af-config.json" file in the project root directory.
This file will contain the configuration for the program.

Configuration can be set by using "config" command or by editing the ".af-config.json" file.

To set the assets and files directories using the config command, run the following command:

```bash
af config --assets <path-to-assets> --files <path-to-files>
```

or with short flags:

```bash
af c -a <path-to-assets> -f <path-to-files>
```

To set the assets and files directories by editing the .af-config.json file, add the following configuration:

```json
{
  "assets": "<path-to-assets>",
  "files": "<path-to-files>"
}
```

Both paths can be relative to the project root directory or absolute.

## Contributing

Contributions are welcome!

Please feel free to submit a pull request or open an issue if you have feedback, suggestions, or want to contribute new
features.

## License

_Assets-Fit_ is ISC licensed.
