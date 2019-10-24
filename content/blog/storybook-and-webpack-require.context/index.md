---
title: "Let's write a Story on unpacking Webpack's require.context"
date: "2019-10-24T03:17:57.051Z"
description: "But what does it all mean, Basil? 🤓"
categories:
  - Webpack
  - Development
  - Code
  - Javascript
tags:
  - Webpack
  - Storybook
  - Development
  - Deployment
  - Compilation
  - Code
  - Javascript
---

import RequireContextKeys from "./RequireContextKeys";

![Storybook & Webpack Logos](./hero-image.png)

<figcaption>
  Storybook.js and Webpack Logos
</figcaption>

If you've spent any time using [Storybook.js](https://storybook.js.org/), you've likely come across this small snippet of code:

```js
// .storybook/config.js

import { configure } from "@storybook/react"

configure(require.context("../src", true, /\.stories\.js$/), module)
```

Even in this small snippet, there's a lot to unpack. So, let's break this down. 👇

---

## The breakdown 🤔

1. There's a function we're importing from the React.js ⚛️ flavored Storybook package called `configure`
2. `configure` takes two arguments: `require.context` and `module`
3. `require.context` is a method that has 3 unnamed arguments, as a weird mix:
   1. a string literal path
   2. a boolean, and
   3. a regular expression.

There's a giant pile of `unknown` in the middle of that `configure()` method!
Where did `require.context` come from?
What about `module`?
That first argument is _definitely a path_, but what do the rest of the arguments signify?
Why does it look like we're mixing [ES6 imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) with [commonJS require](https://nodejs.org/api/modules.html#modules_require_id)?

## But what does it all mean, Basil? 🤓

![But what does it all mean, Basil? 🤓](./what-does-it-all-mean.gif)

<figcaption>
  But what does it all mean, Basil? 🤓
</figcaption>

Looking at the [storybook documentation](https://storybook.js.org/docs/guides/guide-react/#step-3-create-the-config-file), they say:

> For a basic Storybook configuration, the only thing you need to do is tell Storybook where to find stories...That [snippet above] will load all the stories underneath your `../src` directory that match the pattern `*.stories.js`.

That's cool and all, but how's it work and why?
I don't know about y'all, but that description just doesn't satisfy me.

**_I simply have to know more._**

## Webpack black magic 🧙‍♂️

Turns out, `require.context` comes from [webpack](https://webpack.js.org/api/module-methods/#requirecontext):

> Specify a whole group of dependencies using a path to the `directory`, an option to `includeSubdirs`, a `filter` for more fine grained control of the modules included, and a `mode` to define the way how loading will work.
> Underlying modules can then be easily resolved later on

```js
require.context(
  directory: String,
  includeSubdirs: Boolean /* optional, default true */,
  filter: RegExp /* optional, default /^\.\/.*$/, any file */,
  mode: String  /* optional, 'sync' | 'eager' | 'weak' | 'lazy' | 'lazy-once', default 'sync' */
)
```

Let's look back at the code snippet from Storybook.
I'll add in some comments and format the code to map back to the webpack definition:

```js
// .storybook/config.js

import { configure } from "@storybook/react"

const loader = require.context(
  // directory, as a string literal (this is important)
  "../src",
  // includeSubdirs, set to true even though it defaults to true
  // we have to include it since we're setting the third argument
  // and require.context doesn't accept an options hash/named arguments
  true,
  // filter, we only want to match on files that end in .story.js
  // for my team, we like to write our React files with a `.jsx` extension,
  // so we take off the `$`
  /\.story\.js$/
  // mode, left off so it defaults to 'sync'
)

// call storybook configure
configure(
  loader, // the webpack require.context context, what Storybook calls a loader
  module // the current file's special node defined `module` variable
)
```

## Clear as mud? 😂

![Clear as mud](./clear-as-mud.gif)

Well, kinda. I mean, we _are_ getting somewhere!

---

## Module.why?

In the previous section, we defined what each argument of `require.context` and `configure` is.
Before jumping into what `require.context` returns and how it's used, let's briefly talk about the use of `module`.

Storybook uses the special `module` [node variable](https://nodejs.org/api/modules.html#modules_the_module_object), _except not really_.
While the [configure method](https://github.com/storybookjs/storybook/blob/6e80db697f865f833cf3e250573a7ce36e0ee02a/lib/client-api/src/config_api.ts#L48) does type the `module` object as a `NodeModule` object, it is actually using it for [hot module reloading](https://github.com/storybookjs/storybook/blob/6e80db697f865f833cf3e250573a7ce36e0ee02a/lib/client-api/src/config_api.ts#L77-L82).

In the webpack HMR [documentation](https://webpack.js.org/api/hot-module-replacement/), they say:

> If **Hot Module Replacement** has been enabled via the `HotModuleReplacementPlugin`, its interface will be exposed under the `module.hot` property.
> Typically, users will check to see if the interface is accessible, then begin working with it.

They also provide an example:

```js
if (module.hot) {
  module.hot.accept("./library.js", function() {
    // Do something with the updated library module...
  })
}
```

Which is very similar to what we see in the Storybook `configure` method:

```js
if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => {
    this._clearDecorators()
  })
}
```

This is the only reference to `module` in that method and it is used for hot module reloading.
If you aren't familiar, hot module reloading empowers local development speed by allowing you to change your code while your development server is running.
There's no need to save-compile-wait-reload.
It's simply there, _"deployed"_ and running after you save.
For Storybook, this is super helpful for updating stories on the fly. ✈️
Keep in mind that HMR is only available for browsers that support it and when running `start-storybook` locally.
It will **not** be used when building the static Storybook site with `build-storybook`.

---

## The context of require.context

Back to the magic: `require.context`.

<RequireContextKeys />
