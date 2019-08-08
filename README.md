# Sapper Example

This directory is a brief example of a [Sapper](https://sapper.svelte.dev/) app that can be deployed to ZEIT Now with zero configuration.

## How we created this example

To get started with Sapper on Now, you can use [degit](https://github.com/Rich-Harris/degit) to initialize the project:

```shell
$ npx degit "sveltejs/sapper-template#webpack" my-sapper-app
```

> The only change made is to change the build script in `package.json` to be `"sapper export"`.

## Deploying this Example

Once initialized, you can deploy the Sapper example with just a single command:

```shell
$ now
```
