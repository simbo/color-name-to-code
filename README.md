# Color Name to Code

[![npm Package Version](https://img.shields.io/npm/v/color-name-to-code?)](https://www.npmjs.com/package/color-name-to-code)
[![Package Dependencies](https://img.shields.io/librariesio/release/npm/color-name-to-code)](https://www.npmjs.com/package/color-name-to-code?activeTab=dependencies)
[![Coveralls Coverage](https://img.shields.io/coveralls/github/simbo/color-name-to-code)](https://coveralls.io/github/simbo/color-name-to-code)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/simbo/color-name-to-code/ci.yml?branch=main)](https://github.com/simbo/color-name-to-code/actions/workflows/ci.yml)
[![GitHub Repo](https://img.shields.io/badge/repo-public-87ceeb)](https://github.com/simbo/color-name-to-code)
[![License MIT](https://img.shields.io/badge/license-MIT-4cc552)](http://simbo.mit-license.org/)

A javascript library that returns a color code for a given color name.

It supports all color names from the list of
[named CSS colors from W3C](https://drafts.csswg.org/css-color/#named-colors).

It includes also the enum [`ColorName`](./src/color-name.enum.ts) with a full
list of all known color names.

The library can return hex color values, CSS `rgb(…)` values or an array of
numeric RGB color values.

---

## Installation

This library is published to npm registry as
[`color-name-to-code`](https://www.npmjs.com/package/color-name-to-code).

You can install it:

```sh
# with npm
npm install --save color-name-to-code

# with yarn
yarn add color-name-to-code
```

ℹ️ **HINT**: This library is a pure ESM package. (You may want to
[read this](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).)

## Usage

```js
import { colorNameToCode } from 'color-name-to-code';

// color name to hex value
colorNameToCode('red'); // -> '#FF0000'

// color name to lowercase hex value
colorNameToCode('red', { lowercase: true }); // -> '#ff0000

// color name to short hex value
colorNameToCode('red', { short: true }); // -> '#f00'

// color name to hex value without leading hash
colorNameToCode('red', { hash: false }); // -> 'FF0000'

// color name to CSS `rgb(…)` value
colorNameToCode('red', { format: 'rgb' }); // -> 'rgb(255, 0, 0)'

// color name to CSS `rgba(…)` value
colorNameToCode('red', { format: 'rgb', alpha: 0.5 }); // -> 'rgba(255, 0, 0, 0.5)'

// color name to numeric RGB array
colorNameToCode('red', { format: 'array' }); // -> [255, 0, 0]

// color names will be sanitized before matching
colorNameToCode('"white!"'); // -> '#FFFFFF'
colorNameToCode('Black'); // -> '#000000'
colorNameToCode('RED'); // -> '#FF0000'
colorNameToCode('Dodger Blue'); // -> '#1E90FF'
colorNameToCode('dark-slate-gray'); // -> '#2F4F4F'
colorNameToCode('DARK_SLATE_GREY'); // -> '#2F4F4F'
colorNameToCode('LeMoN cHiFfOn'); // -> '#FFFACD'

// an unknown color name will be transformed to a fallback color
colorNameToCode('Foo Bar'); // -> '#FFBBAA'
colorNameToCode(undefined); // -> '#DEFE0D'
colorNameToCode('UNKNOWN'); // -> '#000000'

// if fallback is disabled and color name is unknown, an error is thrown
colorNameToCode('Foo Bar', { fallback: false }); // -> ERROR: no matching color found for 'Foo Bar'
```

## API

```ts
colorNameToCode(name: string, options: Partial<Options>): string | [number, number, number];
```

### Options

```ts
interface Options {
  format: 'hex' | 'rgb' | 'array'; // default: 'hex'
  fallback: boolean; // default: true
  short: boolean; // default: false
  hash: boolean; // default: true
  lowercase: boolean; // default: false
  alpha: number; // default: 1
}
```

- `format: 'hex' | 'rgb' | 'array'` (default: `'hex'`)  
  …defines the output format.

  Possible values:

  - `'hex'` defines a hex value as output format
  - `'rgb'` defines a CSS `rgb(…)` value as output format
  - `'array'` defines a numeric array of RGB values as output format

- `fallback: boolean` (default: `true`)  
   …tries to generate a color value from the given name input if a matching color
  name could not be found.

  To achieve this, all non-hex characters are removed from the given string and
  up to the first six left characters are interpreted as hex color value.

  If `fallback` is `false` and no matching color name is found,
  `colorNameToCode` will throw an error.

- `short: boolean` (default: `false`)  
   …returns a hex value as short version if possible and set to `true`.

  (This option only takes effect in combination with `format: 'hex'`.)

- `hash: boolean` (default: `true`)  
  …returns a hex value with or without leading hash.

  (This option only takes effect in combination with `format: 'hex'`.)

- `lowercase: boolean` (default: `false`)  
  …return a hex value with lowercase letters if set to `true`.

  (This option only takes effect in combination with `format: 'hex'`.)

- `alpha: number` (default: `1`)  
  …returns a CSS `rgba(…)` value with alpha value, if `alpha` is lower than `1`.

  (This option only takes effect in combination with `format: 'rgb'`.)

## License

[MIT &copy; Simon Lepel](http://simbo.mit-license.org/)
