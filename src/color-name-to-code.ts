import { colorArrayToHex, colorArrayToHexDefaultOptions, ColorArrayToHexOptions } from './color-array-to-hex.js';
import { colorArrayToRGB } from './color-array-to-rgb.js';
import { ColorCodeFormat } from './color-code-format.enum.js';
import { ColorName } from './color-name.enum.js';
import { colorNames } from './color-names.js';

type PartialColorNameToCodeOptions = ColorArrayToHexOptions & {
  fallback: boolean;
  alpha: number;
};

export type ColorNameToCodeOptions = PartialColorNameToCodeOptions & {
  format: ColorCodeFormat;
};

const colorNameToCodeDefaultOptions: ColorNameToCodeOptions = {
  ...colorArrayToHexDefaultOptions,
  fallback: true,
  alpha: 1,
  format: ColorCodeFormat.Hex
};

export function colorNameToCode(value: string, partialOptions?: Partial<PartialColorNameToCodeOptions>): string;

export function colorNameToCode(
  value: string,
  partialOptions?: Partial<PartialColorNameToCodeOptions> & { format: ColorCodeFormat.Hex | ColorCodeFormat.RGB }
): string;

export function colorNameToCode(
  value: string,
  partialOptions?: Partial<PartialColorNameToCodeOptions> & { format: ColorCodeFormat.Array }
): [number, number, number];

export function colorNameToCode(
  value: string,
  partialOptions: Partial<ColorNameToCodeOptions> = {}
): string | [number, number, number] {
  const options: ColorNameToCodeOptions = {
    ...colorNameToCodeDefaultOptions,
    ...partialOptions
  };
  const { fallback, format, hash, lowercase, short, alpha } = options;

  value = `${value}`;

  const colorName = value.toLowerCase().replaceAll(/[^a-z]/g, '') as ColorName;
  let colorArray = colorNames[colorName];

  if (!colorArray) {
    if (!fallback) {
      throw new Error(`no matching color found for '${value}'`);
    }
    const hex = value.toLowerCase().replaceAll(/[^a-f0-9]/g, '');
    colorArray = (
      hex.length <= 3
        ? [hex.substring(0, 1).repeat(2), hex.substring(1, 2).repeat(2), hex.substring(2, 3).repeat(2)]
        : [hex.substring(0, 2), hex.substring(2, 4), hex.substring(4, 6)]
    ).map(str => parseInt(str.length < 2 ? `${'0'.repeat(2 - str.length)}${str}` : str, 16)) as [
      number,
      number,
      number
    ];
  }

  switch (format) {
    case ColorCodeFormat.Array:
      return [...colorArray];
    case ColorCodeFormat.RGB:
      return colorArrayToRGB(colorArray, alpha);
    case ColorCodeFormat.Hex:
    default:
      return colorArrayToHex(colorArray, { hash, lowercase, short });
  }
}
